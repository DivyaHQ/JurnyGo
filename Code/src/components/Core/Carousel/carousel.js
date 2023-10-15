import { View, Text, FlatList, useWindowDimensions, StyleSheet } from 'react-native'
import React, { Fragment, useState } from 'react'
import CarouselSlide from './carouselSlide';

const CarouselSlider = ({ flatRef, carouselData, currentIndex, setCurrentIndex, handleUpdateSlideIndex }) => {
    const { height } = useWindowDimensions();
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={flatRef}
                onMomentumScrollEnd={handleUpdateSlideIndex}
                pagingEnabled 
                data={carouselData}
                bounces={false}
                bouncesZoom={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ height: height/2 }}
                renderItem={({ item }) =>
                    <CarouselSlide item={item} />
                }
            />
            {/* footer */}
            <View style={style.footerContainer}>
                <View style={style.dotRow}>
                    {carouselData &&
                        carouselData.map((item, index) => (
                            <View key={index} style={[style.indicator, currentIndex === index && style.activeIndicator]}></View>
                        ))
                    }
                </View>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    footerContainer: {
        height: 40,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    dotRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    activeIndicator: {
        width: 25,
        height: 5,
        backgroundColor: '#495057'
    }
})
export default CarouselSlider