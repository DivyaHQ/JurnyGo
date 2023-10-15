import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import cardStyle from "../../style/cardHome";
import { Colors, Shadows, Titles } from "../../components/constant/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import navigationString from "../../components/constant/navigationString";
import Fontisto from "react-native-vector-icons/Fontisto";
import { NavigatorContext } from "../../components/context/navigatorProvider";
import axios from "axios";
import projectEnv from "../../projectEnv";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native";
import CardDesignModal from "../../components/modal/cardDesignModal";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyStatusBar from "../../components/Core/custom-statusbar";

const CardHome = ({ navigation }) => {
  //lang
  const { t } = useTranslation();

  const { currentUser, setCurrentUser } = useContext(NavigatorContext);
  const [rippleColor, setRippleColor] = useState(Colors.gray);
  const [rippleOverflow, setRippleOverflow] = useState(false);
  const [cardList, setCardList] = useState([]);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const isFocused = useIsFocused();
  const [cardModalShow, setCardModalShow] = useState(false);
  const [rowData, setRowData] = useState(null);

  async function handleLoadCards() {
    const json = await axios.post(`${projectEnv.API_KEY}loadAllCardUserWise`, {
      UserId: currentUser?._id,
    });
    const data = await json.data;
    if (data.Status === "success") {
      setCardList(data?.data);
    } else {
      setCardList([]);
    }
  }

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
    return () => {};
  }, [isFocused, currentUser]);
  useEffect(() => {
    handleLoadCards();

    return () => {};
  }, [isFocused, currentUser]);

  const handleLogOut = async () => {
    setCurrentUser(null);
    await AsyncStorage.setItem("showTutorial", "");
    await AsyncStorage.setItem("showPrivacy", "");
    await AsyncStorage.setItem("UserInfo", "");
    await AsyncStorage.setItem("lang", "en");
  };
  return (
    <View style={cardStyle.container}>
      <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-Content'}/>  
      <CardDesignModal
        modalShow={cardModalShow}
        setModalShow={setCardModalShow}
        rowData={rowData}
      />
      <View style={cardStyle.pageHeader}>
        <Text style={cardStyle.headerTitle}>{t("yourrailcard")}</Text>
        <View style={cardStyle.iconContainer}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              navigation.push(navigationString.RailCard, { item: cardList });
            }}
          >
            <AntDesign name="plus" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              navigation.push(navigationString.Settings);
            }}
          >
            <AntDesign name="setting" size={20} />
          </TouchableOpacity>
          {!currentUser ? (
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                navigation.push(navigationString.Login);
              }}
            >
              <Fontisto name="key" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                handleLogOut();
              }}
            >
              {/* <Image source={require('../../../assets/img/user.png')} style={cardStyle.headerPic} /> */}
              <AntDesign name="logout" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={cardStyle.pageBody}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {!cardList.length > 0 ? (
            <View style={[cardStyle.cardDesignContainer]}>
              <Animated.View
                style={{
                  width: "100%",
                  alignItems: "center",
                  paddingTop: 50,
                  right: slideAnim,
                }}
              >
                <Image
                  style={cardStyle.slideImg}
                  source={require("../../../assets/img/railcardhome.png")}
                />
                <Text style={cardStyle.mainTitle}>{t("welcome")}</Text>
                <Text style={[cardStyle.mainTitle, { fontSize: 18 }]}>
                  {t("welcome-sub")}
                </Text>
                <Text style={cardStyle.indication}>{t("tap-plus")}</Text>
              </Animated.View>
            </View>
          ) : (
            <View style={[cardStyle.cardDesignContainer]}>
              {cardList.map((item, k) => (
                <View
                  key={k}
                  style={[cardStyle.boxContainer, { width: "100%" }]}
                >
                  <View
                    style={[
                      cardStyle.cardBox,
                      Shadows.small,
                      { backgroundColor: Colors.grey, padding: 0 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setRowData(item);
                        setCardModalShow(true);
                      }}
                    >
                      <ImageBackground
                        source={require("../../../assets/img/heartwalebg.jpeg")}
                        style={{
                          flex: 1,
                          padding: 15,
                          paddingVertical: 30,
                          height: 120,
                          justifyContent: "center",
                        }}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 5 }}
                      >
                        <Text
                          style={[
                            cardStyle.cardTitle,
                            {
                              color: Colors.white,
                              fontSize: 32,
                              fontWeight: "600",
                            },
                          ]}
                        >
                          {"Heart of Wales"}
                        </Text>
                        {/* <View style={[cardStyle.cardButtonBox, { marginVertical: 20 }]}>
                                                        <TouchableWithoutFeedback onPress={() => {
                                                            // Linking.canOpenURL(item?.MintedURL).then(supported => {
                                                            //     if (supported) {
                                                            //         Linking.openURL(item?.MintedURL);
                                                            //     } else {
                                                            //         console.log("Don't know how to open URI: " + item?.MintedURL);
                                                            //     }
                                                            // })

                                                        }}>
                                                            <Text style={{ color: Colors.white }}>{item?.MintedURL}</Text>
                                                        </TouchableWithoutFeedback>
                                                    </View> */}
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default CardHome;
