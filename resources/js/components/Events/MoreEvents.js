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
            archived_events: [],
        }
    }

    componentWillMount() {
        const url=process.env.MIX_REACT_APP_ROOT

        indexEvents(url+'/events/indexOfEventsThisMonth',data=>{
            this.setState({
                events:data.events,
            })

        })
        indexEvents(url+'/events/indexOfEventsNextMonth',data=>{
            this.setState({
                upcomming_events:data.events,
            })

        })

        indexEvents(url+'/events/indexArchivedEvents',data=>{
            this.setState({
                archived_events:data.events,
            })

        })
    }


    getPlacesDisp=( a, b) =>{
        return parseInt(a)-parseInt(b);
    }

    render() {
    let nextEvents=this.state.upcomming_events
    let archiveEvents=this.state.archived_events

        return (
<div>

    <HeaderTemplate/>
    {/*<HomeBanner pic={banner} text={[<h2><strong>EVENTS</strong></h2>]}/>*/}
    <div className="site-section bg-light">
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                    <Link to={"/"}><h5 className="text-muted">
                        Back to index </h5></Link>
                </div>
                <div className="offset-lg-1 col-md-12 col-lg-11 mb-5" data-aos="fade-up" data-aos-delay="100">
                   <h3 id="welcome_area">EVENTS</h3>
                </div>
            </div>
            <div className="row">

                {this.state.events.map((event,i) => {
                    return (
                <div className="col-md-6 col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                    {event.media && event.media.length>0?


                        <Link to={"/EventDesc/"+event.id}><img key={i} className="img-fluid eventImg" src={event.media[0].url} style={{width:340,height:300}}/></Link>


                    :  <Link to={"/EventDesc/"+event.id}><img  className="img-fluid eventImg" src={img} style={{width:340,height:300}}/></Link>
                    }

                    <div className="p-4 bg-white">
                        <h2 className="h5 text-black mb-3 text-center" style={{'color': '#517b14;'}} ><Link to={"/EventDesc/"+event.id} >{event.title}</Link></h2>
                        <span style={{"color": "#6c757d",'textTransform': 'uppercase','fontSize':15}} className="text-center d-block text-secondary small text-uppercase">{event.date.substring(0,10)}</span>
                       <hr/>
                        <p>
                            {event.description}
                        </p>
                        {event.critere?
                            <p className="text-muted text-center text-uppercase">
                                Places disponibles : {this.getPlacesDisp(event.critere.limite_places,event.critere.places_reserves)}

                            </p>
                            :null}
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
                    {event.media && event.media.length>0?
                        <Link to={"/EventDesc/"+event.id}><img key={i} className="img-fluid eventImg" src={event.media[0].url} style={{width:340,height:300}}/></Link>
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
                        <hr/>

                    </div>
                </div>
                        )}):<h4 className="alert alert-success commingsoon">Comming Soon ...</h4>}
            </div>


           <br/> <div className="row">
                <div className="col-md-12 col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                    <h3 style={{'textTransform':'uppercase'}} >Archived Events</h3>
                </div>
            </div>
            <div className="row">
                {archiveEvents.length>0? archiveEvents.map((event,i) => {
                    return (
                        <div className="col-md-6 col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                            {event.url?
                              <img key={i} className="img-fluid eventImg" src={event.url} style={{width:340,height:300}}/>
                               :
                               <img key={i} className="img-fluid eventImg" src={img} style={{width:340,height:300}}/>
                            }
                            <div className="p-4 bg-white">
                                <span style={{"color": "#6c757d",'textTransform': 'uppercase','fontSize':15}} className="d-block text-secondary small text-uppercase">{event.date}</span>
                                <h2 className="h5 text-black mb-3" style={{'color': '#517b14;'}} >
                                   {event.title}
                                </h2>
                                <p>
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    )}):<h4 className="alert alert-success commingsoon">No archived events  ...</h4>}
            </div>
        </div>
    </div>
</div>


        );
    }
}



