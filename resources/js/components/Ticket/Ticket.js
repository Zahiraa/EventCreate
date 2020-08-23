import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import {getResults} from "../../services";
import HeaderTemplate from "../HeaderTemplate";
import banner from "../../../../public/assets/img/banner/home-banner.jpg";
import HomeBanner from "../Events/HomeBanner";
import { Link,Redirect } from 'react-router-dom';



export default class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event:[],
            currentUser:[]

        }
    }
    componentDidMount() {

        const url=process.env.MIX_REACT_APP_ROOT
        if (localStorage.getItem('appState')!= null) {
            const userdata = {test: JSON.parse(localStorage["appState"])}
            const idUser = userdata.test.user.id;
            if (idUser) {
                getResults(url + '/user/' + 18 + '/show', data => {
                    console.log('data')
                    console.log(data)
                    this.setState({
                        currentUser: data,
                    })

                })
            }
        }


        let event=this.props.match.params.event
        getResults(url+'/events/'+event,data=>{
            this.setState({
                event:data.event,
            })

        })
    }


    render() {
        if (localStorage.getItem('appState')!= null) {
            const userdata = {test: JSON.parse(localStorage["appState"])}
            const idUser = userdata.test.user.id;
            console.log(this.state)
            console.log(".state")
            console.log(this.state.currentUser.length)
            if (!this.state.currentUser.id) {
                console.log(".staffffte")
                //  <Redirect to='/login' />
                return <Redirect to='/login'/>
            }

        }
        else{
            return <Redirect to='/login'/>
        }
    let tickets=this.state.event.tickets
        let event=this.props.match.params.event
        return (
            <div>
            <HeaderTemplate/>
                <HomeBanner pic={banner} text={[<h2><strong>{this.state.event.title} - Ticket Pricing</strong></h2>]}/>
            <section className="price_area p_120">
                <div className="container">
                    <div className="main_title">
                        <h2 id="welcome_area">Event {this.state.event.title} - Ticket Pricing</h2>
                        <p>If you are looking at blank cassettes on the web, you may be very confused at the difference in price.
                            You may see some for as low as $.17 each.</p>
                    </div>
                    <div className="price_inner row m0">
                        {tickets && tickets.length>0?tickets.map((ticket,i) => {
                            return (
                                <div className="col-lg-3 col-sm-6 p0">
                                    <div className="price_item">
                                        <div className="price_text">
                                            <h3>{ticket.name}</h3>
                                            <h2>£{ticket.price}<span></span></h2>
                                            <ul className="list">
                                                <li><a href="#">Lorem ipsum</a></li>
                                                <li><a href="#">dolor sit amet </a></li>
                                                <li><a href="#">consectetur adipiscing </a></li>
                                                <li><a href="#"> Maecenas vulputate </a></li>
                                                <li><a href="#">Lorem ipsum </a></li>
                                            </ul>
                                        </div>
                                        {this.state.event.critere && this.state.event.critere.places_reserves<this.state.event.critere.limite_places?
                                            <Link to={"/Tickets/"+event+"/"+ticket.name} className="price_btn" type="button" id="button-addon2">
                                                <strong>Get Started</strong>

                                            </Link>:
                                            <div className="text-uppercase price_btn">Toutes les places reservées</div>
                                        }

                                    </div>
                                </div>
                            )}):(
                            <div className="col-lg-12 text-center alert alert-success col-sm-6 p0">
                                <h4 className="text-uppercase alert alert-success">Comming soon ...</h4>
                            </div>)}
                    </div>
                </div>
            </section>
            </div>

        );
    }
}


