//import 'babel-polyfill'
import React from 'react';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/reducers';

import { FlatList, StyleSheet, Button, View, Text, ActivityIndicator, Image } from 'react-native';
import { createAppContainer, createStackNavigator, } from 'react-navigation'; // Version can be specified in package.json
import Dimensions from 'Dimensions';

import HomeScreen from './app/pages/Homepage';
import DetailsScreen from './app/pages/DetailsScreen';
import AppNavigator from './AppNavigator'
// class HomeScreen extends React.Component {

//   constructor(props){
//     super(props);
//     this.state = { isLoading:true}
//   }
//   componentDidMount(){
//     return fetch('https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         //console.log(JSON.stringify(responseJson[0].id));
//         this.setState({
//           isLoading: false,
//           dataSource: responseJson
//         }, function(){

//         });
//       })
//       .catch((error) =>{
//         console.error(error);
//       });
//   }
//   render() {
//     if(this.state.isLoading){
//       return(
//         <View style={{flex: 1, padding: 20}}>
//           <ActivityIndicator/>
//         </View>
//       )
//     }
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={this.state.dataSource}
//           renderItem={({item}) => 
//             <View style={styles.rowContainer}>
//               <Image source ={{uri: item.images[0].src}} style={styles.imageView}/>
//               <View style={styles.rowText}>
//                 <Text style={styles.textView} numberOfLines={2} ellipsizeMode ={'tail'}> {item.name}</Text>
//                 <Text style={styles.priceView} numberOfLines={1} ellipsizeMode ={'tail'}> ${Number(item.price).toFixed(2)}  </Text>
//                 <Text style={[styles.stockView, (item.in_stock) ? styles.green : styles.red]} numberOfLines={1} ellipsizeMode ={'tail'}> 
//                   {item.in_stock ? 'In Stock.' : 'Not in Stock.'}
//                 </Text>
//               </View>
//             </View>
//           }
//           keyExtractor={({id}, index) => id.toString()}
//         />      
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Button
//           title="Go to Details"
//           onPress={() => this.props.navigation.navigate('Details')}
//         />
//       </View>
//     </View>
//     );
//   }
// }

// class DetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//         <Button
//           title="Go to Details... again"
//           onPress={() => this.props.navigation.push('Details')}
//         />
//         <Button
//           title="Go to Home"
//           onPress={() => this.props.navigation.navigate('Home')}
//         />
//         <Button
//           title="Go back"
//           onPress={() => this.props.navigation.goBack()}
//         />
//       </View>
//     );
//   }
// }
const loggerMiddleware = createLogger()

const store = createStore(rootReducer, applyMiddleware(
  thunkMiddleware, loggerMiddleware));

export default class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
      )
  }
}


// const RootStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     Details: {
//       screen: DetailsScreen,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

// const AppContainer = createAppContainer(RootStack);

// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

// var {height, width} = Dimensions.get('window');
// const styles = StyleSheet.create({
//     container: {
//      flex: 1,
//      paddingTop: 22,
//      color: 'white'
//     },
//     rowContainer:{
//       flexDirection: 'row',
//       backgroundColor: '#FFF',
//       height: 120,
//       padding: 10,
//       marginRight: 10,
//       marginLeft: 10,
//       marginTop: 10,
//       borderRadius: 4,
//       shadowOffset:{  width: 1,  height: 1,  },
//       shadowColor: '#CCC',
//       shadowOpacity: 1.0,
//       shadowRadius: 1
//     },
//     imageView: {
//     //flex:1,
//       width: '40%',
//       height: 100 ,
//       resizeMode: 'cover',
//       margin: 7,
//       borderRadius : 7
   
//   },
 
//   textView: {
//     paddingLeft: 10,
//     paddingTop: 5,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#777',
//     flexWrap: 'wrap',
//     flex: 1
 
//   },
//   priceView: {
//     paddingLeft: 10,
//     marginTop: 5,
//     fontSize: 14,
//     color: '#777',
    


//   },
//   stockView: {
//     paddingLeft: 10,
//     marginLeft: 5,
//     marginTop: 5,
//     fontSize: 14,
    
//   },
//   green:{
//     color: '#00ff00'
//   },
//   red:{
//     color : '#ff0000'
//   },
//   rowText: {
//     flex: 1,
//     flexDirection: 'column'
//   },


// })
