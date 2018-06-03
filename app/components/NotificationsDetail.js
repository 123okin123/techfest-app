import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {colors} from "../helpers";

type Props = {
    navigation: {
        getParam: (string, string)=>?string
    }
}

export default class NotificationsDetail extends Component<Props> {
    static navigationOptions = {
        title: 'MESSAGE',
    };
    render() {
        return (
        <ScrollView style={styles.container}>
            <Text style={styles.itemTitle}>{this.props.navigation.getParam('title', 'title')}</Text>
            <Text style={styles.itemDescription}>{this.props.navigation.getParam('message', 'message')}</Text>
        </ScrollView>
    )}
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20
    },
    itemTitle: {
        fontSize: 25,
        fontFamily: 'AvenirNext-Bold',
        fontWeight: "bold",
        marginBottom: 25
    },
    itemDescription: {
        fontSize: 18,
        fontFamily: 'AvenirNext-Regular',
    }
});