import { combineReducers } from 'redux';
import {
	FETCH_PRODUCTS,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	ADD_ORDER
} from '../actions/actions';

const initialProductState = {
	products: [],
	isLoading: true
}
function productActions(state = initialProductState, action){
	switch (action.type){
		case FETCH_PRODUCTS:
			var a = {
				...state,
					products: action.payload,
				}
			console.log(a === state);
			return a;
	default:
		return state
	}
}
const initialCartState = {
	cart: [],
	total: 0
}

function cartActions(state = initialCartState, action){
	switch(action.type){
		case ADD_TO_CART:
			return{				
			...state,
				cart: [action.payload, ...state.cart],
				total: state.total + Number(action.payload.price)
			}
			
		case EMPTY_CART:
			return {
				...state,
					cart:[],
					total:0
				}
	
		case REMOVE_FROM_CART:
			return {
				...state,
					cart: state.cart.filter((item, i) => i !== action.payload.id),
					total: state.total - Number(action.payload.price)
				}
		default:
			return state;
	}
}

const initialOrder = []

var orderID = 0;

function orderAction(state = initialOrder, action){
	switch(action.type){
		case ADD_ORDER:
			orderID++;
			return [
				...state,
					{
						id: orderID,
						items: action.payload.items,
						customer: action.payload.customer
					}
				]
	
		default:
			return state		
	}
}

const rootReducer = combineReducers({
	productActions,
	cartActions,
	orderAction
});

export default rootReducer;