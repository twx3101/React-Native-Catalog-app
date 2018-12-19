import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Logo from './logo.component';
import Cart from './cart.component';

class CartPage extends React.Component {
	static navigationOptions = ({navigation}) => {
	    return {
	      headerTitle: 'Your Cart',
	      headerLeft: <Logo navigation={navigation}/>,
	      headerRight: <Cart navigation={navigation}/>
	    }
	  }

	 render(){
    return(
    	<View style={styles.container}>

    	    <View style={styles.annouc}>
    	         <Text style={styles.anncText}>Please confirm your order and checkout your cart.</Text>
    	    </View>
          <FlatList data={this.props.cartItems} renderItem={({item}) =>
            <View style={styles.rowContainer}>
                <View style={styles.productDes}>
                    <Text style={styles.wordtext} numberOfLines={2} ellipsizeMode ={'tail'}>{item.name}</Text>
                    <Text style={styles.pricetext}>${Number(item.price).toFixed(2)}</Text>
                </View>
            </View>
              } keyExtractor={({id}, index) => id.toString()} ItemSeparatorComponent= {()=> <View style={{height:0.3, backgroundColor:'#34495e90'}}/>}
          />
          <Text style={styles.text}>Total: $ {(this.props.cartTotal).toFixed(2)}</Text> 
    	    <Button style={{backgroundColor: '#34495e'}}
                title="Proceed to Checkout"
                onPress={() => this.props.navigation.navigate('Checkout')}
            />  
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
    annouc:{
      padding: 12,
      borderRadius: 5,
      backgroundColor: '#34495e90',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text:{
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16
    },

    wordtext: {
      textAlign: 'center',
      color: 'black',
      flexWrap: "wrap",
      flex: 4
    },
    pricetext:{
      textAlign: 'center',
      color: 'black',
      flex: 1
    },
    anncText:{
        textAlign: 'center',
        color: '#fff'  
    },
     rowContainer:{
        flex: 1
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
})

const mapStateToProps = (state) => {
    return { 
    cartTotal: state.cartActions.total,
    cartItems: state.cartActions.cart
     }
}
export default connect(mapStateToProps)(CartPage);


