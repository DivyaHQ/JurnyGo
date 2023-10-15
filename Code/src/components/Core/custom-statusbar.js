import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { Colors } from '../constant/theme'

const MyStatusBar = ({backgroundColor,barStyle}) => {
  return (
    <View
    style={{
      height: StatusBar.currentHeight,
      backgroundColor:backgroundColor ?backgroundColor : Colors.cardBg,
    }}
  >
    <SafeAreaView>
      <StatusBar
        backgroundColor={Colors.cardBg}
        translucent
        barStyle={ barStyle ? barStyle :"light-content"}
      />
    </SafeAreaView>
  </View>
  )
}

export default MyStatusBar