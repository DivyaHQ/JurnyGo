import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../constant/theme';

const DropdownOption = ({ options, leftIcon, value, setValue, isFocus, setIsFocus, searchHolderText, placeholder,
    labelItem, valueItem, maxHeight, showSearchBox, cusStyle, cusPlaceStyle, cusIcoStyle,
    handleFocus, handleBlur, handleChange }) => {


    return (
        <Dropdown
            style={[styles.dropdown, cusStyle, isFocus && { borderColor: Colors.gainsboro, }]}
            placeholderStyle={[styles.placeholderStyle, cusPlaceStyle]}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={[styles.iconStyle, cusIcoStyle]}
            data={options || []}
            search={showSearchBox}
            maxHeight={maxHeight || 300}
            labelField={labelItem || 'label'}
            valueField={valueItem || 'value'}
            placeholder={placeholder || 'Select'}
            searchPlaceholder={searchHolderText || 'search...'}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            renderLeftIcon={() => (
                leftIcon || null
                // <AntDesign
                //     style={styles.icon}
                //     color={isFocus ? 'blue' : 'black'}
                //     name="Safety"
                //     size={20}
                // />
            )}
        />
    )
}
const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        top: 5
    },
    placeholderStyle: {
        fontSize: 16,
        color: Colors.liteBlack
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})
export default DropdownOption