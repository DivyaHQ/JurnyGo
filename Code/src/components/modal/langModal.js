import { View, Text, Modal, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React from "react";
import cardStyle from "../../style/cardHome";
import { Colors, FontSize } from "../constant/theme";
import LangList from "../../../lang-services/language-list.json";
import i18next, { languageResource } from "../../../lang-services/i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { NavigatorContext } from "../context/navigatorProvider";

const LangModal = ({ modalShow, setModalShow }) => {
  const { language, setLanguage } = useContext(NavigatorContext);

  const handleChangeLang = async (lang) => { 
    i18next.changeLanguage(lang);
    await AsyncStorage.setItem("lang", lang.toString());
    setLanguage(lang.toString())
    setModalShow(false)
  };
  return (
    <Modal
      visible={modalShow}
      onRequestClose={() => {
        setModalShow(false);
      }}
      animationType="fade"
      transparent={true}
    >
      <StatusBar backgroundColor={Colors.opBlack} />
      <TouchableWithoutFeedback onPress={()=>{
        setModalShow(false)
      }}>
        
      <View style={cardStyle.langContainer}>
        <View style={cardStyle.langOptionCard}>
          {Object.keys(languageResource).map((item, indx) => (
            <TouchableOpacity
              key={indx}
              onPress={() => {
                handleChangeLang(item);
              }}
            >
              <View style={cardStyle.listContainer}>
                <Text
                  style={{
                    color: Colors.lightBlack,
                    fontSize: FontSize.medium,
                    fontWeight: "600",
                  }}
                >
                  {LangList[item].name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LangModal;
