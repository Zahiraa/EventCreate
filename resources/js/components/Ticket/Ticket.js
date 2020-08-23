import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import {getResults} from "../../services";
import HeaderTemplate from "../HeaderTemplate";
import banner from "../../../../public/assets/img/banner/home-banner.jpg";
import HomeBanner from "../Events/HomeBanner";
import { Link } from 'react-router-dom';



export default class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event:[]

        }
    }
    componentDidMount() {


    const url=process.env.MIX_REACT_APP_ROOT
        let event=this.props.match.params.event
        getResults(url+'/events/'+event,data=>{
            this.setState({
                event:data.event,
            })

        })
    }


    render() {
        console.log(this.state)
        console.log(".state")
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
                                            <h5>Individuals/Freelancers</h5>
                                            <h2>£{ticket.price}<span>/mo</span></h2>
                                            <ul className="list">
                                                <li><a href="#">RAM 1 GB</a></li>
                                                <li><a href="#">Core CPU 1</a></li>
                                                <li><a href="#">SSD Storage 20 GB</a></li>
                                                <li><a href="#">Transfer 1 TB</a></li>
                                                <li><a href="#">Network In 40 Gb</a></li>
                                            </ul>
                                        </div>
                                        <Link to={"/Tickets/"+event+"/"+ticket.name} className="price_btn" type="button" id="button-addon2">
                                            <strong>Get Started</strong>
                                        </Link>
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


