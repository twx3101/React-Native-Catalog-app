import React, { Component } from 'react';

import { Image, TouchableOpacity} from 'react-native';

const logoImage = require('../assets/jagastore.png')

class Logo extends Component {

  goHome = () => {
      this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <TouchableOpacity style={{marginLeft: 5}} onPress={this.goHome}>
          <Image source={logoImage} style={{width:40, height:40}}/>
      </TouchableOpacity>
    );
  }
}

export default Logo;