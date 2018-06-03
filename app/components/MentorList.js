//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {type Mentor, type User, roles} from '../constants/'
import {mentorActions} from "../actions/index";
import {Dimensions, View, Text, Image, StyleSheet} from "react-native";
import {fonts, store} from '../helpers'

const win = Dimensions.get('window');


type Props = {
    className: string,
    companyFilter?: string,
    noChallengeMentors?: boolean,

    mentors: Array<Mentor>,
    fetchMentorsIfNeeded: ()=>Promise<void>,
    deleteMentor: (string)=>Promise<void>
}

class MentorList extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).deleteMentor = this.deleteMentor.bind(this);
    }

    componentDidMount() {
        this.props.fetchMentorsIfNeeded()
    }

    deleteMentor(mentor: Mentor) {
        this.props.deleteMentor(mentor._id);
    }

    render() {
        const token = store.getState().authentication.token;
        let filteredMentors = this.props.companyFilter ?
          this.props.mentors.filter((e)=>e.company === this.props.companyFilter)
          : this.props.mentors;
        filteredMentors = this.props.noChallengeMentors ?
          filteredMentors.filter((e)=> (e.partnerRole !== roles.TRACK_PARTNER_ROLE && e.partnerRole !== roles.CHALLENGE_PARTNER_ROLE))
            : filteredMentors;
        return (
          <View style={styles.mentorCollection}>
              {filteredMentors.length === 0 &&
              <Text>No mentors yet.</Text>
              }
              {filteredMentors.map((mentor: Mentor, index: number)=>
                <View style={styles.mentorContainer} key={index.toString()}>
                    {console.log(mentor.imageURL)}
                    <Image style={styles.imageContainer} source={{uri: `https://www.techfestmunich.com${mentor.imageURL}?token=${token}`}} resizeMode={'cover'}/>
                    <Text style={styles.name}>{mentor.firstName} {mentor.lastName}</Text>
                    <Text style={{textAlign: 'center'}}>{mentor.company}</Text>
                    <View style={styles.skillContainer}>
                        {mentor.skills.map((skill, index)=>
                          <View style={styles.skill} key={index.toString()}><Text style={styles.skillText}>#{skill}</Text></View>
                        )}
                    </View>
                </View>
              )}

          </View>
        )
    }
}

const styles = StyleSheet.create({
    mentorCollection: {
        flex: 1,
        paddingBottom: 20
    },
    mentorContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        shadowOffset:{  width: 0,  height: 0 },
        shadowColor: '#000',
        shadowOpacity: 0.14,
        marginVertical: 20,
        width: (win.width - 40),
        alignItems: 'center'
    },
    name: {
        fontFamily: fonts.bold,
        fontSize: 20,
        textAlign: 'center'
    },
    imageContainer: {
        height: 180,
        width: 180,
        marginVertical: 20,
        borderRadius: 90,
        backgroundColor: '#e9ecef',
    },
    skill: {
        backgroundColor: '#e9ecef',
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 3,
        margin: 5
    },
    skillText: {
        fontSize: 18,
        color: '#6c757d',
        fontFamily: fonts.normal,
    },
    skillContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    }


});


const mapStateToProps = (state, ownProps) => {
    const {items} = state.mentors;
    return {
        mentors: items || []
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchMentorsIfNeeded: () => {
            return dispatch(mentorActions.fetchMentorsIfNeeded())
        },
        deleteMentor: (index: string) => {
            return dispatch(mentorActions.deleteMentor(index))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MentorList);