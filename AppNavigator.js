import React from 'react';
import { createAppContainer, createStackNavigator, } from 'react-navigation'; // Version can be specified in package.json

import HomeScreen from './app/pages/Homepage';
import DetailsScreen from './app/pages/DetailsScreen';
import CartPage from './app/pages/CartPage';
import CheckoutPage from './app/pages/Checkout';
import Confirmation from './app/pages/ConfirmationScreen'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    CartPage: CartPage,
    Checkout: CheckoutPage,
    Confirmation: Confirmation,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }

);

const AppContainer = createAppContainer(RootStack);

export default class AppNavigator extends React.Component {
  render() {
    return (<AppContainer/>);
  }
}