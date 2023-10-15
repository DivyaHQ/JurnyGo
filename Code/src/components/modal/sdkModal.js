import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigatorContext } from "../context/navigatorProvider";
import { Colors, FontSize, Titles } from "../constant/theme";
import globalStyle from "../../style/global";
import Button from "../Core/button";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import sdkData from "../sdkData";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MyStatusBar from "../Core/custom-statusbar";

const SdkModal = ({ modalShow, setModalShow }) => {
  const {
    showTutorial,
    setShowTutorial,
    privacyModalShow,
    setPrivacyModalShow,
  } = useContext(NavigatorContext);
  const [Search, setSearch] = useState("");

  return (
    <Modal
      visible={modalShow}
      onRequestClose={() => {
        setModalShow(false);
      }}
      animationType="slide"
    >
      <MyStatusBar />
       
      <View style={globalStyle.preferenceContainer}>
        <View
          style={[globalStyle.preferenceHeader, { alignItems: "flex-start" }]}
        >
          <TouchableOpacity
            onPress={() => {
              setModalShow(false);
            }}
          >
            <Feather
              name={"chevron-left"}
              style={{ color: Colors.white }}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={globalStyle.preferenceBody}>
          <ScrollView>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                flex: 1,
              }}
            >
              <View style={globalStyle.filterRow}>
                <View style={globalStyle.searchIconTextContainer}>
                  <AntDesign
                    name="search1"
                    size={20}
                    style={{ color: Colors.white, width: 20 }}
                  />
                  <TextInput
                    placeholder="Search..."
                    placeholderTextColor={Colors.white}
                    cursorColor={Colors.offWhite}
                    style={globalStyle.searchBox}
                    value={Search}
                    inlineImageLeft="search_icon"
                    autoFocus={true}
                    enterKeyHint="search"
                    // onSubmitEditing={() => setModalShow(false)}
                    onChangeText={(text) => {
                      setSearch(text);
                    }}
                  />
                </View>
                <View style={{ width: 20, justifyContent: "center" }}>
                  <AntDesign
                    name="filter"
                    size={24}
                    style={{ color: Colors.white }}
                  />
                </View>
              </View>
              <View style={globalStyle.listContainer}>
                <ScrollView>
                  {sdkData.map((item, k) => (
                    <View
                      key={k}
                      style={[
                        globalStyle.borderStyle,
                        {
                          paddingHorizontal: 0,
                          borderTopWidth: 0,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.white,
                        },
                      ]}
                    >
                      <Text style={Titles.medium}>{item.title}</Text>
                      {item.details && (
                        <Text style={Titles.small}>{item.details}</Text>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={[
            globalStyle.preferenceFooter,
            { height: 30, alignItems: "center" },
          ]}
        >
          <Text style={{ color: Colors.white }}>Powered by OneTrust</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SdkModal;
