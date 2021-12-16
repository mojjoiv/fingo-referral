import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './Home'
import Details from './Details'

const MainApp = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home'
    },
    path: 'home'
  },
  Details: {
    screen: Details,
    navigationOptions: {
      headerTitle: 'Details'
    },
    path: 'details/:userId'
  }
})

export default () => {
  const prefix = 'https://fingo.africa'
  return <AppContainer uriPrefix={prefix} />
}
