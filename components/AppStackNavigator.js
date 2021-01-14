import React,{Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import BookDonateScreen from '../screens/BookDonateScreen'
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen'

export const AppStackNavigator= createStackNavigator({
    BookDonateScreen:{screen:BookDonateScreen1,
    navigationOptions:{HeaderShown:false}
  },
RecieverDetailsScreen:{screen:RecieverDetailsScreen,
navigationOptions:{HeaderShown:false}
 },  
},
  {initialRouteName:"BookDonateScreen"}
   )