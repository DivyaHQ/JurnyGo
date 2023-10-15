import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView, Switch } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigatorContext } from '../context/navigatorProvider';
import { Colors, FontSize, Titles } from '../constant/theme';
import globalStyle from '../../style/global';
import Button from '../Core/button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import sdkData from '../sdkData';
import MyStatusBar from '../Core/custom-statusbar';

const TargetModal = ({
    modalShow,
    setModalShow,
    targetSwitch,
    setTargetSwitch,
    handleChangeTarget,
}) => {
    const { showTutorial, setShowTutorial, privacyModalShow, setPrivacyModalShow } = useContext(NavigatorContext)
    const [Search, setSearch] = useState('')


    return (
        <Modal
            visible={modalShow}
            onRequestClose={() => { setModalShow(false) }}
            animationType='slide'
        >
            <MyStatusBar/>
            <View style={globalStyle.preferenceContainer}>
                <View style={[globalStyle.preferenceHeader, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity onPress={() => { setModalShow(false) }}>
                        <Feather name={'chevron-left'} style={{ color: Colors.white }} size={24} />
                    </TouchableOpacity>
                </View>
                <View style={globalStyle.preferenceBody}>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flex: 1,
                    }}>
                        <View style={[globalStyle.borderStyle, { paddingHorizontal: 0 }]}>
                            <TouchableWithoutFeedback onPress={() => { setTargetModalShow(true) }}>
                                <View style={[globalStyle.row, { justifyContent: 'space-between', alignContent: 'center', padding: 10 }]}>
                                    <Text style={[Titles.medium]}>
                                        Targeting
                                    </Text>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 25 }}>
                                        <Switch
                                            trackColor={{ true: Colors.btnPrimary, false: Colors.gray }}
                                            thumbColor={targetSwitch ? Colors.white : Colors.offWhite}
                                            onValueChange={() => { handleChangeTarget() }}
                                            value={targetSwitch}
                                            ios_backgroundColor={'grey'}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={globalStyle.listContainer}>
                            <Text style={[globalStyle.prefPara]}>We use the info you share to make your Railcard experience unique and to show you messaging and adverts that are more likely to be relevant to your interest.</Text>
                        </View>
                    </View>
                </View>
                <View style={[globalStyle.preferenceFooter, { height: 30, alignItems: 'center' }]}>
                    <Text style={{ color: Colors.white }}>Powered by OneTrust</Text>
                </View>
            </View>
        </Modal >
    )
}

export default TargetModal