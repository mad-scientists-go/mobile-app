import React, { Component } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { fetchOrders } from "../utils/api";
import { dateReformat } from "../utils/helpers";
import { NavigationActions } from "react-navigation";
import SingleOrder from "./SingleOrder";
import { white, blue, gray } from "../utils/colors";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right
} from "native-base";

export default class OrderList extends Component {
  state = {
    orders: []
  };

  static navigationOptions = {
    title: "My Reciepts"
  };

  componentWillMount() {
    fetchOrders()
      .then(results => {
        if (results) {
          results.forEach(
            order => (order["createdAt"] = dateReformat(order["createdAt"]))
          );
          this.setState(() => ({ orders: results }));
        }
      })
      .catch(err => console.log(err));
  }

  goToOrder = name => {
    const { navigate } = this.props.navigation;
    return navigate("SingleOrder", { name });
  };

  render() {
    const { orders } = this.state;
    return (
      <ScrollView>
        <Container>
          <Content>
            {orders.map((order, i) => {
              return (
                <TouchableOpacity
                  key={order.id}
                  onPress={() => this.goToOrder(i)}
                >
                  <Card>
                    <View style={styles.card}>
                      <Text style={styles.title}>{order.createdAt}</Text>
                      <Text style={styles.text}>{`$${order.subtotal}`}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  card: {
    flex: 1,
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 360
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: gray
  },
  text: {
    marginTop: 10,
    color: gray,
    fontSize: 20
  }
});
