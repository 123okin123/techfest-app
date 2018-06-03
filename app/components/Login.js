import React, {Component} from 'react'
import {View,TouchableWithoutFeedback,TextInput,Button, StyleSheet, Keyboard, Image, AsyncStorage} from 'react-native'
import {colors} from '../helpers'
import {userActions} from "../actions";
import { connect } from 'react-redux';
import {API_URL} from "../constants";



type Props = {
    loggingIn: boolean,
    loginFailure: boolean
}
type State = {
    email: string,
    password: string
}

class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onLoginPressed = this.onLoginPressed.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {

    }


    onLoginPressed() {

        this.props.login(this.state.email, this.state.password);
    }

    render() {
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
              <View style={styles.background}>
              <Image style={styles.logo} source={require('../assets/TechFest-Logo_schwarz.png')} />
              <TextInput
                style={this.props.loginFailure ? [styles.invalidTextInput, styles.textInput] :styles.textInput}
                placeholder="E-Mail"
                onChangeText={(email) => this.setState({email})}
                onSubmitEditing={Keyboard.dismiss}
              />
              <TextInput
                style={this.props.loginFailure ? [styles.invalidTextInput, styles.textInput] :styles.textInput}
                placeholder="Password"
                onChangeText={(password) => this.setState({password})}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry
              />
              <Button
                onPress={this.onLoginPressed}
                title="Login"
                color={colors.primary}
              />
              </View>
          </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    logo: {
        width: 250,
        resizeMode: Image.resizeMode.contain,
        alignSelf: 'center'
    },
    background: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 100
    },
    textInput: {
        height: 40,
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 8,
        fontSize: 16,
        marginBottom: 20
    },
    invalidTextInput: {
        borderColor: colors.danger,
        borderWidth: 1
    }
});



const mapStateToProps = (state) => {
    const { loggingIn, loginFailure } = state.authentication;
    return {
        loggingIn,
        loginFailure
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (email, password)=> {
            return dispatch(userActions.login(email, password));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);