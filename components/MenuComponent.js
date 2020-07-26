import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
}

class Menu extends Component {

    constructor(props){
        super(props)
    }

  renderMenuItem = ({item, index}) => {
    const { navigate } = this.props.navigation;
    return (
        <Animatable.View animation="fadeInRightBig" duration={2000} useNativeDriver={true}>
            <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{ uri: baseUrl + item.image}}
                />
        </Animatable.View>
        );
  };

  render() {

    if (this.props.dishes.isLoading) {
      return(
          <Loading />
      );
  }
  else if (this.props.dishes.errMess) {
      return(
          <View>            
              <Text>{this.props.dishes.errMess}</Text>
          </View>            
      );
  }
  else {
      return (
          <FlatList 
              data={this.props.dishes.dishes}
              renderItem={this.renderMenuItem}
              keyExtractor={item => item.id.toString()}
              />
      );
  }
}
}


export default connect(mapStateToProps)(Menu);