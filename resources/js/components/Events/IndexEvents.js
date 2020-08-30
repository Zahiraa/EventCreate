import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {indexEvents,indexMedia} from "../../services";

import img from '../../../../public/assets/img/event1.jpg';
import { Link } from 'react-router-dom';




export default class IndexEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }

    componentWillMount() {
        const url=process.env.MIX_REACT_APP_ROOT

        indexEvents(url+'/events/indexOfEventsThisMonth',data=>{
            console.log('oicii')
            console.log(data)
            this.setState({
                events:data.events,
            })

        })
    }
    render() {
        return (

    <section className="team_area p_120">

        <div className="main_title">
            <h2>Events of the month</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, ante quis blandit malesuada, quam nulla viverra erat</p>
        </div>
        <div className="row team_inner">
            {this.state.events.slice(0, 4).map((event,i) => {
                return (
            <div key={i} className="col-lg-3 col-sm-6">
                <div className="team_item">
                    <div className="team_img">
                        {event.media && event.media.length>0?


                                <Link to={"/EventDesc/"+event.id}><img key={i} className="img-fluid eventImg" src={event.media[0].url}/></Link>

                      :  <Link to={"/EventDesc/"+event.id}><img  className="img-fluid eventImg" src={img}/></Link>
                        }

                    </div>
                    <div className="team_name">
                        <h4><Link to={"/EventDesc/"+event.id}>{event.title}</Link></h4>
                        <p>{event.description.substring(0,60)}</p>
                    </div>
                </div>

            </div>
                )
            })
            }

        </div>
    {/*<div className=" offset-5 col-md-6 button-all">*/}


        <div className=" offset-5 col-md-6 button-all">  <Link className="main_btn" to="/MoreEvents">See all Events</Link></div>

    {/*</div>*/}
 </section>

    );
    }
    }


