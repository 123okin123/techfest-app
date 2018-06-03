/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import type { Notification } from 'react-native-firebase';


import firebase from 'react-native-firebase'
import Start from './app/components/Start'
import { Provider } from 'react-redux';
import {store} from './app/helpers/store'

type Props = {};

type State = {

};
export default class App extends Component<Props, State> {



  componentDidMount() {
      firebase.notifications().setBadge(0);
      firebase.messaging().hasPermission()
        .then(enabled => {
            if (enabled) {
                // user has permissions
            } else {
                // user doesn't have permission
                firebase.messaging().requestPermission()
                  .then(() => {
                      // User has authorised
                      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
                          // Process your notification as required
                          // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
                      });
                      this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
                          // Process your notification as required
                      });
                  })
                  .catch(error => {
                      // User has rejected permissions
                  });
            }
        });
  }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
    }

    render() {
        return (
          <Provider store={store}>
              <Start/>
          </Provider>
        )
    }
}
