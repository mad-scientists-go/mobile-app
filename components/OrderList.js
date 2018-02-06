import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { fetchOrders  } from '../utils/api';
import { dateReformat } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import SingleOrder from './SingleOrder';
import { white } from '../utils/colors';

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
          results.forEach(order => order["createdAt"] = dateReformat(order["createdAt"]))
        this.setState(() => ({orders: results}))
      })
      .catch(err => console.log(err))
  }

  goToOrder = (name) => {
    const { navigate } = this.props.navigation;
    return navigate('SingleOrder', { name })
  }



  render () {
    const { orders } = this.state
    return (
      <ScrollView>
      {orders.map((order, i) => {
        return (
          <View style={styles.container} key={order.id}>
            <TouchableOpacity onPress={() => this.goToOrder(i)}>
            <View style={styles.card}>
              <Text style={styles.title}>
              {order.createdAt}
              </Text>
              <Text style={{fontSize: 25}}>
                {`$${order.subtotal}`}
              </Text>
            </View>
            </TouchableOpacity>
          </View>
        )
      })}
    </ScrollView>
    )
  }
}

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
