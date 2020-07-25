import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

  constructor(props) {
      super(props);
      this.state = {
          dishes: DISHES
      };
  }

  static navigationOptions = {
    title: 'Menu'
  };

  

	renderMenuItem = ({item, index}) => {
    const { navigate } = this.props.navigation;
		return (
			<ListItem
				key={index}
				title={item.name}
				subtitle={item.description}
				hideChevron={true}
				onPress={() => navigate('Dishdetail', { dishId: item.id })}
				leftAvatar={{ source: {uri: item.image}}}
			/>
		);
	};

  render() {

    return (
      <FlatList 
        data={this.state.dishes}
        renderItem={this.renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}


export default Menu;