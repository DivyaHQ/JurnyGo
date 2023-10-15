import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigatorContext } from "../context/navigatorProvider";
import { Colors } from "../constant/theme";
import globalStyle from "../../style/global";
import Button from "../Core/button";
import PrivacyPreferenceModal from "./privacyPreferenceModal";
import MyStatusBar from "../Core/custom-statusbar";
 
const PrivacyModal = ({ modalShow, setModalShow }) => {
  const {
    showTutorial,
    setShowTutorial,
    privacyModalShow,
    setPrivacyModalShow,
  } = useContext(NavigatorContext);
  const [preferenceModalShow, setPreferenceModalShow] = useState(false);

  const handleAcceptApp = async () => {
    await AsyncStorage.setItem("showTutorial", "true");
    setShowTutorial(false);
    await AsyncStorage.setItem("showPrivacy", "false");
    setPrivacyModalShow(false);
    await AsyncStorage.setItem("privacy", "accept");
    await AsyncStorage.setItem("lang", "en");
  };
  const handleRejectApp = async () => {
    await AsyncStorage.setItem("showTutorial", "true");
    setShowTutorial(false);
    await AsyncStorage.setItem("showPrivacy", "false");
    setPrivacyModalShow(false);
    await AsyncStorage.setItem("privacy", "rejectnon");
    await AsyncStorage.setItem("lang", "en");
  };
  return (
    <Modal
      visible={modalShow}
      // onRequestClose={() => { setModalShow(false) }}
      animationType="none"
    >
      <View style={{ flex: 1 }}>
      <MyStatusBar />

        <PrivacyPreferenceModal
          modalShow={preferenceModalShow}
          setModalShow={setPreferenceModalShow}
        />
        <View style={globalStyle.modalContainer}>
          <View style={globalStyle.topModalView}>
            <Text style={globalStyle.modalTitle}>
              Your privacy matter to us
            </Text>
            <Text style={globalStyle.modalPara}>
              We use info about your device and how you use our services to make
              our app work.
            </Text>
            <Text style={globalStyle.modalPara}>
              We and our partners also use this info to personalise your
              experience, measure performance and improve our products. {"\n"}
              Your data will not be used for tracking purposes if you have asked
              us not to track you.
            </Text>
          </View>
          <View style={globalStyle.bottomModalView}>
            <Button
              btnText={"Accept All"}
              onPress={handleAcceptApp}
              cusStyle={{
                borderRadius: 0,
                backgroundColor: Colors.btnSuccess,
                marginBottom: 5,
              }}
            />
            <Button
              btnText={"Reject non-essential"}
              onPress={handleRejectApp}
              cusStyle={{
                borderRadius: 0,
                backgroundColor: Colors.btnSuccess,
                marginBottom: 5,
              }}
            />
            <Button
              btnText={"Settings"}
              onPress={() => {
                setPreferenceModalShow(true);
              }}
              cusStyle={{
                borderRadius: 0,
                backgroundColor: Colors.white,
                marginBottom: 5,
                borderColor: Colors.btnSuccess,
                borderWidth: 1,
              }}
              textStyle={{ color: Colors.btnSuccess }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PrivacyModal;
