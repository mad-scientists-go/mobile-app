import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import OrderList from './components/OrderList';
import Cart from './components/Cart';
import Login from './components/Login';
import SingleOrder from './components/SingleOrder';
// import AddCard from './components/AddCard';
// import Quiz from './components/Quiz';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { setLocalNotification } from './utils/helpers';
import { blue, white, gray } from './utils/colors';

import SignUp from './components/SignUp'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  OrderList: {
    screen: OrderList,
    navigationOptions: {
      tabBarLabel: 'Order History',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={35} color={tintColor} />
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarLabel: 'My Cart',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='shopping-cart' size={30} color={tintColor} />
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : blue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Login,
  },
  Tabs: {
    screen: Tabs,
  },
  SingleOrder: {
    screen: SingleOrder,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
})



export default class App extends React.Component {
  componentDidMount(){
    // setLocalNotification()
  }
  render() {
    return (
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={gray} barStyle='light-content' />
        {/* <MainNavigator style={styles.title} /> */}
        <SignUp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
