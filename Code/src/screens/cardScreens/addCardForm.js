import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../components/constant/theme'
import cardStyle from '../../style/cardHome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Core/button'

const AddCardForm = ({ navigation }) => {
    const [downCode, setDownCode] = useState('')
    const { height } = useWindowDimensions()
    return (
        <View style={cardStyle.container}>
            <KeyboardAwareScrollView >
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                <View style={[cardStyle.pageHeader, { justifyContent: 'flex-start' }]}>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => { navigation.pop() }}>
                        <AntDesign name='arrowleft' size={20} />
                    </TouchableOpacity>
                    <Text style={[cardStyle.headerTitle, { marginLeft: 20 }]}>Add your RailCard</Text>
                </View>
                <View style={[cardStyle.addCardBody, { height: height - 150 }]}>
                    <View style={cardStyle.imageContainer}>
                        <Image style={cardStyle.addCardImg} source={require('../../../assets/img/addcard.png')} />
                    </View>
                    <TextInput
                        placeholder='Enter your download code'
                        placeholderTextColor={Colors.lightBlack}
                        cursorColor={Colors.black}
                        style={cardStyle.textBox}
                        value={downCode}
                        inlineImageLeft='search_icon'
                        autoFocus={true}
                        enterKeyHint='done'
                        // onSubmitEditing={() => setModalShow(false)}
                        onChangeText={(text) => { setDownCode(text) }} />
                </View>
                <View style={cardStyle.buttonFooter}>
                    <TouchableOpacity>
                        <Text style={{ color: Colors.darkblue }}>Need a new code?</Text>
                    </TouchableOpacity>
                    <Button btnText={'Continue'} cusStyle={cardStyle.continueBtn} />
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default AddCardForm