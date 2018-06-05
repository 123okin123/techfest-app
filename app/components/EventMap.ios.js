import React, {Component} from 'react'
import {Image, ScrollView, Text, StyleSheet, Dimensions, View} from 'react-native'
import {connect} from 'react-redux'
import {pageActions} from "../actions";
import {store, colors} from '../helpers'

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
          <ScrollView maximumZoomScale={3} minimumZoomScale={1} alwaysBounceHorizontal alwaysBounceVertical>
              {this.props.eventMap ?
                <Image source={{uri: this.props.eventMap}}
                       style={styles.map} resizeMode={'contain'}/>
                : <View style={styles.loadingTextContainer}><Text style={styles.loadingText}>Loading...</Text></View>}
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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