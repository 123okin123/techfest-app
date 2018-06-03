import React, {Component} from 'react'
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native'
import {colors, store, fonts} from '../helpers'
import {connect} from 'react-redux'
import {pageActions} from "../actions";

type Props = {
    notifications: Array<{
        title: string,
        message: string
    }>,
    fetchingState: {
        fetching?: boolean,
        success?: boolean,
        error?: boolean
    }
}

const testData = [{
   title: 'test title long long long ckfsnsksnckds',
   message: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
}];

class NotificationsList extends Component<Props> {
    static navigationOptions = {
        title: 'NOTIFICATIONS',
    };

    componentDidMount() {
        store.dispatch(pageActions.fetchPageIfNeeded('3981'))
    }

    render() { return (
        <View style={styles.container}>
            {(this.props.notifications.length === 0 && (!this.props.fetchingState.fetching)) &&
            <Text style={styles.emptyText}>No news yet...</Text>
            }
            <FlatList
              data={this.props.notifications}
              onRefresh={()=>store.dispatch(pageActions.fetchPage('3981'))}
              refreshing={this.props.fetchingState.fetching || false}
              renderItem={({item}) =>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('NotificationsDetail', {title: item.title, message: item.message})
                }} style={styles.item}>
                    <View  style={styles.innerItem}>
                        <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
                        <Text numberOfLines={2} style={styles.itemDescription}>{item.message}</Text>
                    </View>
                </TouchableOpacity>
              }
              keyExtractor={(item, index) => index.toString()}
            />

        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    item: {
        height: 100,
    },
    innerItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#212529'
    },
    itemTitle: {
        fontSize: 20,
        fontFamily: fonts.bold,
        //fontWeight: "bold",
    },
    itemDescription: {
        fontSize: 18,
        fontFamily: fonts.normal,
    },
    emptyText: {
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: fonts.bold,
        color: colors.primary
    }
});


const mapStateToProps = (state) => {
    const news = (((state.pages['3981'] || {}).response || {}).acf || {}).news || [];
    const notifications = Array.isArray(news) ? news : [];
    return {
        fetchingState: (state.pages['3981'] || {}).fetchingState || {},
        notifications
    }
};

export default connect(mapStateToProps)(NotificationsList)