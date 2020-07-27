import React, { Component } from 'react';
import { View, Platform, Text, Image, StyleSheet, NetInfo, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent.js';
import About from './AboutComponent.js';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoritesNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();

const MainNavigator = createDrawerNavigator();

const HomeNavigatorComp = ({navigation}) => (
  <HomeNavigator.Navigator initialRouteName="Home"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    },
    headerLeft: () => (<Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer()} />)
    }} >
    <HomeNavigator.Screen name="Home" component={Home} options={{ title: 'Home' }} />
  </HomeNavigator.Navigator>
)

const AboutNavigatorComp = ({navigation}) => (
  <AboutNavigator.Navigator initialRouteName="About"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    },
    headerLeft: () => (<Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer()} />)
    }} >
    <AboutNavigator.Screen name="About" component={About} options={{ title: 'About Us' }} />
  </AboutNavigator.Navigator>
)

const MenuNavigatorComp = ({navigation}) => (
  <MenuNavigator.Navigator initialRouteName="Menu"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    },
    headerLeft: () => (<Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer()} />)
    }} >
    <MenuNavigator.Screen name="Menu" component={Menu} options={{ title: 'Menu' }}/>
    <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} options={{ title: 'Dish Details' }} />
  </MenuNavigator.Navigator>
)

const ContactNavigatorComp = ({navigation}) => (
  <ContactNavigator.Navigator initialRouteName="Contact"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    },
    headerLeft: () => (<Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer()} />)
    }} >
    <ContactNavigator.Screen name="Contact" component={Contact}  options={{ title: "Contact Us",
 }}/>
  </ContactNavigator.Navigator>
)

const ReservationNavigatorComp = ({navigation}) => (
  <ReservationNavigator.Navigator initialRouteName="Reservation"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    },
    headerLeft: () => (<Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer()} />)
    }} >
    <ReservationNavigator.Screen name="Reservation" component={Reservation} options={{ title: 'Reservation' }} />
  </ReservationNavigator.Navigator>
)

const FavoritesNavigatorComp = ({navigation}) => (
  <FavoritesNavigator.Navigator initialRouteName="Favorites"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    },
    headerLeft: () => (<Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer()} />)
    }} >
    <FavoritesNavigator.Screen name="Favorites" component={Favorites} options={{ title: 'My Favorites' }} />
  </FavoritesNavigator.Navigator>
)

const LoginNavigatorComp = ({navigation}) => (
  <LoginNavigator.Navigator initialRouteName="Login"
  screenOptions= {{
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    },
    headerLeft: () => (<Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer()} />)
    }} >
    <LoginNavigator.Screen name="Login" component={Login} options={{ title: 'Login' }} />
  </LoginNavigator.Navigator>
)

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <View style={{flex:1}}>
      <Image source={require('./images/logo.png')} style={styles.drawerImage} />
      </View>
      <View style={{flex: 2}}>
        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
      </View>
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
)


class Main extends Component {
  
  constructor(props) {
    super(props);
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.getConnectionInfo()
      .then((connectionInfo) => {
          ToastAndroid.show('Initial Network Connectivity Type: '
              + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
              ToastAndroid.LONG)
      });

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  render() {
 
    return (
      <NavigationContainer style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator.Navigator initialRouteName="HomeNav"
          drawerStyle= {{backgroundColor: "#D1C4E9"}}
          drawerContent={(props) => <CustomDrawerContent {...props} />} >
          <MainNavigator.Screen name="HomeNav" component={HomeNavigatorComp} 
            options={{
              drawerLabel: 'Home',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='home'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              ),    
            }} />
          <MainNavigator.Screen name="AboutNav" component={AboutNavigatorComp} 
            options={{
              drawerLabel: 'About Us',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='info-circle'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              ),    
            }} />
          <MainNavigator.Screen name="MenuNav" component={MenuNavigatorComp} 
            options={{
              drawerLabel: 'Menu',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='list'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              ),    
            }} />          
          <MainNavigator.Screen name="ContactNav" component={ContactNavigatorComp} 
            options={{
              drawerLabel: 'Contact Us',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='address-card'
                  type='font-awesome'            
                  size={22}
                  color={tintColor}
                />
              ),    
            }} />
          <MainNavigator.Screen name="ReservatioNav" component={ReservationNavigatorComp} 
            options={{
              drawerLabel: 'Reservation',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='cutlery'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              ),    
            }} />
          <MainNavigator.Screen name="FavoritesNav" component={FavoritesNavigatorComp} 
            options={{
              drawerLabel: 'My Favorites',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='heart'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              ),    
            }} />  
          <MainNavigator.Screen name="LoginNav" component={LoginNavigatorComp} 
            options={{
              drawerLabel: 'Login',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='sign-in'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              ),    
            }} />              
        </MainNavigator.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);