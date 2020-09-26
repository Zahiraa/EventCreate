import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import {indexEvents,getResults} from "../../services";
import img from "../../../../public/assets/img/event1.jpg";
import team1 from '../../../../public/assets/img/team/team-1.jpg';
import team2 from '../../../../public/assets/img/team/team-2.jpg';
import team3 from '../../../../public/assets/img/team/team-3.jpg';
import guitarist from '../../../../public/assets/img/guitar.jpg';
import event01 from '../../../../public/assets/img/event-01.jpg';
import event02 from '../../../../public/assets/img/event-02.jpg';
import event03 from '../../../../public/assets/img/event-03.jpg';
import event04 from '../../../../public/assets/img/event-04.jpg';
import event05 from '../../../../public/assets/img/event-05.jpg';
import { Link } from 'react-router-dom';
import Program from "./Program";
import CommentForm from "./CommentForm";
import Axios from "axios";
import EventHeader from "./EventHeader";



export default class ParticipationEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.match.params.id,
            event: [],
            recommended_events: [],
            payments: [],
            user: [],

        }
    }

    render() {

        return (
            <div className="container" style={{marginTop: 300}}>
                <div className="row">
                    <div className="offset-1 col-10 alert alert-success text-capitalize" style={{padding: 30}}>
                       Nous vous remercions de votre demande de participation a l'event {this.props.event.title}.Une fois la demande  acceptée , vous serez notifier
                        <br/> <br/>  <Link to={"/"} ><p className="text-uppercase">Retour au site</p></Link>
                    </div>
                </div>
            </div>

        );
    }
}


