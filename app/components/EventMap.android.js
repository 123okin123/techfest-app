import React, {Component} from 'react'
import {Image, ScrollView, Text, StyleSheet, Dimensions, View} from 'react-native'
import {connect} from 'react-redux'
import {pageActions} from "../actions";
import {store, colors} from '../helpers'
import PinchZoomView from 'react-native-pinch-zoom-view';


type Props = {
    eventMap: string
}
const win = Dimensions.get('window');

class EventMap extends Component<Props> {
    static navigationOptions = {
        title: 'EVENT MAP',
    };

    componentDidMount() {
        store.dispatch(pageActions.fetchPageIfNeeded('4241'))
    }

    render() {
        return (
          <View style={styles.container}>

                  {this.props.eventMap ?
                    <PinchZoomView>
                        <Image source={{uri: this.props.eventMap}}
                           style={styles.map} resizeMode={'contain'}/>
                    </PinchZoomView>
                    : <View style={styles.loadingTextContainer}><Text style={styles.loadingText}>Loading...</Text></View>}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1"
    },
    scroll: {
        width: win.width,
        height: win.height,
    },
    map: {
        width: win.width,
        height: win.height,
        backgroundColor: '#fff'
    },
    loadingTextContainer: {
        flex: 1,
        width: win.width,
        height: win.height,
        alignItems:'center',
        justifyContent:'center',
    },
    loadingText: {
        fontSize: 20,
        color: colors.inactive
    }
});

const mapStateToProps = (state) => {
    const eventMap = (((state.pages['4241'] || {}).response || {}).acf || {}).event_map || '';
    return {
        eventMap
    }
};

export default connect(mapStateToProps)(EventMap);