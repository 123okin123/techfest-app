import React, {Component} from 'react'
import {View,TouchableWithoutFeedback,TextInput,Button, StyleSheet, Image, Keyboard, Animated, Dimensions} from 'react-native'
import {colors} from '../helpers'
import {userActions} from "../actions";
import { connect } from 'react-redux';



type Props = {
    loggingIn: boolean,
    loginFailure: boolean
}
type State = {
    email: string,
    password: string
}

const window = Dimensions.get('window');
 const PADDING_TOP = window.height /5;
 const PADDING_TOP_SMALL = window.height /7;

class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onLoginPressed = this.onLoginPressed.bind(this);
        this.paddingTop = new Animated.Value(PADDING_TOP);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }


    keyboardWillShow = (event) => {
        console.log(event);
        Animated.timing(this.paddingTop, {
            duration: event.duration,
            toValue: PADDING_TOP_SMALL,
        }).start();
    };

    keyboardWillHide = (event) => {
        Animated.timing(this.paddingTop, {
            duration: event.duration,
            toValue: PADDING_TOP,
        }).start();
    };

    onLoginPressed() {
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
              <View style={styles.background}>
              <Animated.Image style={[styles.logo, { height: this.paddingTop }]} source={require('../assets/TechFest-Logo_schwarz.png')} />
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
     //   height: IMAGE_HEIGHT,
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
        paddingTop: PADDING_TOP
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