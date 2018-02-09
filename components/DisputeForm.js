import React, { Component } from "react";
import { TextInput, StyleSheet, View, AsyncStorage } from "react-native";
import TextButton from "./TextButton";
import { ORDER_HISTORY_STORAGE_KEY } from "../utils/api";
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

export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", email: "" };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    let value = await AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY);
    let email = JSON.parse(value)["email"];
    this.setState({ email });
  };
  sendDispute() {
    fetch("https://smart-mart-server.herokuapp.com/auth/sendDispute", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fromEmail: this.state.email,
        disputeMessage: this.state.text,
        orderInfo: JSON.stringify(this.props.navigation.state.params.order)
      })
    })
      .then(() => console.log("dispute sent"))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={styles.card}>
            <TextInput
              style={{ height: 200, margin: 10 }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              multiline={true}
              placeholder="your message here"
            />
          </Card>
          <TextButton style={styles.btn} onPress={() => this.sendDispute()}>
            Send Dispute Email
          </TextButton>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
