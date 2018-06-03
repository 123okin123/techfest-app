import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import {colors, store} from '../helpers'
import {Button} from 'react-native'
import {userActions} from "../actions";

import NotificationsList from './NotifcationsList'
import NotificationsDetail from './NotificationsDetail'
import EventMap from './EventMap'
import Agenda from './EventAgenda'
import MyChallenge from './MyChallenge'



const navStyle = {
    backgroundColor: colors.background,
    shadowOffset:{  width: 0,  height: 7 },
    shadowColor: '#000',
    shadowOpacity: 0.14,
    borderBottomColor: colors.background
};

const navOptions = {
    headerTintColor : colors.primary,
    headerStyle: navStyle,
    headerRight: (
      <Button
        onPress={() => store.dispatch(userActions.logout())}
        title="Logout"
        color={colors.primary}
      />
    ),
};

const NotificationStack =  createStackNavigator({
    NotificationsList: {screen: NotificationsList},
    NotificationsDetail: {screen: NotificationsDetail},
}, {
    navigationOptions: navOptions
});

const MapStack =  createStackNavigator({
    EventMap: {screen: EventMap}
}, {
    navigationOptions: navOptions
});

const ChallengeStack =  createStackNavigator({
    MyChallenge: {screen: MyChallenge}
}, {
    navigationOptions: navOptions
});







export default createBottomTabNavigator(
  {
      'NOTIFICATIONS': NotificationStack,
      'EVENT MAP': MapStack,
      'AGENDA': Agenda,
      'MY CHALLENGE': ChallengeStack
  },
  {
      navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              if (routeName === 'NOTIFICATIONS') {
                  iconName = `ios-notifications${focused ? '' : '-outline'}`;
              } else if (routeName === 'EVENT MAP') {
                  iconName = `ios-navigate${focused ? '' : '-outline'}`;
              } else if (routeName === 'AGENDA') {
                  iconName = `ios-calendar${focused ? '' : '-outline'}`;
              } else if (routeName === 'MY CHALLENGE') {
                  iconName = `ios-contact${focused ? '' : '-outline'}`;
              }




              return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
      }),
      tabBarOptions: {
          activeTintColor: colors.primary,
          inactiveTintColor: colors.inactive,
          style: {
              backgroundColor: colors.background,
              shadowOffset:{  width: 0,  height: -7 },
              shadowColor: '#000',
              shadowOpacity: 0.14,
              borderTopColor: colors.background,
          }
      },

  }
)





