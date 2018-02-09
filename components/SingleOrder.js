import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { getOrder } from "../utils/api";
import { dateReformat } from "../utils/helpers";
import TextButton from "./TextButton";
import { NavigationActions } from "react-navigation";
import { List, ListItem } from "react-native-elements";
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
import { white, blue, gray } from "../utils/colors";

export default class SingleOrder extends Component {
  state = {
    order: {},
    opacity: new Animated.Value(0)
  };
  constructor(props) {
    super(props);
    this.goToDisputeForm = this.goToDisputeForm.bind(this);
  }

  componentWillMount() {
    const { opacity } = this.state;
    getOrder(this.props.navigation.state.params.name)
      .then(results => {
        results["createdAt"] = dateReformat(results["createdAt"]);
        this.setState(() => ({ order: results }));
      })
      .then(() =>
        Animated.timing(opacity, { toValue: 1, duration: 1000 }).start()
      );
  }

  goToDisputeForm = order => {
    const { navigate } = this.props.navigation;
    return navigate("DisputeForm", { order });
  }

  render() {
    const { order, opacity } = this.state;
    return !order.createdAt ? (
      <View>
        <Text>what</Text>
      </View>
    ) : (
      <Animated.View style={[styles.container, { opacity }]}>
        <Container style={styles.container}>
          <Content>
            <Card style={styles.card}>
              <Text style={styles.title}>{order.createdAt}</Text>
              {order.lineItems.map(item => {
                return (
                  <View key={item.product.id}>
                    <Text style={{ color: gray }}>
                      {item.qty} {item.product.name}{" "}
                      {"$" + item.purchasePrice + " each"}
                    </Text>
                  </View>
                );
              })}
              <Text style={{ fontSize: 25, color: gray }}>
                Subtotal
                {`$${order.subtotal}`}
              </Text>
            </Card>
            <TextButton
              style={styles.btn}
              onPress={() => this.goToDisputeForm(order)}
            >
              Dispute
            </TextButton>
          </Content>
        </Container>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: gray
  },
  card: {
    flex: 1,
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 360
  },
  btn: {
    alignSelf: "stretch",
    alignItems: "center",
    margin: 3,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
});
