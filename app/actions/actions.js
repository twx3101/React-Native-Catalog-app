import fetch from 'cross-fetch';

/* action types */

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const ADD_ORDER = 'ADD_ORDER';

/* action creators */

export function fetchProducts(products){
	return {
		type: FETCH_PRODUCTS,
		payload: products
	}
}

export function getProducts (){
	return function(dispatch){

	return fetch('https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products')
			.then((response) => response.json(),
			error => console.log('An error occurred' , error)
			)
			.then((responseJson) => 
				//console.log(JSON.stringify(responseJson)),
				dispatch(fetchProducts(responseJson))
			)
		}
	}

export function addToCart(item){
	return{
		type: ADD_TO_CART,
		payload: item
	}
}

export function removeItem(item){
	return{
		type: REMOVE_FROM_CART,
		payload: item
	}
}

export function emptyCart(){
	return{
		type: EMPTY_CART
	}
}

export function addOrder(data){
	return{
		type: ADD_ORDER,
		payload: data
	}
}