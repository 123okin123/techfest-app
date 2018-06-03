import React, {Component} from 'react'
import {ScrollView, StyleSheet, Text, ActivityIndicator, View} from 'react-native'
import {connect} from 'react-redux'
import {colors, fonts} from "../helpers";
import {challengeActions, pageActions, userActions} from "../actions";
import type {Challenge, Team} from "../constants";
import MentorList from './MentorList'


type Props = {
    getChallenge: ()=>Promise<Challenge>,
    challenge: ?Challenge,

    team?: Team,

    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}},
    getUserInfo: ()=>Promise<void>,
}

type State = {
    ready?: boolean
}

class MyChallenge extends Component<Props, State> {
    static navigationOptions = {
        title: 'MY CHALLENGE',
    };
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        Promise.all([this.props.getUserInfo(), this.props.getChallenge(), this.props.fetchPageIfNeeded()])
          .then(()=>this.setState({ready: true}))
          .catch(err=>console.log(err));


    }

    render() {
        return (
          <View style={{flex: 1, backgroundColor: colors.background}}>
              {!this.state.ready ?
                <ActivityIndicator style={styles.indicator} animating={!this.state.ready} size="small" color={colors.primary}/> :
              <ScrollView style={styles.container}>
                  <Text style={styles.heading1}>{this.props.challenge.name}</Text>
                  <Text style={styles.challengeDescription}>{this.props.challenge.description}</Text>
                  <Text style={styles.heading1}>Challenge Mentors</Text>
                  <MentorList companyFilter={(this.props.challenge || {}).company}/>
              </ScrollView>
              }
          </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['3241'] || {response: {content: {rendered: ''}}, isFetching: true};
    const team = state.team.teams.find((team: Team)=> {
        return team.participantIds.includes((state.user.data || {})._id)
    });
    return {
        challenge: state.challenge.challenges.find(challenge=>challenge._id === ((state.user.data || {}).participantsFields || {}).challengeId) || {},
        isFetchingPage: isFetching,
        response,
        team
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfo: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        getChallenge: () => {
            return dispatch(challengeActions.getChallengesIfNeeded())
        },
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded("3241"))
        },
    }
};


const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        zIndex: 100,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    heading1: {
        fontFamily: fonts.bold,
        fontSize: 30
    },
    challengeDescription: {
        fontFamily: fonts.normal,
        fontSize: 18,
        marginBottom: 40,
        marginTop: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyChallenge)