import { StyleSheet } from "react-native";
import { Colors, FontSize } from "../components/constant/theme";

const globalStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 10,
    },
    carouselHeader: {
        height: 30
    },
    carouselFooter: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselNextButton: {
        flex: 1,
        height: 50,
        borderRadius: 5,
    },
    skipButton: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    skipText: {
        fontSize: 16
    },
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.cardBg,
        padding: 30,
    },
    topModalView: {
        flex: 1,
        alignItems: 'center'
    },
    modalTitle: {
        color: Colors.white,
        fontSize: FontSize.xLarge,
        fontWeight: '600'
    },
    modalPara: {
        color: Colors.white,
        fontSize: FontSize.medium,
        fontWeight: '400',
        alignItems: 'center',
        marginTop: 20,
        textAlign: 'center'
    },
    bottomModalView: {
        height: 150,
    },
    preferenceContainer: {
        flex: 1,
        backgroundColor: Colors.cardBg,
    },
    preferenceHeader: {
        height: 60,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop:0, 
    },
    preferenceBody: {
        flex: 1,
    },
    prefPara: {
        color: Colors.white,
        fontSize: FontSize.small,
        lineHeight: 16,
        fontWeight: '400',
        alignItems: 'center',
        marginTop: 20,
        textAlign: 'left'
    },
    anchorButton: {
        textDecorationLine: 'underline',
        color: 'blue',
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
    },
    borderStyle: {
        borderTopColor: Colors.white,
        borderTopWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    preferenceFooter: {
        height: 80,
        paddingHorizontal: 20,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    searchIconTextContainer: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.gray,
        borderRadius: 5,
        alignItems: 'center'
    },
    searchBox: {
        flex: 1,
        fontSize: 16,
        height: '100%',
        marginLeft: 10,
        paddingVertical:15,
        color: Colors.white,

    },
    listContainer: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        flex: 1
    }
})
export default globalStyle