// ./user-react-native-app/components/screens.js
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import App from '../containers/App';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home';
import SideBar from "./SideBar.js";
import CreateEvent from '../containers/CreateEvent';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Button,
    ScrollView,
    Dimensions
} from 'react-native';

import { addListener } from '../utils/redux';
import SetEventLocation from '../containers/SetEventLocation';

export const AppNavigator = DrawerNavigator({
  App: { screen: App },
  Login: { screen: Login },
  Register: { screen: Register },
  Home: { screen: Home },
  CreateEvent: { screen: CreateEvent },
  SetEventLocation: { screen: SetEventLocation },
},{
  initialRouteName: 'App',
  headerMode:'node',
  contentComponent: props => <SideBar {...props} />,
  contentOptions: {
      activeBackgroundColor: '#f7f7f7',
      activeTintColor: '#7b7b7b',
      inactiveTintColor : '#7b7b7b',
      labelStyle: {
          fontSize: 16,
          fontWeight: '500',
          fontFamily: 'AvenirNext-Regular'
      },
      style: {
          marginVertical: 0,
          borderBottomWidth: 2,
          borderBottomColor :'red'
      },
  },
  drawerPosition: 'left' ,
  drawerWidth: Dimensions.get('window').width - 69,
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
     <AppNavigator
       navigation={addNavigationHelpers({
         dispatch,
         state: nav,
         addListener,
       })}
     />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.navState,
});

export default connect(mapStateToProps)(AppWithNavigationState);
