import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { fetchOrders  } from '../utils/api';
import { dateReformat } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import SingleOrder from './SingleOrder';
import { white } from '../utils/colors';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';

export default class OrderList extends Component {
  state = {
    orders: []
  }

  static navigationOptions = {
    title: 'Order History',
  };

  componentDidMount() {
    fetchOrders()
      .then((results) => {
        if (results){
          results.forEach(order => order["createdAt"] = dateReformat(order["createdAt"]))
        this.setState(() => ({orders: results}))
        }

      })
      .catch(err => console.log(err))
  }

  goToOrder = (name) => {
    const { navigate } = this.props.navigation;
    return navigate('SingleOrder', { name })
  }



  render () {
    const { orders } = this.state
    return orders.length ? (
      <ScrollView>
      {orders.map((order, i) => {
        return (
          <Container key={order.id}>
        {/* <Header /> */}
        <Content>
          <Card>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
        </Content>
      </Container>
          // <View style={styles.container} key={order.id}>
          //   <TouchableOpacity onPress={() => this.goToOrder(i)}>
          //   <View style={styles.card}>
          //     <Text style={styles.title}>
          //     {order.createdAt}
          //     </Text>
          //     <Text style={{fontSize: 25}}>
          //       {`$${order.subtotal}`}
          //     </Text>
          //   </View>
          //   </TouchableOpacity>
          // </View>
        )
      })}
    </ScrollView>
    )
    :
    (
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>
            Thank you for signing for Smart Mart!
            Say goodbye to waiting in line!
        </Text>
      </View>
    )
  }
}


// export default class CardListExample extends Component {
//   render() {
//     return (

//     )
//   }
// }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    width: 375,
    borderBottomWidth: 0.5
  },
  card: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 375,
    borderBottomWidth: 0.5
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
});
