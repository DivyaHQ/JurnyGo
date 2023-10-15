import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import cardStyle from "../../style/cardHome";
import { Colors } from "../../components/constant/theme";
import globalStyle from "../../style/global";
import Button from "../../components/Core/button";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "react-native-toast-notifications";
import Feather from "react-native-vector-icons/Feather";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import projectEnv from "../../projectEnv";
import { Alert } from "react-native";
import { NavigatorContext } from "../../components/context/navigatorProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import navigationString from "../../components/constant/navigationString";
import { Platform } from "react-native";
import DropdownOption from "../../components/Core/dropdown";
import Foundation from "react-native-vector-icons/Foundation";
import { useTranslation } from "react-i18next";

const UserCardInfo = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [idImage, setIdImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isCodeExist, setIsCodeExist] = useState(false);
  const { currentUser, setCurrentUser } = useContext(NavigatorContext);
  const [isFocus, setIsFocus] = useState(false);
  const [destination, setDestination] = useState(null);
  const { t } = useTranslation();

  const validSchema = Yup.object({
    FullName: Yup.mixed().required(t("nameReq")),
    Address: Yup.mixed().required(t("addressReq")), 
    Town: Yup.mixed().required(t("townReq")),
    PostCode: Yup.mixed().required(t("postCodeReq")), 
    MobileNo: Yup.mixed().required(t("mobileReq")),
  });
  const postCode = [
    "SA5 4",
    "SA4 0",
    "SA4 6",
    "SA4 4",
    "SA4 8",
    "SA4 9",
    "SA14 9",
    "SA15 2",
    "SA15 3",
    "SA15 1",
    "SA14 8",
    "SA4 8",
    "SA4 6",
    "SA14 6",
    "SA18 3",
    "SA18 2",
    "SA18 1",
    "SA19 6",
    "SA19 7",
    "SA19 9",
    "SA19 8",
    "SA20 0",
    "LD4 4",
    "LD5 4",
    "LD2 3",
    "LD1 5",
    "LD6 5",
    "LD1 6",
    "LD8 2",
    "LD7 1",
    "SY7 8",
    "SY7 0",
    "SY9 5",
    "SY7 9",
  ];
  const destinationArr = [
    { label: "SHREWSBURY", value: "SHREWSBURY" },
    { label: "CHURCH STRETTON", value: "CHURCH STRETTON" },
    { label: "CRAVEN ARMS", value: "CRAVEN ARMS" },
    { label: "KNIGHTON", value: "KNIGHTON" },
    { label: "LLANDRINDOD", value: "LLANDRINDOD" },
    { label: "LLANWRTYD WELLS", value: "LLANWRTYD WELLS" },
    { label: "LLANDOVERY", value: "LLANDOVERY" },
    { label: "LLANDEILO", value: "LLANDEILO" },
    { label: "AMMANFORD", value: "AMMANFORD" },
  ];
  const handleSaveInfo = async (values, resetForm) => {
    if (idImage === null) {
      return Toast.show(t("imgReq"), { type: "danger" });
    }
    Alert.alert(
      t("aresure"),
      t("confirmHeart"),
      [
        {
          text: t("no"),
          onPress: () => {
            navigation.pop();
          },
          style: "cancel",
        },
        {
          text: t("yes"),
          onPress: () => {
            handleConfirmPayment(values, resetForm);
          },
        },
      ]
    );
  };
  const handleConfirmPayment = async (values, resetForm) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("UserId", currentUser?._id);
    formData.append("FullName", values.FullName);
    formData.append("Address", values.Address);
    formData.append("Destination", values.Destination);
    formData.append("Town", values.Town);
    formData.append("PostCode", values.PostCode);
    formData.append("TellNo", values.TellNo);
    formData.append("MobileNo", values.MobileNo);
    formData.append("Email", values.Email);
    formData.append("file", {
      uri:
        Platform.OS === "ios"
          ? idImage?.assets[0]?.uri.replace("file://", "")
          : idImage?.assets[0]?.uri,
      type: "image/jpeg", // Adjust the type if necessary
      name: `${values.FullName}.png`,
    });
    const configImg = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const json = await axios.post(
      `${projectEnv.API_KEY}applicationForRailcardWithId`,
      formData,
      configImg
    );
    const dt = await json.data;
    if (dt.Status === "success") {
      await AsyncStorage.setItem("AppId", dt.ID.toString());
      setLoader(false);
      resetForm();
      setIdImage(null);
      // Toast.show('Applied successfully', { type: 'success' })
      navigation.push(navigationString.Payment);
    } else if (dt.Status === "error") {
      resetForm({ values });
      setIdImage(null);
      Toast.show(t("failApply"), { type: "danger" });
    }
  };
  async function handleUpImg() {
    const permit = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permit.granted === false) {
      return Toast.show(t("permitGallery"), {
        type: "success",
      });
    }
    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      // allowsMultipleSelection: true,
    });

    if (data.canceled === false) {
      setIdImage(data);
    }
  }
  const handleMatchPostCode = async (code) => {
    const result = postCode.filter(
      (data) =>
        data.split(" ").join("").toLocaleLowerCase().substring(0, 4) ===
        code.split(" ").join("").toLocaleLowerCase().substring(0, 4)
    );
    if (result.length > 0) {
      setIsCodeExist(true);
    } else {
      setIsCodeExist(false);
    }
  };
  return (
    <SafeAreaView style={[globalStyle.safeArea, { paddingTop: 5 }]}>
      {/* <KeyboardAwareScrollView> */}
      <View style={[cardStyle.container]}>
        <StatusBar
          backgroundColor={Colors.defaultGrey}
          barStyle={"dark-content"}
        />
        <View style={[cardStyle.loginHeader]}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <View style={{ width: "auto", flexDirection: "row" }}>
              <Feather name="chevron-left" size={26} />
              <Text style={{ top: 3 }}>{t("back")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[cardStyle.loginBody]}>
          <Formik
            initialValues={{
              FullName: "",
              Address: "",
              Destination: "",
              Town: "",
              PostCode: "",
              TellNo: "",
              MobileNo: "",
              Email: "",
            }}
            validationSchema={validSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values, { resetForm }) => {
              handleSaveInfo(values, resetForm);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              isValid,
              dirty,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View
                style={[
                  cardStyle.loginBody,
                  {
                    height: height - 60,
                    justifyContent: "flex-start",
                    width: "100%",
                  },
                ]}
              >
                <ScrollView
                  style={{ width: "100%" }}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={[cardStyle.mainTitle, { marginBottom: 20 }]}>
                    {t("appForm")}
                  </Text>
                  <TextInput
                    placeholder={t("fName")}
                    placeholderTextColor={
                      touched.FullName && errors.FullName
                        ? Colors.red
                        : Colors.grey
                    }
                    cursorColor={Colors.black}
                    style={[
                      cardStyle.loginTextbox,
                      {
                        borderColor:
                          touched.FullName && errors.FullName
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.FullName}
                    enterKeyHint="next"
                    onChangeText={handleChange("FullName")}
                    onBlur={handleBlur("FullName")}
                  />
                  {touched.FullName && errors.FullName && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.FullName && errors.FullName}
                      </Text>
                    </View>
                  )}
                  <TextInput
                    placeholder={t("address")}
                    placeholderTextColor={
                      touched.Address && errors.Address
                        ? Colors.red
                        : Colors.grey
                    }
                    cursorColor={Colors.black}
                    numberOfLines={4} 
                    style={[
                      cardStyle.loginTextbox,
                      {
                        height: 80,  
                        paddingTop:15,
                        borderColor:
                          touched.Address && errors.Address
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.Address}
                    enterKeyHint="next"
                    onChangeText={handleChange("Address")}
                    onBlur={handleBlur("Address")}
                    multiline
                  />
                  {touched.Address && errors.Address && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.Address && errors.Address}
                      </Text>
                    </View>
                  )}
                  <TextInput
                    placeholder={t("town")}
                    placeholderTextColor={
                      touched.Town && errors.Town ? Colors.red : Colors.grey
                    }
                    cursorColor={Colors.black}
                    style={[
                      cardStyle.loginTextbox,
                      {
                        borderColor:
                          touched.Town && errors.Town
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.Town}
                    enterKeyHint="next"
                    onChangeText={handleChange("Town")}
                    onBlur={handleBlur("Town")}
                  />
                  {touched.Town && errors.Town && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.Town && errors.Town}
                      </Text>
                    </View>
                  )}
                  <TextInput
                    placeholder={t("postCode")}
                    placeholderTextColor={
                      touched.PostCode && errors.PostCode
                        ? Colors.red
                        : Colors.grey
                    }
                    cursorColor={Colors.black}
                    style={[
                      cardStyle.loginTextbox,
                      {
                        borderColor:
                          touched.PostCode && errors.PostCode
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.PostCode}
                    enterKeyHint="next"
                    onChangeText={handleChange("PostCode")}
                    onBlur={handleBlur("PostCode")}
                    onEndEditing={() => {
                      handleMatchPostCode(values.PostCode);
                    }}
                  />
                  {touched.PostCode && errors.PostCode && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.PostCode && errors.PostCode}
                      </Text>
                    </View>
                  )}
                  {!isCodeExist && touched.PostCode && !errors.PostCode && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {t("noCard")}
                      </Text>
                    </View>
                  )}
                  <TextInput
                    placeholder={t("tellNo")}
                    placeholderTextColor={
                      touched.TellNo && errors.TellNo ? Colors.red : Colors.grey
                    }
                    cursorColor={Colors.black}
                    style={[
                      cardStyle.loginTextbox,
                      {
                        borderColor:
                          touched.TellNo && errors.TellNo
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.TellNo}
                    enterKeyHint="next"
                    onChangeText={handleChange("TellNo")}
                    keyboardType="number-pad"
                    onBlur={handleBlur("TellNo")}
                  />
                  {touched.TellNo && errors.TellNo && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.TellNo && errors.TellNo}
                      </Text>
                    </View>
                  )}
                  <TextInput
                    placeholder={t("mobileNo")}
                    placeholderTextColor={
                      touched.MobileNo && errors.MobileNo
                        ? Colors.red
                        : Colors.grey
                    }
                    cursorColor={Colors.black}
                    style={[
                      cardStyle.loginTextbox,
                      {
                        borderColor:
                          touched.MobileNo && errors.MobileNo
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.MobileNo}
                    enterKeyHint="next"
                    keyboardType="number-pad"
                    onChangeText={handleChange("MobileNo")}
                    onBlur={handleBlur("MobileNo")}
                  />
                  {touched.MobileNo && errors.MobileNo && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.MobileNo && errors.MobileNo}
                      </Text>
                    </View>
                  )}
                  {/* <DropdownOption
                                        value={destination}
                                        setValue={setDestination}
                                        leftIcon={<Foundation
                                            style={{ marginRight: 10 }}
                                            color={isFocus ? Colors.lightBlack : Colors.gray}
                                            name="marker"
                                            size={20}
                                        />}
                                        cusStyle={{ backgroundColor: Colors.gainsboro, marginBottom: 10, borderColor: Colors.gainsboro }}
                                        cusPlaceStyle={{ color: Colors.gray }}
                                        isFocus={isFocus}
                                        setIsFocus={setIsFocus}
                                        searchHolderText={'Search Destination...'}
                                        placeholder={!isFocus ? 'Destination' : '...'}
                                        options={destinationArr}
                                        labelItem={'label'}
                                        valueItem={'value'}
                                        maxHeight={200}
                                        showSearchBox={false}
                                        handleFocus={() => setIsFocus(true)}
                                        handleBlur={() => { setIsFocus(false); }}
                                        handleChange={(item) => {
                                            setFieldValue('Destination', item.value)
                                            setDestination(item.value);
                                            setIsFocus(false);
                                        }}
                                    />
                                    {touched.Destination && errors.Destination &&
                                        <View style={{ width: '100%' }}>
                                            <Text style={cardStyle.errorMessage}>{touched.Destination && errors.Destination}</Text>
                                        </View>} */}
                  <TextInput
                    placeholder={t("emailOpt")}
                    placeholderTextColor={
                      touched.Email && errors.Email ? Colors.red : Colors.grey
                    }
                    cursorColor={Colors.black}
                    style={[
                      cardStyle.loginTextbox,
                      {
                        borderColor:
                          touched.Email && errors.Email
                            ? Colors.red
                            : Colors.gainsboro,
                      },
                    ]}
                    value={values.Email}
                    enterKeyHint="next"
                    keyboardType="email-address"
                    onChangeText={handleChange("Email")}
                    onBlur={handleBlur("Email")}
                  />
                  {touched.Email && errors.Email && (
                    <View style={{ width: "100%" }}>
                      <Text style={cardStyle.errorMessage}>
                        {touched.Email && errors.Email}
                      </Text>
                    </View>
                  )}
                  <View style={{ width: "100%" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      {t("imgTitle")}
                    </Text>
                  </View>
                  {!idImage && (
                    <Button
                      btnText={t("imgBtntext")}
                      onPress={() => {
                        handleUpImg();
                      }}
                      cusStyle={{
                        marginVertical: 10,
                        backgroundColor: Colors.btnPurple,
                      }}
                    />
                  )}
                  {idImage && (
                    <View style={{ width: "100%", alignItems: "center" }}>
                      <Image
                        source={{ uri: idImage?.assets[0]?.uri }}
                        style={cardStyle.formIdImage}
                      />
                      <Button
                        btnText={t("rmvImg")}
                        onPress={() => {
                          setIdImage(null);
                        }}
                        cusStyle={{
                          marginVertical: 10,
                          backgroundColor: Colors.btnDanger,
                        }}
                      />
                    </View>
                  )}
                  <Button
                    btnText={t("submit")}
                    disabled={!(isValid && dirty) || loader || !isCodeExist}
                    onPress={() => {
                      handleSubmit();
                    }}
                    cusStyle={{ marginVertical: 10 }}
                  />
                </ScrollView>
              </View>
            )}
          </Formik>
        </View>
      </View>
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
};

export default UserCardInfo;
