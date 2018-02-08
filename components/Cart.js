import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import io from "socket.io-client";
import axios from "axios";
import { List, ListItem } from "react-native-elements";
import {ORDER_HISTORY_STORAGE_KEY} from '../utils/api'
// const user = { id: 1, email: "rayzorboriqua280@aol.com" };

const socket = io("https://smart-mart-server.herokuapp.com");
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "hello world",
      cart: [],
      order: [],
      user: {}
    };
  }

  componentWillMount() {
    // axios
    //   .get("https://smart-mart-server.herokuapp.com/api/orders/cart/" + user.id)
    //   .then(data => {
    //     if (data.data) this.setState({ cart: data.data.lineItems, order: data.data })
    //   })
    //   .catch(err => console.log(err))
  }
  componentDidMount() {
    AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY)
    .then(data => {
      data = JSON.parse(data)
      return axios.get("https://smart-mart-server.herokuapp.com/api/orders/cart/" + data.id)
    })
      .then(data => {
        if(data.data) {
          this.setState({ cart: data.data.lineItems })
          socket.on("mobile-cart-update", (data) => {
            console.log("smobile socket working");
            this.setState({ cart: data.lineItems });
          });

          //when this user walks in grab newly created order from event, cart is empty.
          socket.on(`new-instore-user-${user.id}`, (data) => {
            this.setState({ order: data.order })
          })
        }
      })
      .catch(err => console.log(err))

  }

  render() {
    let list = this.state.cart
    return (
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
        {list.map((l, i) => (
          <ListItem
            roundAvatar
            avatar={{ uri: 'https://cdn.pixabay.com/photo/2014/12/22/00/01/potato-576598_960_720.png' }}
            key={i}
            title={l.product.name}
          />
        ))}
      </List>
      <View>
        <Text>Subtotal:</Text>
        <Text>Tax:</Text>
        <Text>Subtotal</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100
  },
  item: {},
  prompt: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 15,
    width: 300
  }
});
