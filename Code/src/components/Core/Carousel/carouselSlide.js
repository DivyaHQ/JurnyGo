import React, { Fragment } from 'react'
import { Dimensions, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'

const width = Dimensions.get('window').width - 20;
const CarouselSlide = ({ item }) => {
    return (
        <Fragment>
            <View style={style.slideContainer}>
                <View style={style.imageContainer}>
                    <Image source={item.imgUrl} style={style.slideImg} />
                </View>
                <Text style={style.slideTitle}>{item.title}</Text>
                <Text style={style.slideSubTitle}>{item.details}</Text>
            </View>
        </Fragment>
    )
}
const style = StyleSheet.create({
    slideContainer: {
        flex: 1,
        width: width,
        alignItems: 'center',
        paddingTop: 50,
    },
    imageContainer: {
        width: '70%',
        height: 200,
    },
    slideImg: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    slideTitle: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: '600',
        color: '#00064f',
    },
    slideSubTitle: {
        maxWidth: '80%',
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '400',
        color: '#495057'
    }
})
export default CarouselSlide