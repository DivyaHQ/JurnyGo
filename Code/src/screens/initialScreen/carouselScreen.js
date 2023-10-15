import { Modal, StatusBar, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { NavigatorContext } from '../../components/context/navigatorProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import globalStyle from '../../style/global'
import { SafeAreaView } from 'react-native-safe-area-context'
import CarouselSlider from '../../components/Core/Carousel/carousel'
import carouselData from '../../components/carouseltestData'
import Button from '../../components/Core/button'
import PrivacyModal from '../../components/modal/privacyModal'
import { Colors } from '../../components/constant/theme'

const CarouselScreen = () => {
    const { showTutorial, setShowTutorial, privacyModalShow, setPrivacyModalShow } = useContext(NavigatorContext)
    const [currentIndex, setCurrentIndex] = useState(0);
    const { width } = useWindowDimensions();
    const flatRef = useRef()


    function handleUpdateSlideIndex(e) {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const curIndex = Math.round(contentOffsetX / width)
        setCurrentIndex(curIndex);
    }
    const handleNextSlide = () => {
        const nextIndex = currentIndex + 1;
        const offset = (nextIndex * (width - 20));
        flatRef?.current?.scrollToOffset({ offset });
        setCurrentIndex(nextIndex)
    }
    const handleConfirmSkipTutorial = async () => {
        await AsyncStorage.setItem('showPrivacy', 'true');
        setPrivacyModalShow(true)
    }
    return (
        <SafeAreaView style={globalStyle.safeArea}>
            <StatusBar backgroundColor={Colors.defaultGrey} barStyle={'dark-content'} />
            <PrivacyModal modalShow={privacyModalShow} setModalShow={setPrivacyModalShow} />
            <View style={globalStyle.carouselHeader}>
                {currentIndex !== 2 &&
                    <TouchableOpacity activeOpacity={0.7} onPress={handleConfirmSkipTutorial} style={globalStyle.skipButton}>
                        <Text style={globalStyle.skipText}>Skip</Text>
                    </TouchableOpacity>}
            </View>
            <View style={{ flex: 1 }}>
                <CarouselSlider flatRef={flatRef} carouselData={carouselData} handleUpdateSlideIndex={handleUpdateSlideIndex} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
            </View>
            <View style={globalStyle.carouselFooter}>
                {currentIndex !== 2 ?
                    <Button onPress={handleNextSlide} btnText={'Next'}></Button>
                    :
                    <Button onPress={handleConfirmSkipTutorial} btnText={'Get Started'}></Button>
                }
            </View>
        </SafeAreaView>
    )
}

export default CarouselScreen