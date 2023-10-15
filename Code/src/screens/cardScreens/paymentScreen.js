import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { StatusBar } from "react-native";
import { Colors } from "../../components/constant/theme";
import Button from "../../components/Core/button";
import axios from "axios";
import projectEnv from "../../projectEnv";
import { NavigatorContext } from "../../components/context/navigatorProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/Core/custom-statusbar";

const PaymentScreen = ({ navigation }) => {
  const { confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const { currentUser, setCurrentUser } = useContext(NavigatorContext);
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();

  async function handlePayAmount() {
    setLoader(true);
    const dt = await AsyncStorage.getItem("AppId");
    const json = await axios.post(
      `${projectEnv.API_KEY}RailCardPayByStripeWithAuth`,
      {
        UserId: currentUser?._id,
        GovtRowId: dt,
        Amount: 20,
      }
    );
    const stripeData = await json.data;
    const { paymentIntent, error } = await confirmPayment(stripeData?.Secret, {
      paymentMethodType: "Card",
    });
    if (error) {
      Toast.show(t("failPayment"), { type: "danger" });
    } else if (paymentIntent) {
      const values = {
        GovtRowId: dt,
        PaymentIntent: paymentIntent,
      };
      Toast.show(t("avoidBack"), {
        type: "warning",
      });
      const authJson = await axios.post(
        `${projectEnv.API_KEY}savePaymentInfoInRailCardWithAuth`,
        values
      );
      const authData = await authJson.data;
      if (authData.Status === "success") {
        setLoader(false);
        Toast.show(t("paidSuccess"), { type: "success" });
        navigation.pop(3);
      } else if (authData.Status === "error") {
        setLoader(false);
        Toast.show(t("failPay"), { type: "danger" });
      }
    }
  }
  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <MyStatusBar
        backgroundColor={Colors.defaultGrey}
        barStyle={"dark-content"}
      />
      <CardField
        postalCodeEnabled={false}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Button
        btnText={loader ? t("payProcess") : `${t("pay")} £ 20`}
        disabled={cardDetails?.complete === false || !cardDetails || loader}
        onPress={() => {
          handlePayAmount();
        }}
      />
    </View>
  );
};

export default PaymentScreen;
