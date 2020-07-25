import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent.js';
import About from './AboutComponent.js';

const MenuNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();

const MainNavigator = createDrawerNavigator();

const HomeNavigatorComp = () => (
  <HomeNavigator.Navigator initialRouteName="Home"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    }}}>
    <HomeNavigator.Screen name="Home" component={Home} options={{ title: 'Home' }} />
  </HomeNavigator.Navigator>
)

const AboutNavigatorComp = () => (
  <AboutNavigator.Navigator initialRouteName="About"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    }}}>
    <AboutNavigator.Screen name="About" component={About} options={{ title: 'About Us' }} />
  </AboutNavigator.Navigator>
)

const MenuNavigatorComp = () => (
  <MenuNavigator.Navigator initialRouteName="Menu"
    screenOptions= {{
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }}}>
    <MenuNavigator.Screen name="Menu" component={Menu} options={{ title: 'Menu' }}/>
    <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} options={{ title: 'Dish Details' }} />
  </MenuNavigator.Navigator>
)

const ContactNavigatorComp = () => (
  <ContactNavigator.Navigator initialRouteName="Contact"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    }}}>
    <ContactNavigator.Screen name="Contact" component={Contact} options={{ title: 'Contact Us' }} />
  </ContactNavigator.Navigator>
)


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }

  render() {
 
    return (
      <NavigationContainer style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator.Navigator initialRouteName="Home"
          drawerStyle= {{backgroundColor: "#D1C4E9"}} >
          <MainNavigator.Screen name="Home" component={HomeNavigatorComp} />
          <MainNavigator.Screen name="About Us" component={AboutNavigatorComp} />
          <MainNavigator.Screen name="Menu" component={MenuNavigatorComp} />
          <MainNavigator.Screen name="Contact Us" component={ContactNavigatorComp} />
        </MainNavigator.Navigator>
      </NavigationContainer>
    );
  }
}
  
export default Main;