//@flow
import {  Text,View, Dimensions, StyleSheet, SectionList, ActivityIndicator, Platform} from 'react-native'
import {colors, fonts, store} from '../helpers'
import {connect} from 'react-redux'
import {pageActions} from "../actions";
import * as React from 'react';
import {Component} from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


type Props = {
    fetchingState: {
        fetching?: boolean,
        success?: boolean,
        error?: boolean
    },
    day1: Day,
    day2: Day,
    day3: Day
}


type Day = Array<{
    sectionheader?: string,
    data?: Array<{
        title: string,
        description: string,
        time: string,
        duration: number
    }>
}>


class EventAgenda extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'DAY 1' },
                { key: 'second', title: 'DAY 2' },
                { key: 'third', title: 'DAY 3' },
            ],
        };
    }

    componentDidMount() {
        store.dispatch(pageActions.fetchPageIfNeeded('4241'))
    }


    renderDay(day: Day) {
        if (this.props.fetchingState.fetching) {
            return (
              <ActivityIndicator style={{marginTop: 50}} animating size="small" color={colors.primary}/>
            )
        } else if (this.props.fetchingState.success && day.length > 0 && day[0].data) {
            return (
              <SectionList
                onRefresh={()=>store.dispatch(pageActions.fetchPage('4241'))}
                refreshing={this.props.fetchingState.fetching || false}
                renderItem={({item, index, section}) =>
                  <View key={index} style={[styles.item, {height: parseInt(item.duration * 3)}]}>
                      <Text style={styles.itemTime}>{item.time}</Text>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                }
                renderSectionHeader={({section: {sectionheader}}) => (
                  <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>{sectionheader}</Text>
                  </View>
                )}
                sections={day}
                keyExtractor={(item, index) => item + index}
              />
            )
        } else {
            return <View/>
        }
    }



    render() {
        console.log(this.props);
        return (
          <View style={styles.container}>
              <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: ()=> this.renderDay(this.props.day1),
                    second: ()=> this.renderDay(this.props.day2),
                    third: ()=> this.renderDay(this.props.day3),
                })}
                renderTabBar={props =>
                  <TabBar
                    {...props}
                    indicatorStyle={{backgroundColor: colors.primary, height: 8}}
                    style={{
                        backgroundColor: colors.background,
                        shadowOffset:{  width: 0,  height: 7 },
                        shadowColor: '#000',
                        shadowOpacity: 0.14,
                    }}
                    labelStyle={{color: colors.primary, fontFamily: fonts.bold}}
                  />
                }
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: Dimensions.get('window').width}}
              />

          </View>
        )
    }




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 20
    },
    sectionHeader: {
        backgroundColor: colors.hightlight,
        height: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
        shadowOffset:{  width: 0,  height: 7 },
        shadowColor: '#000',
        shadowOpacity: 0.14
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: fonts.bold,
        color: colors.background
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 20,
        marginVertical: 10,
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.14
    },
    itemTitle: {
        fontFamily: fonts.bold,
        color: colors.primary,
        marginBottom: -5,
    },
    itemTime: {
        fontFamily: fonts.normal,
        color: colors.primary,
        marginBottom: -5,
    },
    itemDescription: {
        fontFamily: fonts.normal,
        color: colors.primary
    }
});



const mapStateToProps = (state) => {
    return {
        day1:  (((state.pages['4241'] || {}).response || {}).acf || {}).day1 || [],
        day2:  (((state.pages['4241'] || {}).response || {}).acf || {}).day2 || [],
        day3:  (((state.pages['4241'] || {}).response || {}).acf || {}).day3 || [],
        fetchingState: (state.pages['4241'] || {}).fetchingState || {}
    }
};


export default connect(mapStateToProps)(EventAgenda)