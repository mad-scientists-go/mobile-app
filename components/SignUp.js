import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Modal
} from "react-native";
import { Camera, Permissions } from "expo";
import { Icon, Button } from "react-native-elements";
import SignUpCamera from './SignUpCamera'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "hello world",
      showCamera: true,
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      photos: []
    };
    this.grabPhotos = this.grabPhotos.bind(this)
    this.toggleCamera = this.toggleCamera.bind(this)
  }

  grabPhotos(photos) {
    this.setState({ photos })
  }

  toggleCamera() {
      this.setState({ showCamera: !this.state.showCamera })
  }

  snap() {

  }

  render() {
    return (
      <View style={styles.container}>
        {/* password, first, last, cardNum */}
        {/* <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.field}
        />
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.field}
        />
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.field}
        />
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.field}
        /> */}
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.field}
        />
        <View style={styles.footer}>
          <View style={styles.photoContainer}>
            <Text>pic container</Text>
          </View>
          <View>
            <TouchableHighlight onPress={() => console.log("signup")}>
              <Text>signup</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.setState({ showCamera: true })}
            >
              <Text>take photos</Text>
            </TouchableHighlight>
          </View>
        </View>

        <Modal visible={this.state.showCamera}>
            <SignUpCamera grabPhotos={this.grabPhotos} toggleCamera={this.toggleCamera} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    width: "100%",
    marginTop: 50,
    height: 40,
    color: "red",
    backgroundColor: "red"
  }
});
