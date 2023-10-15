import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback, 
  ImageBackground,
} from "react-native";
import React, { useContext } from "react";
import cardStyle from "../../style/cardHome";
import { Colors, FontSize, Shadows } from "../../components/constant/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import cards from "../../components/cardData";
import navigationString from "../../components/constant/navigationString";
import { NavigatorContext } from "../../components/context/navigatorProvider";
import { Toast } from "react-native-toast-notifications";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/Core/custom-statusbar";

const AddRailCard = ({ navigation, route }) => {
  const { currentUser, setCurrentUser } = useContext(NavigatorContext);
  const list = route.params.item;
  const { t } = useTranslation();

  return (
    <View style={cardStyle.container}>
      <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-Content'}/>  

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
        <Text style={[cardStyle.headerTitle, { marginLeft: 20 }]}>{t("addRailcard")}</Text>
      </View>
      <View style={cardStyle.addCardBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Text style={{ color: Colors.darkblue, fontSize: FontSize.medium }}>Add an existing Railcard</Text>
                    <TouchableOpacity style={cardStyle.addCardBtn} activeOpacity={0.5} onPress={() => { navigation.navigate(navigationString.RailForm) }}>
                        <AntDesign name='plus' size={26} style={{ color: Colors.darkblue }} />
                    </TouchableOpacity> */}
          <Text
            style={{
              color: Colors.darkblue,
              fontSize: FontSize.medium,
              marginTop: 15,
            }}
          >
            {t("purchaseNewCard")}
          </Text>
          <View style={cardStyle.cardDesignContainer}>
            <View
              style={[
                cardStyle.boxContainer,
                { paddingLeft: 0, paddingRight: 7 },
              ]}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!currentUser) {
                    navigation.push(navigationString.Login);
                  } else {
                    list?.length > 0
                      ? Toast.show(
                          t("alreadyhasRailcard"),
                          { type: "danger" }
                        )
                      : navigation.push(navigationString.UserCardInfoForm);
                  }
                }}
              >
                <View
                  style={[
                    cardStyle.cardBox,
                    Shadows.small,
                    { backgroundColor: Colors.cardDarkBlue, padding: 0 },
                  ]}
                >
                  <ImageBackground
                    source={require("../../../assets/img/heartwalebg.jpeg")}
                    style={{
                      flex: 1,
                      padding: 15,
                    }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 5 }}
                  >
                    <Text
                      style={[cardStyle.cardTitle, { color: Colors.white }]}
                    >
                      Heart of Wales
                    </Text>
                    <View style={cardStyle.cardButtonBox}>
                      <Text style={{ color: Colors.white }}>{t("buyNow")}</Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {cards.map((item, k) => (
              <View
                key={k}
                style={[
                  cardStyle.boxContainer,
                  {
                    paddingLeft: k % 2 === 1 ? 0 : 7,
                    paddingRight: k % 2 === 0 ? 0 : 7,
                  },
                ]}
              >
                <View
                  style={[
                    cardStyle.cardBox,
                    Shadows.small,
                    { backgroundColor: Colors.grey },
                  ]}
                >
                  <Text style={[cardStyle.cardTitle, { color: Colors.white }]}>
                    {item.title}
                  </Text>
                  <View style={cardStyle.cardButtonBox}>
                    <TouchableWithoutFeedback>
                      <Text style={{ color: Colors.white }}>{t("buyNow")}</Text>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddRailCard;
