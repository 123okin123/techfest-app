import React, {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import Login from './Login'
import Navigation from './Navigation'
import {colors, store} from '../helpers'
import {userConstants} from "../constants";
import {userActions} from "../actions";

type Props = {
    toke?: string,
    gettingFromDefaults?: string
}

class Start extends Component<Props> {

    componentWillMount() {
        store.dispatch(userActions.tokenAndRoleFromDefaults())
    }

    render() {
        console.disableYellowBox = true;
        return (
          <View style={{flex: 1}}>
              {this.props.gettingFromDefaults ?
                <View style={{backgroundColor: colors.background, flex: 1}}/> :
                this.props.token ? <Navigation/> : <Login/>
              }
          </View>
        )
    }
}
const mapStateToProps = (state) => {
 return {
     token: state.authentication.token,
     gettingFromDefaults: state.authentication.gettingFromDefaults
 }
};

export default connect(mapStateToProps)(Start)