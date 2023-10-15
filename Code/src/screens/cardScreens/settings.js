import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import cardStyle from "../../style/cardHome";
import { Colors, FontSize } from "../../components/constant/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import languageList from "../../../lang-services/language-list.json";
import { useContext } from "react";
import { NavigatorContext } from "../../components/context/navigatorProvider";
import { useState } from "react";
import LangModal from "../../components/modal/langModal";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/Core/custom-statusbar";

const Settings = ({ navigation }) => {
  const { language, setLanguage } = useContext(NavigatorContext);
  const [langModalShow, setLangModalShow] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={cardStyle.container}>
      <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-Content'}/>  

      <LangModal modalShow={langModalShow} setModalShow={setLangModalShow} />
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <View style={[cardStyle.pageHeader, { justifyContent: "flex-start" }]}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => {
            navigation.pop();
          }}
        >
          <AntDesign name="arrowleft" size={20} />
        </TouchableOpacity>
        <Text style={[cardStyle.headerTitle, { marginLeft: 30 }]}>
          {t("settings")}
        </Text>
      </View>
      <View style={{ ...cardStyle.addCardBody, paddingHorizontal: 0 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setLangModalShow(true);
          }}
        >
          <View
            style={[
              cardStyle.listContainer,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <Text
              style={{
                color: Colors.lightBlack,
                fontSize: FontSize.medium,
                fontWeight: "600",
              }}
            >
              {t("language")}
            </Text>
            <Text>{languageList[language].name}</Text>
          </View>
        </TouchableOpacity>
        <View style={[cardStyle.listContainer, { marginTop: 0 }]}>
          <Text style={{ color: Colors.darkblue, fontSize: FontSize.small }}>
            {t("helpSupport")}
          </Text>
        </View>
        <View style={cardStyle.listContainer}>
          <Text
            style={{
              color: Colors.lightBlack,
              fontSize: FontSize.medium,
              fontWeight: "600",
            }}
          >
            {t("termsCond")}
          </Text>
        </View>
        <View style={cardStyle.listContainer}>
          <Text
            style={{
              color: Colors.lightBlack,
              fontSize: FontSize.medium,
              fontWeight: "600",
            }}
          >
            {t("freQues")}
          </Text>
        </View>
        <View style={cardStyle.listContainer}>
          <Text
            style={{
              color: Colors.lightBlack,
              fontSize: FontSize.medium,
              fontWeight: "600",
            }}
          >
            {t("privacyPolicy")}
          </Text>
        </View>
        <View style={cardStyle.listContainer}>
          <Text
            style={{
              color: Colors.lightBlack,
              fontSize: FontSize.medium,
              fontWeight: "600",
            }}
          >
            {t("acknowledge")}
          </Text>
        </View>
        <View style={cardStyle.listContainer}>
          <Text
            style={{
              color: Colors.lightBlack,
              fontSize: FontSize.medium,
              fontWeight: "600",
            }}
          >
            {t("contactUs")}
          </Text>
        </View>
      </View>
      <View style={cardStyle.version}>
        <Text style={{ color: Colors.gray }}>{t("version")}: 1.6.0</Text>
      </View>
    </View>
  );
};

export default Settings;
