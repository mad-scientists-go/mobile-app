import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Modal,
  Image
} from "react-native";
import { Camera, Permissions } from "expo";
import { Icon, Button, FormInput } from "react-native-elements";
import SignUpCamera from "./SignUpCamera";

import secrets from '../secrets'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first: '',
      last: '',
      cardNum: '',
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
    let subjectId = createId(16)
    const { first, last, email, password, cardNum } = this.state
    const photos = this.state.photos.map(pic => pic.base64)
    const user = {
      first,
      last,
      email,
      password,
      cardNum,
      subjectId
    }
    const kairoParams = {
      subject_id: subjectId,
      gallery_name: 'go-gallery-5',
      image: photos[0]

    }
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/signup-image',
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
      <View>
        {/* password, first, last, cardNum */}
        <FormInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          containerStyle={styles.field}
        />
        <FormInput
          onChangeText={text => this.setState({ first: text })}
          value={this.state.first}
          containerStyle={styles.field}
        />
        <FormInput
          onChangeText={text => this.setState({ last: text })}
          value={this.state.last}
          containerStyle={styles.field}
        />
        <FormInput
          onChangeText={text => this.setState({ cardNum: text })}
          value={this.state.cardNum}
          containerStyle={styles.field}
        />
        <View style={styles.footer}>
          <View style={styles.photoContainer}>
            {this.state.photos.map(img => (
              <Image
                style={{ height: 50, width: 50, marginLeft: 5, marginRight: 5 }}
                source={{ uri: img.uri }}
              />
            ))}
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
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

        <Modal visible={this.state.showCamera}>
          <SignUpCamera
            grabPhotos={this.grabPhotos}
            toggleCamera={this.toggleCamera}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: '80%'
  },
  inputs: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  footer: {
    flex: 1
  },
  field: {
    // width: "80%",
    marginTop: 50,
    height: 40,
    backgroundColor: "red"
  },
  photoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
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