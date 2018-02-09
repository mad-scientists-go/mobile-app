import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Image
} from "react-native";
import { NavigationActions } from "react-navigation";
import io from "socket.io-client";
import axios from "axios";
import { List, ListItem } from "react-native-elements";
import { ORDER_HISTORY_STORAGE_KEY } from "../utils/api";

const socket = io("https://smart-mart-server.herokuapp.com");
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "hello world",
      cart: [],
      order: []
    };
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    let value = await AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY);
    setTimeout(() => {
      if (value === null) {
        this._navigateTo("AuthTabs");
      } else {
        this._navigateTo("Tabs");
      }
    }, 2500);
  };

  _navigateTo = routeName => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  };

  render() {
    let list = this.state.cart;
    return (
      <View style={styles.container}>
        <Image source={require("../smartmartcart.png")} style={styles.photo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff"
  }
});
