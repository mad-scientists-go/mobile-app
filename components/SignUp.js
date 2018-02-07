import React from 'react'
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
  ScrollView,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { login, ORDER_HISTORY_STORAGE_KEY } from '../utils/api'
import { Camera, Permissions } from "expo";
import { Icon, Button, FormInput } from "react-native-elements";
import SignUpCamera from "./SignUpCamera";
import axios from 'axios'
import { blue, white, gray } from '../utils/colors'

import secrets from '../secrets'

export default class SignUp extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props)
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
    }
    this.grabPhotos = this.grabPhotos.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
  }

  grabPhotos(photos) {
  //  console.log(photos);
    this.setState({ photos });
  }

  toggleCamera() {
    this.setState({ showCamera: !this.state.showCamera });
  }
  // componentDidMount() {
  //   this._loadInitialState().done()
  // }

  // _loadInitialState = async () => {
  //   let value = await AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY)
  //   if (value !== null) {
  //     this.props.navigation.navigate('Tabs')
  //   }
  // }
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
      //send user object to async storage
      //navigate to orders Tab
    })
  }
  render() {
    return (
      // <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
      //   <View style={styles.container}>
      //     <Text style={styles.header}>- SIGNUP -</Text>

      //     <TextInput style={styles.textInput} placeholder='Username' onChangeText={ (username) => this.setState({username}) } underlineColorAndroid='transparent' />

      //     <TextInput style={styles.textInput} placeholder='Password' onChangeText={ (password) => this.setState({password}) } underlineColorAndroid='transparent' secureTextEntry={true} />

      //     <TouchableOpacity style={styles.btn} onPress={this.loginUser}>
      //       <Text>Sign Up</Text>
      //     </TouchableOpacity>
      //   </View>
      // </KeyboardAvoidingView>
      <ScrollView style={{flex: 1}}>
      <KeyboardAvoidingView behavior={'padding'} style={styles.view}>
      <View style={styles.container}>
        <Image
          style={{height: 150, width: 150, alignSelf: 'center'}}
          source={require('../smartmartcart.png')}
        />
        <View style={styles.form}>
        <TextInput style={styles.textInput} placeholder='First Name' onChangeText={ (first) => this.setState({first}) } underlineColorAndroid='transparent' />
        <TextInput style={styles.textInput} placeholder='Last Name' onChangeText={ (last) => this.setState({last}) } underlineColorAndroid='transparent' />
        <TextInput style={styles.textInput} placeholder='Email' onChangeText={ (email) => this.setState({email}) } underlineColorAndroid='transparent' />
        <TextInput style={styles.textInput} placeholder='Password' onChangeText={ (password) => this.setState({password}) } underlineColorAndroid='transparent' secureTextEntry={true} />
        <TextInput style={styles.textInput} placeholder='Card Number' onChangeText={ (cardnum) => this.setState({cardnum}) } underlineColorAndroid='transparent' secureTextEntry={true} />
          {/* <TextInput
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
          /> */}
        <View style={styles.photoContainer}>
          {this.state.photos.map(img => (
            <Image
              key={img.uri}
              style={styles.thumbnail}
              source={{ uri: img.uri }}
            />
          ))}
        </View>
        {/* <View style={styles.btnContainer}> */}
          {/* <Button
            color="purple"
            title="Sign Up"
            onPress={() => this.handleSignUp()}
          /> */}
          {this.state.photos.length ?
          <View style={[styles.container, {width: '100%'}]}>
          <TouchableOpacity style={styles.btn} onPress={() => this.handleSignUp()}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => {
            this.setState({ showCamera: true, photos: [] })
            }}>
          <Text style={styles.text}>Retake Photos</Text>
        </TouchableOpacity>
        </View>
          :
          <TouchableOpacity style={styles.takePhotosBtn} onPress={() => this.setState({ showCamera: true })}>
            <Text style={styles.text}>Take Photos</Text>
          </TouchableOpacity>

          }
          {/* <Button
            color="purple"
            title="Take Photos"
            onPress={() => this.setState({ showCamera: true })}
          /> */}
        {/* </View> */}

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
  </ScrollView>
    )
  }
}



// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#2896d3',
//     paddingLeft: 40,
//     paddingRight: 40
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 60,
//     color: '#fff',
//     fontWeight: 'bold'
//   },
//   textInput: {
//     alignSelf: 'stretch',
//     padding: 16,
//     marginBottom: 20,
//     backgroundColor: '#fff'
//   },
//   btn: {
//     alignSelf: 'stretch',
//     backgroundColor: '#01c853',
//     padding: 20,
//     alignItems: 'center'
//   }
// })

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
    width: '100%',
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: gray
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: blue,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: white
  },
  takePhotosBtn: {
    alignSelf: 'stretch',
    backgroundColor: blue,
    padding: 20,
    alignItems: 'center',
    marginBottom: 100,
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
