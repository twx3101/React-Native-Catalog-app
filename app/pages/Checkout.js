import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addOrder, emptyCart} from '../actions/actions'
import fetch from 'cross-fetch';

import Logo from './logo.component';
import Cart from './cart.component';

class CheckoutPage extends React.Component{
	static navigationOptions = ({navigation}) => {
	    return {
	      headerTitle: 'Checkout',
	      headerRight: <Cart navigation={navigation}/>
	    }
	  }

	constructor(props){
		super(props);
		this.state={name: '',
					phone: '',
					email: ''
					}
				}

  /* send POST request with order details*/
	postRequest(cartItems, customer){
		fetch('https://webhook.site/9c352c2c-fe98-4ce5-8e99-d854cd159795',{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				items: cartItems,
				customer: customer
			}),
			});
		}
	
 	renderTextField(options){
      return (
        <TextInput style={styles.textField} onChangeText={(value) => this.setState({[options.name]: value})} 
                placeholder= {options.label} value={this.state[options.name]} keyboardType= {options.keyboard || 'default'}/>
      );
  }

    /* pressing the confirmation button */
    onPressButton = () => {
        const {name, phone, email} = this.state;
        const { cartItems, navigation, addOrder, emptyCart } = this.props;
        if (name === '') { return Alert.alert('enter name')}
        if (phone === '') { return Alert.alert('enter phone')}
        if (email === '') { return Alert.alert('enter email')}
        let customer = { name: name, phone: phone, email: email}
        addOrder({items: cartItems, customer: customer});
        this.postRequest(cartItems, customer);
        emptyCart();
        this.setState({name: ''});
        this.setState({phone: ''});
        this.setState({email: ''});
        navigation.navigate('Confirmation');
    }

	render(){
    return(
    	<ScrollView>
	    	<KeyboardAvoidingView style={styles.container} behavior="padding">
	    	    <View style={styles.annouc}>
	    	        <Text style={styles.anncText}>Summary</Text>
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
	          <View style = {styles.panel} >
	            {this.renderTextField({name: 'name', label: 'Name'})}
	            {this.renderTextField({name: 'phone', label: 'Phone Number', keyboard: 'phone-pad'})}
	            {this.renderTextField({name: 'email', label: 'Email', keyboard:'email-address'})}
	            <TouchableOpacity style={styles.btn} onPress={this.onPressButton}>
	              <Text style={styles.btnText}>Confirm Order</Text>
	            </TouchableOpacity>
	          </View>
	        </KeyboardAvoidingView>
       	</ScrollView>
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
        flex: 4
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    panel: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10,
        margin: 10,
        flex: 2,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    textField: {
        height: 40,
        margin: 4,
    },
    btn: {
        backgroundColor: '#34495e',
        borderRadius: 3,
        padding: 10,
        height: 40
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14
    }
});

/* map redux store to props */
const mapStateToProps = (state) => ({
	cartItems: state.cartActions.cart,
	cartTotal: state.cartActions.total
})

export default connect(mapStateToProps, {addOrder, emptyCart})(CheckoutPage);