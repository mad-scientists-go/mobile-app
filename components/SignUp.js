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

// import Kairos from "kairos-api"
// const client = new Kairos("a85dfd9e", "f2a5cf66a6e3c657d7f9cfbb4470ada1")
// import random from "random-key";
import uuid from 'react-native-uuid'

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

  snap() {}

//   sendToKairos = () => {
//     let subject_id = random.generate()
//     let params = {
//       image: this.state.images[0],
//       subject_id,
//       gallery_name: "go-gallery-5",
//       selector: "SETPOSE"
//     };
//     client
//       .enroll(params)
//       .then(res => {
//         console.log(res);
//         params.image = this.state.images[1];
//         return client.enroll(params);
//       })
//       .then(res => {
//         console.log(res);
//         params.image = this.state.images[2];
//         return client.enroll(params);
//       })
//       .then(res => {
//         console.log('last image', res)
//         //post to our db with subj id
//         axios.post()
//       })
//       .catch(err => console.log(err));

//     //after sending all 3 images for that person, create subjectId on new user for signup

//     //user post
//   }
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
