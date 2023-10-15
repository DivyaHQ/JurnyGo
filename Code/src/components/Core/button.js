import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ btnText, onPress, viewStyle, cusStyle, textStyle, disabled }) => {
    return (
        <View style={[{ width: '100%' }, viewStyle]}>
            <TouchableOpacity style={[style.btnPrimary, cusStyle, { opacity: disabled ? 0.4 : 1 }]} disabled={disabled} activeOpacity={0.7} onPress={onPress}>
                <Text style={[style.innerText, textStyle]}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    btnPrimary: {
        backgroundColor: '#6369f5',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    innerText: {
        color: '#fff',
        fontWeight: '600',
    }
})
export default Button