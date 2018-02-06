import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native';
import { getOrder  } from '../utils/api'
import { dateReformat } from '../utils/helpers'
import TextButton from './TextButton'
import { orange, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'



export default class SingleOrder extends Component {
  state = {
    order: {},
    opacity: new Animated.Value(0)
  }
  constructor(props){
    super(props)
    this.goToDisputeForm = this.goToDisputeForm.bind(this)
  }
  // static navigationOptions = ({navigation}) => ({
  //   title: navigation.state.params.name
  // });

  componentDidMount() {
    const { opacity } = this.state;
    getOrder(this.props.navigation.state.params.name)
      .then((results) => {
        results["createdAt"] = dateReformat(results["createdAt"])
        this.setState(() => ({order: results}))
      })
        .then(() => Animated.timing(opacity, { toValue: 1, duration: 1000})
          .start()
        )
  }

   goToDisputeForm = (order) => {
     const { navigate } = this.props.navigation;
     return navigate('DisputeForm', {order})
   }

  // handleNavBack = (qna) => {
  //   const newDeck = this.state.deck;
  //   newDeck.questions.push(qna)
  //  this.setState(() => ({deck: newDeck}))
  // }


  render () {
    const { order, opacity } = this.state;
    return !order.createdAt ?
   ( <View>
      <Text>
        what
      </Text>
     </View>
     )
       : (
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.title}>
          {order.createdAt}
        </Text>
        <Text>
          Status: {order.status}
        </Text>
        {
          order.lineItems.map(item => {
            return (
            <View key={item.product.id}>
                <Text>{item.product.name}</Text>
                <Text>{'quantity' + ': ' + item.qty}</Text>
      <Text>{'total item price: $' + item.purchasePrice}</Text>
            </View>


            )
          })
        }
        {/* <List containerStyle={{marginBottom: 20}}>
  {
    order.lineItems.map((l, i) => (
      <ListItem
        key={i}
        title={l.product.name}
      >
      <Text>{'quantity' + ': ' + item.qty}</Text>
      <Text>{'total item price: ' + item.purchasePrice}</Text>
                </ListItem>
    ))
  }
</List> */}
        <Text style={{fontSize: 25, marginBottom: 50}}>Subtotal:
          {`$${order.subtotal}`}
        </Text>
        <TextButton
        onPress={() => this.goToDisputeForm(order)}
        >
          Dispute
        </TextButton>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    padding: 15
  },
});
