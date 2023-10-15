import { View, Text, StatusBar, TouchableOpacity, TextInput, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import cardStyle from '../../style/cardHome'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../components/constant/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import navigationString from '../../components/constant/navigationString'
import Button from '../../components/Core/button'
import globalStyle from '../../style/global'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import projectEnv from '../../projectEnv'
import { Toast } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react'
import { NavigatorContext } from '../../components/context/navigatorProvider'
import { StackActions } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../components/Core/custom-statusbar'



const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { height } = useWindowDimensions();
    const [loader, setLoader] = useState(false)
    const { currentUser, setCurrentUser } = useContext(NavigatorContext);
    const {t}=useTranslation();

    const registerSchema = Yup.object({
        UserName: Yup.mixed().required(t("usernameReq")),
        Password: Yup.mixed().required(t("passReq")),
        ConfirmPassword: Yup.string()
            .required(t("conPassReq"))
            .oneOf([Yup.ref('Password')], t("passNotMatch")),
    })
    async function handleRegister(values, resetForm) {

        setLoader(true);
        const json = await axios.post(`${projectEnv.API_KEY}signup`, values);
        const dt = await json.data;
        if (dt.Status === "Email Alreday Exist") {
            setLoader(false)
            Toast.show('User already exist', { type: 'danger' })
        } else if (dt.Status === 'success') {
            // await AsyncStorage.setItem('UserId', dt.Id.toString()); 
            await AsyncStorage.setItem('UserInfo', JSON.stringify(dt.UserInfo[0]));
            setCurrentUser(dt.UserInfo[0]);
            setLoader(false)
            resetForm();
            // navigation.dispatch(StackActions.popToTop());
            navigation.pop(2);
            Toast.show('Signup Successful', { type: 'success' })
        }
    }

    return (
        <View style={cardStyle.container}>

            <MyStatusBar backgroundColor={Colors.defaultGrey} barStyle={'dark-content'} />
            <View style={cardStyle.loginHeader}>
                <TouchableOpacity onPress={() => { navigation.pop() }}>
                    <View style={{ width: 'auto', flexDirection: 'row' }}>
                        <Feather name='chevron-left' size={26} />
                        <Text style={{ top: 3 }}>{t("back")}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView>
                <View style={cardStyle.loginBody}>
                    <ScrollView style={{ flex: 1, width: '100%' }} showsVerticalScrollIndicator={false}>
                        <Formik
                            initialValues={{ UserName: '', Password: '', ConfirmPassword: '' }}
                            validationSchema={registerSchema}
                            validateOnChange={true}
                            validateOnBlur={true}
                            onSubmit={(values, { resetForm }) => {
                                handleRegister(values, resetForm);
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, isValid, dirty, values, errors, touched }) => (
                                <View style={[cardStyle.loginBody, { height: height - 60 }]}>
                                    <Text style={[cardStyle.mainTitle, { marginBottom: 20, }]}>{t("register")}</Text>
                                    <TextInput
                                        placeholder={t("username")}
                                        placeholderTextColor={touched.UserName && errors.UserName ? Colors.red : Colors.grey}
                                        cursorColor={Colors.black}
                                        style={[cardStyle.loginTextbox, { borderColor: touched.UserName && errors.UserName ? Colors.red : Colors.gainsboro }]}
                                        value={values.UserName}
                                        enterKeyHint='next'
                                        onChangeText={handleChange('UserName')}
                                        onBlur={handleBlur('UserName')}
                                    />
                                    {touched.UserName && errors.UserName &&
                                        <View style={{ width: '100%' }}>
                                            <Text style={cardStyle.errorMessage}>{touched.UserName && errors.UserName}</Text>
                                        </View>}
                                    <TextInput
                                        placeholder={t("password")}
                                        placeholderTextColor={touched.Password && errors.Password ? Colors.red : Colors.grey}
                                        cursorColor={Colors.black}
                                        style={[cardStyle.loginTextbox, { borderColor: touched.Password && errors.Password ? Colors.red : Colors.gainsboro }]}
                                        value={values.Password}
                                        secureTextEntry={true}
                                        enterKeyHint='done'
                                        // onSubmitEditing={() => setModalShow(false)}
                                        onChangeText={handleChange('Password')}
                                        onBlur={handleBlur('Password')}
                                    />
                                    {touched.Password && errors.Password &&
                                        <View style={{ width: '100%' }}>
                                            <Text style={cardStyle.errorMessage}>{touched.Password && errors.Password}</Text>
                                        </View>}
                                    <TextInput
                                        placeholder={t("confirmPass")}
                                        placeholderTextColor={touched.ConfirmPassword && errors.Password ? Colors.red : Colors.grey}
                                        cursorColor={Colors.black}
                                        style={[cardStyle.loginTextbox, { borderColor: touched.ConfirmPassword && errors.Password ? Colors.red : Colors.gainsboro }]}
                                        value={values.ConfirmPassword}
                                        secureTextEntry={true}
                                        enterKeyHint='done'
                                        // onSubmitEditing={() => setModalShow(false)}
                                        onChangeText={handleChange('ConfirmPassword')}
                                        onBlur={handleBlur('ConfirmPassword')}
                                    />
                                    {touched.ConfirmPassword && errors.ConfirmPassword &&
                                        <View style={{ width: '100%' }}>
                                            <Text style={cardStyle.errorMessage}>{touched.ConfirmPassword && errors.ConfirmPassword}</Text>
                                        </View>}
                                    <Button btnText={ loader ? <ActivityIndicator size={"large"} color={Colors.white} /> : t("signUp")}
                                        disabled={!(isValid && dirty) || loader}
                                        onPress={handleSubmit} cusStyle={cardStyle.loginBtn} />
                                    <View style={cardStyle.signText}>
                                        <Text>{t("alreadyAccount")}</Text>
                                        <TouchableOpacity style={cardStyle.signupBtn} onPress={() => { navigation.pop() }}>
                                            <Text style={{ color: Colors.darkblue }}>{t("login")}</Text>
                                        </TouchableOpacity>  
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Register