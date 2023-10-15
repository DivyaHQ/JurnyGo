import { StyleSheet } from "react-native";
import { Colors } from "../components/constant/theme";

const cardStyle = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
    pageHeader: {
        height: 50,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.lightBlack,
    },
    iconContainer: {
        flexDirection: 'row',
        width: 130,
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    headerPic: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 50
    },
    pageBody: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    slideImg: {
        width: '100%',
        maxHeight: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 5,
        color: 'darkblue',
        textAlign: 'center',
    },
    indication: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: 20
    },
    addCardBody: {
        flex: 1,
        padding: 20,
    },
    addCardBtn: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.darkblue,
        borderRadius: 5,
        alignItems: 'center',
    },
    cardDesignContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    boxContainer: {
        width: '50%',
        height: 'auto',
        minHeight: 50,
        paddingVertical: 10,
    },
    cardBox: {
        width: '100%',
        flex: 1,
        padding: 15,
        borderRadius: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    cardButtonBox: {
        height: 30,
        justifyContent: 'flex-end',
    },
    version: {
        height: 30,
        alignItems: 'center'
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gainsboro
    },
    buttonFooter: {
        height: 80,
        alignItems: 'center'
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center'
    },
    addCardImg: {
        width: 150,
        height: 150,
        objectFit: 'contain'
    },
    textBox: {
        fontSize: 16,
        borderBottomColor: Colors.lightBlack,
        borderBottomWidth: 2,
        paddingVertical: 10
    },
    continueBtn: {
        marginHorizontal: 15,
        marginTop: 10,
        height: 40,
        backgroundColor: Colors.darkblue

    },
    loginHeader: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    loginBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    loginTextbox: {
        width: '100%',
        marginVertical: 5,
        borderWidth: 1,
        borderColor: Colors.gainsboro,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        fontSize: 14,
        backgroundColor: Colors.gainsboro,
    },
    loginBtn: {
        backgroundColor: Colors.darkblue,
        color: Colors.white,
        borderRadius: 30,
        marginVertical: 10,
    },
    signText: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    signupBtn: {
        justifyContent: 'center', alignItems: 'center',
        marginLeft: 5,
    },
    errorMessage: {
        marginVertical: 0,
        color: Colors.red,
        fontWeight: '600',
        fontSize: 12,
        textAlign: 'left',
        marginLeft: 10,
    },
    formIdImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 5,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.lightBlack,
    },
    cardHeader: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    railCardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: 20,
    },
    railImage: {
        width: 150,
        height: 150,
        marginVertical: 15,
        resizeMode: 'contain',
        borderColor: Colors.gainsboro,
        borderWidth: 1,
        borderRadius: 10,
    },
    elemRow: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    column: {
        width: '50%',
        height: 'auto',
        minHeight: 50,
        paddingVertical: 10,
    },
    cardNormalText: {
        fontSize: 16,
        marginVertical: 2,
        fontWeight: '400',
        color: Colors.white
    },
    cardBoldText: {
        fontSize: 22,
        marginVertical: 2,
        fontWeight: '600',
        color: Colors.white
    },
    langContainer:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,.7)'},
    langOptionCard:{
        width:'85%',
        backgroundColor:Colors.white,
        height:'auto', 
        borderRadius:10,
        padding:10
    }
})
export default cardStyle