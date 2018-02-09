import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import OrderList from "./components/OrderList";
import Cart from "./components/Cart";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SingleOrder from "./components/SingleOrder";
import DisputeForm from "./components/DisputeForm";
import Splash from "./components/Splash";
import { TabNavigator, StackNavigator } from "react-navigation";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  Foundation
} from "@expo/vector-icons";
import { Constants } from "expo";
import { setLocalNotification } from "./utils/helpers";
import { blue, white, gray } from "./utils/colors";

const Tabs = TabNavigator(
  {
    OrderList: {
      screen: OrderList,
      navigationOptions: {
        tabBarLabel: "My Reciepts",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={35} color={tintColor} />
        )
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarLabel: "My Cart",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="shopping-cart" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? blue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : blue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const AuthTabs = TabNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: "Log In",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="sign-in" size={35} color={tintColor} />
        )
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        tabBarLabel: "Sign Up",
        tabBarIcon: ({ tintColor }) => (
          <Foundation name="clipboard-pencil" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? blue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : blue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Splash
  },
  AuthTabs: {
    screen: AuthTabs
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  SingleOrder: {
    screen: SingleOrder,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  DisputeForm: {
    screen: DisputeForm,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator style={styles.title} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
