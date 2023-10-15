import { View, Text, Image } from "react-native";
import React from "react";
import { Modal } from "react-native";
import cardStyle from "../../style/cardHome";
import { StatusBar } from "react-native";
import { Colors } from "../constant/theme";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../Core/custom-statusbar";

const CardDesignModal = ({ modalShow, setModalShow, rowData }) => {
  const { t } = useTranslation();
  function handleGetDate(datenumber) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dt = new Date(datenumber);

    let dd = dt.getDate();
    let mon = months[dt.getMonth()];
    let year = dt.getFullYear() + 1;
    return dd + " " + mon + " " + year;
  }
  return (
    <Modal
      visible={modalShow}
      // onRequestClose={() => { setModalShow(false) }}
      animationType="slide"
    >
      <MyStatusBar backgroundColor={Colors.btnPurple} barStyle={"dark-content"} />
      <View
        style={[cardStyle.container, { backgroundColor: Colors.btnPurple }]}
      >
        <View style={cardStyle.cardHeader}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              setModalShow(false);
            }}
          >
            <AntDesign name="close" size={20} color={Colors.white} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ padding: 5 }} onPress={() => { }}>
                        <AntDesign name='infocirlceo' size={20} color={Colors.white} />
                    </TouchableOpacity> */}
        </View>
        <View style={cardStyle.addCardBody}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={cardStyle.railCardTitle}>Heart of Wales</Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Image
                source={require("../../../assets/img/profile.png")}
                style={cardStyle.railImage}
              />
            </View>
            <View style={cardStyle.elemRow}>
              <View style={cardStyle.column}>
                <Text style={cardStyle.cardNormalText}>{t("issuedTo")}</Text>
                <Text style={cardStyle.cardNormalText}>{rowData?.Name}</Text>
              </View>
              <View style={cardStyle.column}>
                <Text style={cardStyle.cardNormalText}>{t("issued")}</Text>
                <Text style={cardStyle.cardNormalText}>Online</Text>
              </View>
            </View>
            <View style={cardStyle.elemRow}>
              <View style={[cardStyle.column, { width: "100%" }]}>
                <Text style={cardStyle.cardNormalText}>{t("validUntil")}</Text>
                <Text style={cardStyle.cardBoldText}>
                  {handleGetDate(rowData?.CreatedAt)}
                </Text>
              </View>
            </View>
            <View style={cardStyle.elemRow}>
              <View style={[cardStyle.column, { width: "100%" }]}>
                <Image
                  source={require("../../../assets/img/qr-code.png")}
                  style={[
                    cardStyle.railImage,
                    { borderWidth: 0, borderRadius: 0 },
                  ]}
                />
              </View>
            </View>
            <View style={cardStyle.elemRow}>
              <Text style={cardStyle.cardNormalText}>No. 08ZM01108827864</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CardDesignModal;
