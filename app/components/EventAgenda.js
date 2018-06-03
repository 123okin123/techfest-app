import React, {Component} from 'react'
import {  Text,View, StyleSheet} from 'react-native'
import { Agenda } from 'react-native-calendars';
import {colors, fonts, store} from '../helpers'
import {connect} from 'react-redux'
import {pageActions} from "../actions";

type Props = {
    eventAgenda: {
        [date: string]: Array<{
            time: string,
            length: number,
            title: string,
            description: string
        }>
    }
}

class EventAgenda extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    componentDidMount() {
        store.dispatch(pageActions.fetchPageIfNeeded('4241'))
    }

    renderItem(item) {
        return (
          <View style={[styles.item, {height: parseInt(item.duration * 2)}]}>
              <Text>{item.time}</Text>
              <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
              <Text numberOfLines={2}>{item.description}</Text>
          </View>
        );
    }

    render() {
        return (
          <View style={styles.container}>
          <Agenda
            items={this.props.eventAgenda}
            pastScrollRange={0}
            futureScrollRange={0}
            selected={'2018-06-15'}
            minDate={'2018-06-14'}
            maxDate={'2018-06-18'}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={()=><View style={styles.emptyDate}><Text>This is empty date!</Text></View>}
            rowHasChanged={(r1, r2)=>r1.title !== r2.title}
            theme={calendarTheme}
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
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    itemTitle: {
        fontFamily: fonts.bold
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});


const calendarTheme = {
    backgroundColor: colors.background,
    calendarBackground: colors.background,
    textSectionTitleColor: colors.inactive,
    selectedDayBackgroundColor: colors.primary,
    selectedDayTextColor: colors.secondary,
    todayTextColor: colors.secondary,
    dayTextColor: colors.primary,
    textDisabledColor: colors.inactive,
    dotColor: colors.primary,
    selectedDotColor: colors.secondary,
    textDayFontFamily: fonts.normal,
    textMonthFontFamily: fonts.normal,
    textDayHeaderFontFamily: fonts.normal,
};

const mapStateToProps = (state) => {
    const agendaArray: Array<{date: string, items: Array<{title: string, description: string, time: string, duration: number}>}> = (((state.pages['4241'] || {}).response || {}).acf || {}).event_agenda || [];
    const eventAgenda = agendaArray.reduce(function(map, obj) {
        map[obj.date] = obj.items;
        return map;
    }, {});
    return {
        eventAgenda
  }
};


export default connect(mapStateToProps)(EventAgenda)