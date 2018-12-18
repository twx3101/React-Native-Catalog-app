import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

export default class Confirmation extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
          headerLeft: null,
      }
    }

	render(){
		return(
		<View style={styles.container}>
			<View style={styles.icon}>
			{myIcon}
			<Text style={styles.text}>Your order has been submitted!</Text>
			</View>
		    <View style={styles.bottom}>
 
			<Button style={{backgroundColor: '#34495e'}}
                title="Back to Home"
                onPress={() => this.props.navigation.navigate('Home')}
            />  
		</View>
	  </View>

	);
	}

}

const myIcon = (<Icon name="checkcircleo" size={100} color='green' style={{textAlign: 'center', }}/>)

const styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    icon:{
    	paddingTop:'50%'
    },
    text:{
      textAlign: 'center',
    },
    bottom:{
    	flex:1,
    	justifyContent: 'flex-end',
    	marginBottom: 36
    },

   });