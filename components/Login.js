import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'
import { login, ORDER_HISTORY_STORAGE_KEY } from '../utils/api'
import { blue, white, gray } from '../utils/colors'

export default class Login extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.loginUser = this.loginUser.bind(this)
   // this._navigateTo = this._navigateTo.bind(this)
  }

  // componentDidMount() {
  //   this.setState({email: '', password: ''})
  // }

  // _loadInitialState = async () => {
  //   let value = await AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY)
  //   if (value !== null) {
  //     this.props.navigation.navigate('Tabs')
  //   }
  // }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

        <View style={styles.container}>
        <Image
          style={{height: 150, width: 150, alignSelf: 'center'}}
          source={require('../smartmartcart.png')}
        />

          <TextInput style={styles.textInput} placeholder='Email' onChangeText={ (email) => this.setState({email}) } underlineColorAndroid='transparent' />

          <TextInput style={styles.textInput} placeholder='Password' onChangeText={ (password) => this.setState({password}) } underlineColorAndroid='transparent' secureTextEntry={true} />

          <TouchableOpacity style={styles.btn} onPress={this.loginUser}>
            <Text style={styles.text}>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }


loginUser = () => {
  //this.props.navigation.navigate('Tabs')
  fetch('https://smart-mart-server.herokuapp.com/auth/login-mobile', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.password
    })
  }).then(result => result.json())
    .then((res) => {
      if (res.email) {
        alert(`Hello ${res.first} ${res.last}`)
         login(res)
         .then(response => {
           this.props.navigation.navigate('Tabs')
          // this._navigateTo('Tabs')
          })
         .catch(err => console.log(err))
        //  login(res)
        // AsyncStorage.setItem(ORDER_HISTORY_STORAGE_KEY, res.user)

      }
      else {
        alert('User not found')
      }
    })
    .done()
  }
    _navigateTo = (routeName) => {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })]
      })
      this.props.navigation.dispatch(actionToDispatch)
    }


}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    paddingLeft: 40,
    paddingRight: 40
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold'
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
    marginBottom: 50,
  },
  text: {
    color: white
  }
})
