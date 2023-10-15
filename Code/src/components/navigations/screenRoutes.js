import { View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigatorContext } from "../context/navigatorProvider";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { Colors } from "../constant/theme";
import navigationString from "../constant/navigationString";
import CarouselScreen from "../../screens/initialScreen/carouselScreen";
import CardHome from "../../screens/cardScreens/cardHome";
import AddRailCard from "../../screens/cardScreens/addCard";
import Settings from "../../screens/cardScreens/settings";
import AddCardForm from "../../screens/cardScreens/addCardForm";
import UserCardInfo from "../../screens/cardScreens/userCardInfo";
import Login from "../../screens/cardScreens/login";
import Register from "../../screens/cardScreens/register";
import CardPayment from "../../screens/cardScreens/cardPayment";

const Stack = createStackNavigator();

const TutorialRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={navigationString.InitialPage}
    >
      <Stack.Screen
        name={navigationString.InitialPage}
        component={CarouselScreen}
      />
    </Stack.Navigator>
  );
};
const MainRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={navigationString.Home}
    >
      <Stack.Screen name={navigationString.Home} component={CardHome} />
      <Stack.Screen name={navigationString.RailCard} component={AddRailCard} />
      <Stack.Screen name={navigationString.Settings} component={Settings} />
      <Stack.Screen name={navigationString.RailForm} component={AddCardForm} />
      <Stack.Screen
        name={navigationString.UserCardInfoForm}
        component={UserCardInfo}
      />
      <Stack.Screen name={navigationString.Payment} component={CardPayment} />
      <Stack.Screen name={navigationString.Login} component={Login} />
      <Stack.Screen name={navigationString.Register} component={Register} />
    </Stack.Navigator>
  );
};
const WhitePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <ActivityIndicator size={"large"} color={Colors.lightBlack} />
      </View>
    </SafeAreaView>
  );
};

const ScreenRoutes = () => {
  const { showTutorial, currentUser } = useContext(NavigatorContext);
  const [showWhite, setShowWhite] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhite(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return showWhite ? (
    <WhitePage />
  ) : showTutorial ? (
    <TutorialRoute />
  ) : (
    <MainRoutes />
  );
};

export default ScreenRoutes;
