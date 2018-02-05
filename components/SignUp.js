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

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "hello world",
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

  handleSignUp() {
    console.log("signup btn working");
    //do a post
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
        <FormInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          containerStyle={styles.field}
        />
        <FormInput onChangeText={text => this.setState({ email: text })} />
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
    width: "80%",
    marginTop: 50,
    height: 40,
    color: "red",
    backgroundColor: "red"
  },
  photoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
