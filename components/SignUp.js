import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  TouchableHighlight,
  Modal,
  Image,
  ScrollView
} from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import { login, ORDER_HISTORY_STORAGE_KEY } from "../utils/api";
import { Camera, Permissions } from "expo";
import { Icon, Button, FormInput } from "react-native-elements";
import SignUpCamera from "./SignUpCamera";
import axios from "axios";
import { blue, white, gray } from "../utils/colors";
import { KAIROS_ID, KAIROS_KEY } from "../secrets";

const createId = length => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: 'test@aol.com',
      password: '123',
      first: 'john',
      last: 'doe',
      card_num: '123456789123456',
      showCamera: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      photos: []
    };
    this.grabPhotos = this.grabPhotos.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
  }

  grabPhotos(photos) {
    this.setState({ photos });
  }

  toggleCamera() {
    this.setState({ showCamera: !this.state.showCamera });
  }

  handleSignUp() {
<<<<<<< HEAD
    let subjectId = createId(16);
    const { first, last, email, password, cardNum } = this.state;
    const photos = this.state.photos.map(pic => pic.base64);
||||||| merged common ancestors
    let subjectId = createId(16)
    const { first, last, email, password, cardNum } = this.state
    const photos = this.state.photos.map(pic => pic.base64)
=======
    let subject_id = createId(16)
    const { first, last, email, password, card_num } = this.state
    const photos = this.state.photos.map(pic => pic.base64)
>>>>>>> a4a3ab4b6923b4feb3bb9ea62b4fd79a36f6838c
    const user = {
      first,
      last,
      email,
      password,
<<<<<<< HEAD
      cardNum,
      subjectId
    };
||||||| merged common ancestors
      cardNum,
      subjectId
    }
=======
      card_num,
      subject_id
    }
>>>>>>> a4a3ab4b6923b4feb3bb9ea62b4fd79a36f6838c
    const kairoParams = {
<<<<<<< HEAD
      subject_id: subjectId,
      gallery_name: "go-gallery-5",
||||||| merged common ancestors
      subject_id: subjectId,
      gallery_name: 'go-gallery-5',
=======
      subject_id,
      gallery_name: 'go-gallery-5',
>>>>>>> a4a3ab4b6923b4feb3bb9ea62b4fd79a36f6838c
      image: photos[0]
    };
    axios({
      method: "post",
      url: "https://api.kairos.com/enroll",
      data: kairoParams,
      headers: {
        "Content-Type": "application/json",
        app_id: KAIROS_ID,
        app_key: KAIROS_KEY
      }
    })
      .then(success => {
        console.log("came back from kairo", success);
        return axios.post(
          "https://smart-mart-server.herokuapp.com/auth/signup-image",
          user
        );
      })
      .then(res => res.data)
      .then(res => {
        console.log("got new user", res);

        if (res.email) {
          alert(`Welcome ${res.first} ${res.last}`);
          login(res)
            .then(response => {
              this._navigateTo("Tabs");
            })
            .catch(err => console.log(err));
        } else {
          alert("User not found");
        }
      });
  }
  _navigateTo = routeName => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  };
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.view}>
          <View style={styles.container}>
            <Image
              style={{ height: 150, width: 150, alignSelf: "center" }}
              source={require("../smartmartcart.png")}
            />
            <View style={styles.form}>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                onChangeText={first => this.setState({ first })}
                underlineColorAndroid="transparent"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                onChangeText={last => this.setState({ last })}
                underlineColorAndroid="transparent"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                underlineColorAndroid="transparent"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Card Number"
                onChangeText={cardNum => this.setState({ cardNum })}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
              />
              <View style={styles.photoContainer}>
                {this.state.photos.map(img => (
                  <Image
                    key={img.uri}
                    style={styles.thumbnail}
                    source={{ uri: img.uri }}
                  />
                ))}
              </View>
              {this.state.photos.length ? (
                <View style={[styles.container, { width: "100%" }]}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.handleSignUp()}
                  >
                    <Text style={styles.text}>Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      this.setState({ showCamera: true, photos: [] });
                    }}
                  >
                    <Text style={styles.text}>Retake Photos</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.takePhotosBtn}
                  onPress={() => this.setState({ showCamera: true })}
                >
                  <Text style={styles.text}>Take Photos</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Modal
            visible={this.state.showCamera}
            animationType={"slide"}
            onRequestClose={() => this.closeModal()}
          >
            <SignUpCamera
              toggleCamera={this.toggleCamera}
              grabPhotos={this.grabPhotos}
            />
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    width: "80%",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "white"
  },
  form: {
    flex: 5,
    justifyContent: "flex-end",
    alignItems: "center"
    // width: '80%',
  },
  inputField: {
    height: 60,
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "gray",
    borderWidth: 1
  },
  photoContainer: {
    width: "100%",
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: gray,
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
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  textInput: {
    alignSelf: "stretch",
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: gray
  },
  btn: {
    alignSelf: "stretch",
    backgroundColor: blue,
    padding: 20,
    alignItems: "center",
    marginBottom: 20
  },
  text: {
    color: white
  },
  takePhotosBtn: {
    alignSelf: "stretch",
    backgroundColor: blue,
    padding: 20,
    alignItems: "center",
    marginBottom: 100
  }
});
