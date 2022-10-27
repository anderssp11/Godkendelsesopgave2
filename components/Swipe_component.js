//Source: https://instamobile.io/react-native-controls/react-native-swipe-cards-tinder/ 

import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
//Konfiguerer dimensioner. 
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

//Her er et billede som bliver vist igen og igen når der swipes. 
//Dette skal i fremtiden skiftes ud med billeder af ingredienser ud fra en algoritme. 
const Users = [
  { id: "1", uri: require("../assets/burger.png") }
]

export default class Swipe_component extends React.Component {

    
    constructor() {
      super()
      this.position = new Animated.ValueXY()
      this.state = {
        currentIndex: 0
      }
  
      this.rotate = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH /2 ,0, SCREEN_WIDTH /2],
        outputRange: ['-30deg', '0deg', '10deg'],
        extrapolate: 'clamp'
      })
  
      this.rotateAndTranslate = {
        transform: [{
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
        ]
      }
      this.likeOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
      })
      this.dislikeOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
      })
  
      this.nextCardOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
      })
      this.nextCardScale = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
      })
  
    }
    //Panresponder benyttes til at dragge. 
    UNSAFE_componentWillMount() {
      this.PanResponder = PanResponder.create({
  
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
  
          this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
        },
        // Sørger for der swipes når man dragger. 
        onPanResponderRelease: (evt, gestureState) => {
  
          if (gestureState.dx > 120) {
            Animated.spring(this.position, {
              toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
              useNativeDriver: true 
            }).start(() => {
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            })
          }
          else if (gestureState.dx < -120) {
            Animated.spring(this.position, {
              toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
              useNativeDriver: true 
            }).start(() => {
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            })
          }
          //Sørger for der kun swipes hvis man dragger langt nok. 
          else {
            Animated.spring(this.position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
              friction: 4
            }).start()
          }
        }
      })
    }
// Her bliver det samme billede vist hver gang, da stack viser index 0 hver gang. 
    renderUsers = () => {
  
      return Users.map((item, i) => {
        i == 0
          return (
            
            <Animated.View
            
              {...this.PanResponder.panHandlers}
              key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'}]}>
            {/*Dette sørger for at billederne altid altid er i den rigtige størrelse uanset devise.*/}
              <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
  
              </Animated.View>
  
              <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
  
              </Animated.View>
            
              <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={item.uri} />
  
            </Animated.View>
          )
        }
      
      
    )}
  
    render() {
      return (
        <View style={{ flex: 1 }}>
            
          <View style={{ height: 60 }}>
  
          </View>
          <View style={{ flex: 1 }}>
            {this.renderUsers()}
          </View>
          <View style={{ height: 60 }}>
  
          </View>
  
  
        </View>
  
      );
    }
  }

  