import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigatorContext } from "../context/navigatorProvider";
import { Colors, Titles } from "../constant/theme";
import globalStyle from "../../style/global";
import Button from "../Core/button";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import SdkModal from "./sdkModal";
import TargetModal from "./targetModal";
import StrictModal from "./strictModal";
import MyStatusBar from "../Core/custom-statusbar";

const PrivacyPreferenceModal = ({ modalShow, setModalShow }) => {
  const {
    showTutorial,
    setShowTutorial,
    privacyModalShow,
    setPrivacyModalShow,
  } = useContext(NavigatorContext);
  const [sdkModalShow, setSdkModalShow] = useState(false);
  const [targetModalShow, setTargetModalShow] = useState(false);
  const [strictModalShow, setStrictModalShow] = useState(false);
  const [targetSwitch, setTargetSwitch] = useState(false);

  const handleAllowApp = async () => {
    await AsyncStorage.setItem("showTutorial", "true");
    setShowTutorial(false);
    await AsyncStorage.setItem("showPrivacy", "false");
    setPrivacyModalShow(false);
    await AsyncStorage.setItem("privacy", "allowall");
    await AsyncStorage.setItem("lang", "en");
  };
  const handleRejectApp = async () => {
    await AsyncStorage.setItem("showTutorial", "true");
    setShowTutorial(false);
    await AsyncStorage.setItem("showPrivacy", "false");
    setPrivacyModalShow(false);
    await AsyncStorage.setItem("privacy", "rejectall");
    await AsyncStorage.setItem("lang", "en");
  };
  const handleChangeTarget = async () => {
    if (!targetSwitch) {
      setTargetSwitch(true);
    } else {
      setTargetSwitch(false);
    }
  };
  const handleConfirmChoice = async () => {
    handleAllowApp();
    if (targetSwitch) {
      await AsyncStorage.setItem("targeting", "true");
    } else {
      await AsyncStorage.setItem("targeting", "false");
    }
  };

  return (
    <Modal
      visible={modalShow}
      onRequestClose={() => {
        setModalShow(false);
      }}
      animationType="slide"
    >
      <MyStatusBar />
      <SdkModal modalShow={sdkModalShow} setModalShow={setSdkModalShow} />
      <StrictModal
        modalShow={strictModalShow}
        setModalShow={setStrictModalShow}
      />
      <TargetModal
        modalShow={targetModalShow}
        setModalShow={setTargetModalShow}
        targetSwitch={targetSwitch}
        setTargetSwitch={setTargetSwitch}
        handleChangeTarget={handleChangeTarget}
      />
      <View style={globalStyle.preferenceContainer}>
        <View style={globalStyle.preferenceHeader}>
          <TouchableOpacity
            onPress={() => {
              setModalShow(false);
            }}
          >
            <AntDesign name="close" size={24} style={{ color: Colors.white }} />
          </TouchableOpacity>
        </View>
        <View style={globalStyle.preferenceBody}>
          <ScrollView>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Text style={globalStyle.modalTitle}>
                Privacy Preference Center
              </Text>
              <Text style={globalStyle.prefPara}>
                When you open an app, it may store or retrive information on
                your device, usually in the form of SDKs. This information might
                be about you, your preference or your device and is mostly used
                to make the app work as you expect it to. {"\n"}you, but it can
                give you a more personalized app experience. Because we respect
                your right to privacy, you can choose not to allow some headings
                to find out more and change our default settings. However,
                blocking some types of SDKs may impact your experience of the
                app and the services we are able to offer.
              </Text>
              <TouchableOpacity>
                <Text style={globalStyle.anchorButton}>More information</Text>
              </TouchableOpacity>
              <View
                style={[globalStyle.row, { marginTop: 20, marginBottom: 10 }]}
              >
                <Button
                  btnText={"Allow All"}
                  onPress={handleAllowApp}
                  cusStyle={{ backgroundColor: Colors.btnSuccess }}
                  viewStyle={{
                    width: "50%",
                    justifyContent: "center",
                    paddingHorizontal: 5,
                  }}
                />
                <Button
                  btnText={"Reject All"}
                  onPress={handleRejectApp}
                  cusStyle={{ backgroundColor: Colors.btnSuccess }}
                  viewStyle={{
                    width: "50%",
                    justifyContent: "center",
                    paddingHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={globalStyle.borderStyle}>
              <Text style={Titles.medium}>Manage Services</Text>
            </View>
            <View style={globalStyle.borderStyle}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setSdkModalShow(true);
                }}
              >
                <View
                  style={[
                    globalStyle.row,
                    {
                      justifyContent: "space-between",
                      alignContent: "center",
                      padding: 10,
                      paddingVertical: 5,
                    },
                  ]}
                >
                  <Text style={Titles.medium}>SDK List</Text>
                  <Feather
                    name={"chevron-right"}
                    style={{ color: Colors.white }}
                    size={20}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={globalStyle.borderStyle}>
              <Text style={Titles.medium}>Manage Consent Preferences</Text>
            </View>
            <View style={globalStyle.borderStyle}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setStrictModalShow(true);
                }}
              >
                <View
                  style={[
                    globalStyle.row,
                    {
                      justifyContent: "space-between",
                      alignContent: "center",
                      padding: 10,
                      paddingVertical: 5,
                    },
                  ]}
                >
                  <Text style={Titles.medium}>Strictly Necessary</Text>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ color: Colors.btnPrimary }}>Always Active</Text>
                    <Feather
                      name={"chevron-right"}
                      style={{ color: Colors.white }}
                      size={24}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={globalStyle.borderStyle}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setTargetModalShow(true);
                }}
              >
                <View
                  style={[
                    globalStyle.row,
                    {
                      justifyContent: "space-between",
                      alignContent: "center",
                      padding: 10,
                      paddingVertical: 5,
                    },
                  ]}
                >
                  <Text style={[Titles.medium]}>Targeting</Text>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      height: 25,
                    }}
                  >
                    <Switch
                      trackColor={{ true: Colors.btnPrimary, false: Colors.gray }}
                      thumbColor={
                        targetSwitch ? Colors.white : Colors.offWhite
                      }
                      onValueChange={() => {
                        handleChangeTarget();
                      }}
                      value={targetSwitch}
                      ios_backgroundColor={"grey"}
                    />
                    <Feather
                      name={"chevron-right"}
                      style={{ color: Colors.white }}
                      size={24}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={[
                globalStyle.preferenceFooter,
                { height: 30, alignItems: "center" },
              ]}
            >
              <Text style={{ color: Colors.white }}>Powered by OneTrust</Text>
            </View>
          </ScrollView>
        </View>
        <View style={[globalStyle.preferenceFooter]}>
          <Button
            btnText={"Confirm My Choices"}
            onPress={handleConfirmChoice}
            cusStyle={{
              height: 50,
              backgroundColor: Colors.btnSuccess,
              marginTop: 10,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PrivacyPreferenceModal;
