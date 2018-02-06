import React, { Component } from 'react';
import {  TextInput, StyleSheet, View, AsyncStorage } from 'react-native';
import TextButton from './TextButton';
import { ORDER_HISTORY_STORAGE_KEY } from '../utils/api'

export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder', email: '' };
  }

  componentDidMount(){
    this._loadInitialState().done()
  }

  _loadInitialState = async () => {
    let value = await AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY)
    let email = JSON.parse(value)["email"]
    this.setState({email})
  }
  sendDispute() {
    fetch('http://localhost:8080/auth/sendDispute', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fromEmail: this.state.email,
      disputeMessage: this.state.text,
      orderInfo: this.props.navigation.state.params.order
    })
  })
  .then(() => console.log('dispute sent'))
  .catch(err => console.log(err))
  }
  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={{height: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        multiline={true}
      />
      <TextButton
         onPress={() => this.sendDispute()}
        >
          Send Dispute Email
        </TextButton>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
