import React, { Component } from "react";
import { ScrollView, StyleSheet, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import io from "socket.io-client";
import axios from "axios";
import { View } from "react-native";
// import { List, ListItem } from "react-native-elements";
import {
  Container,
  Content,
  Header,
  Footer,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem
} from "native-base";
import { ORDER_HISTORY_STORAGE_KEY } from "../utils/api";
// const user = { id: 1, email: "rayzorboriqua280@aol.com" };

const socket = io("https://smart-mart-server.herokuapp.com");
export default class Cart extends Component {
  static navigationOptions = {
    title: "Cart"
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "hello world",
      cart: [],
      order: {},
      user: {}
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY)
      .then(data => {
        tempusr = JSON.parse(data);
        return axios.get(
          "https://smart-mart-server.herokuapp.com/api/orders/cart/" +
            tempusr.id
        );
      })
      .then(data => {
        if (data.data) {
          this.setState({ cart: data.data.lineItems, user: tempusr, order: data.data });
        }
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    socket.on("mobile-cart-update", data => {
      console.log("new copy of cart incoming..");
      let cart = data.data.lineItems;
      this.setState({ cart, order: data.data });
    });

    //when this user walks in grab newly created order from event, cart is empty.
    socket.on(`new-instore-user-${this.state.user.id}`, data => {
      console.log("user walked into store, receiving new cart?");
      this.setState({ order: data.order, user: data.user });
    });
  }

  render() {
    let list = this.state.cart;
    let tax = this.state.order.subTotal * 0.07 || 0
    return (
      <Container>
        <View
          style={this.state.order ? styles.cartStatusIn : styles.cartStatusOut}
        >
          <Text style={styles.statusText}>
            {this.state.order ? "In Store" : "Out of Store"}
          </Text>
        </View>
        <Content>
          <List>
            {list.map((item, i) => (
              <ListItem
              key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>{item.product.name}</Text>
                <Text>
                  x{item.qty} ${item.qty * item.purchasePrice}
                </Text>
              </ListItem>
            ))}
          </List>
        </Content>
        <Footer style={styles.footer}>
          <Text style={{fontSize: 20}}>Subtotal: {this.state.order.subTotal || 0}</Text>
          <Text style={{fontSize: 20}}>Tax: {tax}</Text>
          <Text style={{fontSize: 30}}>Total: {(this.state.order.subTotal || 0) * tax}</Text>
        </Footer>
      </Container>
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
  statusText: {
    fontSize: 30,
    color: "white"
  },
  cartStatusIn: {
    width: "50%",
    height: "10%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "lime",
    alignItems: "center",
    borderRadius: 15
  },
  cartStatusOut: {
    width: "50%",
    height: "30%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "gray",
    alignItems: "center",
    borderRadius: 15
  },
  item: {},
  prompt: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 15,
    width: 300
  },
  footer: {
    flexDirection: "column"
  }
});
