import React from 'react';
import { FlatList, StyleSheet, Button, View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator, } from 'react-navigation'; // Version can be specified in package.json
import Dimensions from 'Dimensions'

import { connect } from 'react-redux';
import { fetchProducts, getProducts, addToCart} from '../actions/actions'

import Logo from './logo.component';
import Cart from './cart.component';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Products',
      headerLeft: <Logo navigation={navigation}/>,
      headerRight: <Cart navigation={navigation}/>
    }
  }
  addToCart(item){
    console.log(item.price)

    this.props.addToCart(item);
  }

  toDetails(item){
    this.props.navigation.navigate('Details',{
      item: item
    })
  }

  loaded(){
    // console.log('haha')
    // console.log(this.props)

    if (this.props.products != undefined){
      this.state.isLoading = false
    }
  }

  constructor(props){
    super(props);
    this.state = { isLoading:true}
  }
  componentDidMount(){
    this.props.getProducts();
    //this.state = { isLoading:false}
    //console.log(this.props.products)
    // return fetch('https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //console.log(JSON.stringify(responseJson[0].id));
    //     this.setState({
    //       isLoading: false,
    //       dataSource: responseJson
    //     }, function(){

    //     });
    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });
  }
  render() {
    this.loaded()
    //console.log(this.props.notifications);
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
        <Button
            title="Refresh"
            onPress={() => this.forceUpdate()}
          />
          <ActivityIndicator/>
        </View>
      )
    }
    else{
      //console.log("RE-RENDERED");
      //this.print();
      return (
        <View style={styles.container}>
          <FlatList
            data={this.props.products}
            renderItem={({item}) => 
              <TouchableOpacity style={styles.rowContainer} onPress={this.toDetails.bind(this,item)}>
                <Image source ={{uri: item.images[0].src}} style={styles.imageView}/>
                <View style={styles.rowText}>
                  <Text style={styles.textView} numberOfLines={2} ellipsizeMode ={'tail'}> {item.name}</Text>
                  <Text style={styles.priceView} numberOfLines={1} ellipsizeMode ={'tail'}> ${Number(item.price).toFixed(2)}  </Text>
                  <Text style={[styles.stockView, (item.in_stock) ? styles.green : styles.red]} numberOfLines={1} ellipsizeMode ={'tail'}> 
                    {item.in_stock ? 'In Stock.' : 'Not in Stock.'}
                  </Text>
                  <TouchableOpacity onPress={this.addToCart.bind(this, item)} style={styles.addBtn}>
                    <Text style={{textAlign:'center'}}>Add to cart</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={({id}, index) => id.toString()} ItemSeparatorComponent= {()=> <View style={{height:0.5, backgroundColor:'#34495e90'}}/>}
          />      
      </View>
      );
    }
  }
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22,
     color: 'white'
    },
    rowContainer:{
      flexDirection: 'row',
      backgroundColor: '#FFF',
      height: 150,
      padding: 10,
      marginRight: 10,
      marginLeft: 10,
      marginTop: 10,
      borderRadius: 4,
      shadowOffset:{  width: 1,  height: 1,  },
      shadowColor: '#CCC',
      shadowOpacity: 1.0,
      shadowRadius: 1
    },
    imageView: {
    //flex:1,
      width: '40%',
      height: 100 ,
      resizeMode: 'cover',
      margin: 7,
      borderRadius : 7
   
  },
  addBtn: {
        borderRadius: 30,
        margin: 10,
        backgroundColor: '#1abc8c'
    },
 
  textView: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
    flexWrap: 'wrap',
    flex: 1
 
  },
  priceView: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: '#777',
    


  },
  stockView: {
    paddingLeft: 10,
    marginLeft: 5,
    marginTop: 5,
    fontSize: 14,
    
  },
  green:{
    color: '#00ff00'
  },
  red:{
    color : '#ff0000'
  },
  rowText: {
    flex: 1,
    flexDirection: 'column'
  },


})

// export default HomeScreen;

const mapStateToProps = (state) => {
  // console.log(state)
  // console.log(state.productActions.products)
  return { 
    products: state.productActions.products
     }
}



export default connect(mapStateToProps, {fetchProducts, getProducts, addToCart})(HomeScreen);