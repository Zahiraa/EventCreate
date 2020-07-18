import React,{Component} from 'react';
import HeaderTemplate from "../HeaderTemplate";
import HomeBanner from "./HomeBanner";
import banner from '../../../../public/assets/img/banner/home-banner.jpg';
import team4 from '../../../../public/assets/images/img_3.jpg';
import {indexEvents} from "../../services";
import { Link } from 'react-router-dom';
import img from "../../../../public/assets/img/event1.jpg";



export default class MoreEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            upcomming_events: [],
        }
    }

    componentWillMount() {
        const url=process.env.MIX_REACT_APP_ROOT

        indexEvents(url+'/events',data=>{
            this.setState({
                events:data,
            })

        })
        indexEvents(url+'/events/indexOfEventsNextMonth',data=>{
            this.setState({
                upcomming_events:data.events,
            })

        })
    }
    render() {
    let nextEvents=this.state.upcomming_events

        return (
<div>

    <HeaderTemplate/>
    <HomeBanner pic={banner} text={[<h2><strong>EVENTS</strong></h2>]}/>
    <div className="site-section bg-light">
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                   <h3 id="welcome_area">EVENTS</h3>
                </div>
            </div>
            <div className="row">

                {this.state.events.map((event,i) => {
                    return (
                <div className="col-md-6 col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                    {event.media.length>0?(event.media.slice(0, 1).map((media,i) => {
                        return (

                            <Link to={"/EventDesc/"+event.id}><img key={i} className="img-fluid eventImg" src={media.url} style={{width:340,height:300}}/></Link>
                        )
                    })):  <Link to={"/EventDesc/"+event.id}><img  className="img-fluid eventImg" src={img} style={{width:340,height:300}}/></Link>
                    }

                    <div className="p-4 bg-white">
                        <h2 className="h5 text-black mb-3 text-center" style={{'color': '#517b14;'}} ><Link to={"/EventDesc/"+event.id} >{event.title}</Link></h2>
                        <span style={{"color": "#6c757d",'textTransform': 'uppercase','fontSize':15}} className="text-center d-block text-secondary small text-uppercase">{event.date.substring(0,10)}</span>
                       <hr/>
                        <p>
                            {event.description}
                        </p>
                    </div>
                </div>
                )
                })
                }


                </div>
            <div className="row">
                <div className="col-md-12 col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                    <h3 style={{'textTransform':'uppercase'}} >Upcoming Events</h3>
                </div>
            </div>
            <div className="row">
                {nextEvents.length>0? nextEvents.map((event,i) => {
                    return (
                <div className="col-md-6 col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                    {event.url?
                        <Link to={"/EventDesc/"+event.id}><img key={i} className="img-fluid eventImg" src={event.url} style={{width:340,height:300}}/></Link>
                        :
                        <Link to={"/EventDesc/"+event.id}><img key={i} className="img-fluid eventImg" src={img} style={{width:340,height:300}}/></Link>
                    }
                    <div className="p-4 bg-white">
                        <span style={{"color": "#6c757d",'textTransform': 'uppercase','fontSize':15}} className="d-block text-secondary small text-uppercase">{event.date}</span>
                        <h2 className="h5 text-black mb-3" style={{'color': '#517b14;'}} >
                            <Link to={"/EventDesc/"+event.id}>{event.title}</Link>
                        </h2>
                        <p>
                            {event.description}
                        </p>
                    </div>
                </div>
                        )}):<h4 className="alert alert-success commingsoon">Comming Soon ...</h4>}
            </div>
        </div>
    </div>
</div>


        );
    }
}



