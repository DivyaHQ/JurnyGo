import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import cardStyle from "../../style/cardHome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../../components/constant/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import navigationString from "../../components/constant/navigationString";
import Button from "../../components/Core/button";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import projectEnv from "../../projectEnv";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { NavigatorContext } from "../../components/context/navigatorProvider";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/Core/custom-statusbar";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(NavigatorContext);
  const { height } = useWindowDimensions();
  const [loader, setLoader] = useState(false);
  const {t}=useTranslation();

 
  const loginSchema = Yup.object({
    UserName: Yup.mixed().required(t("usernameReq")),
    Password: Yup.mixed().required(t("passReq")),
  });

  async function handleLogin(values, resetForm) {
    setLoader(true);
    const json = await axios.post(`${projectEnv.API_KEY}login`, values);
    const dt = await json.data;

    if (dt.Status === "Password Incorrect") {
      setLoader(false);
      resetForm();
      Toast.show(t("passIncorrent"), { type: "danger" });
    } else if (dt.Status === "No user found") {
      setLoader(false);
      resetForm();
      Toast.show(t("noUserFound"), { type: "danger" });
    } else if (dt.Status === "success") {
      await AsyncStorage.setItem("UserInfo", JSON.stringify(dt.UserInfo[0]));
      setCurrentUser(dt.UserInfo[0]);
      setLoader(false);
      resetForm();
      navigation.pop();
      Toast.show(t("loginSuccess"), { type: "success" });
    }
  }

  return (
    <View style={cardStyle.container}>
      <MyStatusBar backgroundColor={Colors.defaultGrey} barStyle={'dark-Content'}/>  
      <View style={cardStyle.loginHeader}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => {
            navigation.pop();
          }}
        >
          <AntDesign name="close" size={20} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={cardStyle.loginBody}>
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              initialValues={{ UserName: "", Password: "" }}
              validationSchema={loginSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(values, { resetForm }) => {
                handleLogin(values, resetForm);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                dirty,
                isSubmitting,
                values,
                errors,
                touched,
              }) => (
                <View style={[cardStyle.loginBody, { height: height - 70 }]}>
                  <Text style={[cardStyle.mainTitle, { marginBottom: 20 }]}>
                   { t("login")}
                  </Text>
                  <TextInput
                    placeholder={t("username")}
                    placeholderTextColor={
                      touched.UserName && errors.UserName
                        ? Colors.red
                        : Colors.grey
                    }
                    cursorColor={Colors.black}
                    style={[
                      cardStyle.loginTextbox,
                      {
                        borderColor:
                          touched.UserName && errors.UserName
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.UserName}
                    enterKeyHint="next"
                    onChangeText={handleChange("UserName")}
                    onBlur={handleBlur("UserName")}
                  />
                  {touched.UserName && errors.UserName && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.UserName && errors.UserName}
                      </Text>
                    </View>
                  )}
                  <TextInput
                    placeholder={t("password")}
                    placeholderTextColor={
                      touched.Password && errors.Password
                        ? Colors.red
                        : Colors.grey
                    }
                    cursorColor={Colors.black}
                    style={[
                      cardStyle.loginTextbox,
                      {
                        borderColor:
                          touched.Password && errors.Password
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.Password}
                    secureTextEntry={true}
                    enterKeyHint="done"
                    onSubmitEditing={() => {
                      if (isValid && dirty && !loader) {
                        handleSubmit();
                      }
                    }}
                    onChangeText={handleChange("Password")}
                    onBlur={handleBlur("Password")}
                  />
                  {touched.Password && errors.Password && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.Password && errors.Password}
                      </Text>
                    </View>
                  )}
                  <View style={cardStyle.signText}>
                    <TouchableOpacity
                      style={cardStyle.signupBtn}
                      onPress={() => {
                        // navigation.push(navigationString.Register);
                      }}
                    >
                      <Text style={{ color: Colors.darkblue }}>
                        {t("forgotPass")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Button
                    btnText={
                      loader ? <ActivityIndicator size={"large"} color={Colors.white} /> : t("login")
                    }
                    disabled={!(isValid && dirty) || loader}
                    onPress={handleSubmit}
                    cusStyle={cardStyle.loginBtn}
                  />
                  <View style={cardStyle.signText}>
                    <Text>{t("dontAccount")}</Text>
                    <TouchableOpacity
                      style={cardStyle.signupBtn}
                      onPress={() => {
                        navigation.push(navigationString.Register);
                      }}
                    >
                      <Text style={{ color: Colors.darkblue }}>{t("signUp")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
