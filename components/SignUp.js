import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Modal,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { Camera, Permissions } from "expo";
import { Icon, Button, FormInput } from "react-native-elements";
import SignUpCamera from "./SignUpCamera";
import axios from 'axios'

import secrets from '../secrets'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@aol.com',
      password: '123',
      first: 'john',
      last: 'doe',
      cardNum: '123456789123456',
      showCamera: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      photos: []
    };
    this.grabPhotos = this.grabPhotos.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
  }

  grabPhotos(photos) {
    console.log(photos);
    this.setState({ photos });
  }

  toggleCamera() {
    this.setState({ showCamera: !this.state.showCamera });
  }

  handleSignUp() {
    let subject_id = createId(16)
    const { first, last, email, password, cardNum } = this.state
    const photos = this.state.photos.map(pic => pic.base64)
    const user = {
      first,
      last,
      email,
      password,
      cardNum,
      subject_id
    }
    const kairoParams = {
      subject_id,
      gallery_name: 'go-gallery-5',
      image: photos[0]

    }
    axios({
      method: 'post',
      url: 'https://api.kairos.com/enroll',
      data: kairoParams,
      headers: {
        'Content-Type': 'application/json',
        'app_id': secrets.kairos.key,
        'app_key': secrets.kairos.secret
      }
    })
    .then(success => {
      console.log('came back from kairo', success)
      return axios.post('https://smart-mart-server.herokuapp.com/auth/signup-image', user)
    })
    .then(user => {
      console.log('got new user', user)
      this.setState({ user })
    })
  }
  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.view}>
          <View style={styles.container}>
            <Image
              style={{height: 100, width: 100, alignSelf: 'center'}}
              source={require('../smartmartcart.png')}
            />
            <View style={styles.form}>
              <TextInput
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                style={styles.inputField}
              />
              <TextInput
                onChangeText={text => this.setState({ first: text })}
                value={this.state.first}
                style={styles.inputField}
              />
              <TextInput
                onChangeText={text => this.setState({ last: text })}
                value={this.state.last}
                style={styles.inputField}
              />
              <TextInput
                onChangeText={text => this.setState({ cardNum: text })}
                value={this.state.cardNum}
                style={styles.inputField}
              />
            </View>
            <View style={styles.photoContainer}>
              {this.state.photos.map(img => (
                <Image
                  style={styles.thumbnail}
                  source={{ uri: img.uri }}
                />
              ))}
            </View>
            <View style={styles.btnContainer}>
              <Button
                color="purple"
                title="Sign Up"
                onPress={() => this.handleSignUp()}
              />
              <Button
                color="purple"
                title="Take Photos"
                onPress={() => this.setState({ showCamera: true })}
              />
            </View>
          </View>
          <Modal
           visible={this.state.showCamera}
           animationType={'slide'}
           onRequestClose={() => this.closeModal()}
          >
            <SignUpCamera toggleCamera={this.toggleCamera} grabPhotos={this.grabPhotos} />
          </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  form: {
    flex: 5,
    justifyContent: "flex-end",
    alignItems: "center",
    // width: '80%',
  },
  inputField: {
    height: 60,
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderWidth: 1
  },
  photoContainer: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 5,
    marginBottom: 20
  },
  thumbnail: {
    height: 80,
    width: 80,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5
  },
  btnContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});

const createId = (length) => {
  let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}