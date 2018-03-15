import React, { Component } from 'react'
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

// let cnt = 0

export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasCameraPermission: null,
          type: Camera.Constants.Type.front,
        };
        
      }



    capturePhotos() {
        //take 3 shots
        //setstate
        //close modal
        let cnt = 0
        let photos = []
        const snap = () => {
            // console.log(this.camera)
            return this.camera.takePictureAsync({ base64: true })
            .then(pic => {
                if(cnt > 2) {
                    clearInterval(interval)
                    cnt = 0
                    this.props.grabPhotos(photos)
                    this.props.toggleCamera()
                }
                // console.log('working', pic)
                photos = [...photos, pic]
                cnt++
            })
        }
        let interval = setInterval(snap, 300)

    }
    render() {
    return (
        <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => this.camera = ref}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                alignItems: "flex-end",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 50
              }}
            >
              <Button
                transparent={true}
                title="Flip"
                icon={{ name: "cached" }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              />
              <Button
                transparent={true}
                icon={{ name: "photo-camera", size: 36 }}
                alignSelf="center"
                onPress={() => this.capturePhotos()}
              />
              <Button
                transparent={true}
                icon={{ name: "cancel", size: 36 }}
                alignSelf="center"
                onPress={() => this.props.toggleCamera()}
              />
            </View>
          </Camera>
    )
  }
}
