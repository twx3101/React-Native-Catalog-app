import React from 'react';
import { FlatList, StyleSheet, Button, View, Text, ActivityIndicator, Image, TouchableOpacity, WebView } from 'react-native';
import { createAppContainer, createStackNavigator, } from 'react-navigation'; // Version can be specified in package.json
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import { addToCart } from '../actions/actions';

import Logo from './logo.component';
import Cart from './cart.component';


class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: <Cart navigation={navigation}/>
    }
  }
  addToCart(item){
    console.log(item.price)

    this.props.addToCart(item);
  }
  // render() {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>Details Screen</Text>
  //       <Button
  //         title="Go to Confirmation "
  //         onPress={() => this.props.navigation.push('Confirmation')}
  //       />
  //       <Button
  //         title="Go to Home"
  //         onPress={() => this.props.navigation.navigate('Home')}
  //       />
  //       <Button
  //         title="Go back"
  //         onPress={() => this.props.navigation.goBack()}
  //       />
  //     </View>
  //   );
  // }
  render(){

    const { navigation } = this.props;
    const item = navigation.getParam('item', 'Not found');
    console.log(item.images[0].src);
    return(
      <View style={styles.container}>
        <View style={styles.image}>
          <Text style={styles.title}>{item.name}</Text>
          <Image source ={{uri: item.images[0].src}} style={styles.imageView}/>
        </View>
          <View style={{flex:2}}>
            <WebView source={{html:item.description}}/>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <Text style={styles.priceText}>${Number(item.price).toFixed(2)}</Text>
            <Text style={[styles.stockView, (item.in_stock) ? styles.green : styles.red]} numberOfLines={1} ellipsizeMode ={'tail'}> 
                      {item.in_stock ? 'In Stock.' : 'Not in Stock.'}
            </Text>
          </View>
            <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity onPress={this.addToCart.bind(this, item)} style={styles.addBtn}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Add to cart</Text>
            </TouchableOpacity>
             <TouchableOpacity  onPress={() => navigation.navigate('Checkout')} style={styles.toCart}>
                <Text style={{textAlign:'center'}}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </View>

      );
  }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22,
     color: 'white'
    },
  image: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:3
  },
  imageView:{
      flex:1,
      width: '50%',
      height: 100 ,
      resizeMode: 'cover',
      margin: 7,
      borderRadius : 7
  },
  title:{
    fontWeight: 'bold',
    color: '#777',
    //flexWrap: 'wrap',
    //flex: 1,
    textAlign: 'center',
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
  },
  desc:{
    flexWrap: 'wrap',
    flex: 1,
    fontSize: 12,
  },
  addBtn: {
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: '#FF7417',
        borderRadius: 30,
        width:'40%'

    },
  toCart:{
    borderColor: 'black',
    borderWidth: 1,  
    margin: 10,
    borderRadius: 30,
    width:'30%'

  },
  priceText: {
    //paddingLeft: 10,
    //flex:1,
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#777',
  },
  stockView: {
    //paddingLeft: 10,
    //marginLeft: 5,
   //flex:1,
    marginTop: 5,
    fontSize: 14,

    
  },
  green:{
    color: '#00ff00'
  },
  red:{
    color : '#ff0000'
  },


})


export default connect(null, {addToCart} )(DetailsScreen);