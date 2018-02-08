import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { NavigationActions } from "react-navigation";
import io from "socket.io-client";
import axios from "axios";
import { List, ListItem } from "react-native-elements";

const user = { id: 1, email: "rayzorboriqua280@aol.com" };

const socket = io("http://localhost:8080");
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "hello world",
      cart: [],
      order: []
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:8080/api/orders/cart/" + user.id)
      .then(data => {
        if(data.data) {
          this.setState({ cart: data.data.lineItems })
        }
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    socket.on("mobile-cart-update", function(data) {
      console.log("smobile socket working");
      this.setState({ cart: data.lineItems });
    });

    //when this user walks in grab newly created order from event, cart is empty.
    socket.on(`new-instore-user-${user.id}`, (data) => {
      this.setState({ order: data.order })
    })
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
