import React,{Component} from 'react';
import event05 from '../../../../public/assets/img/event-05.jpg';
import { Link } from 'react-router-dom';
import {getResults} from "../../services";
import ParticipationEvent from "./ParticipationEvent";
import axios from "axios";


export default class EventHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            message:''
        }

    }

    participer=(user,event)=>(e)=>{

        const url=process.env.MIX_REACT_APP_ROOT
            //
            //
            // axios.get(url+'/participerEvent/'+user+'/'+event,{
            //
            //
            //
            // })
            //     .then(Response =>{
            //         const message = Response.message;
            //
            //         if(message==="ok") {
            //
            //           //  window.location.href = "ParticipationEvent/" + user + '/' + event
            //             window.location.href="/ParticipationEvent/" + user + '/' + event;
            //         }
            //         //    return <ParticipationEvent message={this.state.message} event={event}/>
            //
            //
            //     }).catch(err => console.log(err));
            // console.log('error')



            e.preventDefault();
            console.log('rr')

            axios.post(url+'/participerEvent',{
                data:
                    {
                        user:user,
                        event:event
                    }


            }) .then(res => {
                const data = res.data.message;
                if(data==="ok"){
                    // window.location.href="/ParticipationEvent/" + user + '/' + event;
                    this.setState({
                        message: data,


                    })
                }
                else{
                   alert('rr')
                }
            })
                .catch(err => console.log(err));




    }

    render() {



        console.log('this.props')
        console.log(this.props.event)
        let img = event05
        if (this.props.event && this.props.event.media) {

            for (let i = 0; i < this.props.event.media.length; i++) {
                if (this.props.event.media[i].title !== "assurance" && this.props.event.media[i].title !== "autorisation") {

                    img = this.props.event.media[i].url
                    break
                }
            }

        }

        let event = this.props.event
        let participer = false
        let currentUser = this.props.currentUser
        if (currentUser){
            if (currentUser.role && currentUser.role.libelle != "admin" && currentUser.role.libelle != "user" && currentUser.role.libelle != "organisateur") {
                participer = true
            }
    }

        return (
            <div>

                <div className="site-wrap">

                    <div className="site-navbar mt-4">
                        <div className="container py-1">
                            <div className="row align-items-center">
                                <div className="col-8 col-md-8 col-lg-4">
                                    <h1 className="mb-0"><Link to={"/"} className="text-white h2 mb-0"><strong>EventCreate<span className="text-primary">.</span></strong></Link></h1>
                                </div>
                                <div className="col-4 col-md-4 col-lg-8">
                                    <nav className="site-navigation text-right text-md-right" role="navigation">

                                        <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3"><a href="#" className="site-menu-toggle js-menu-toggle text-white"><span className="icon-menu h3"></span></a></div>

                                        <ul className="site-menu js-clone-nav d-none d-lg-block">
                                            <li className="active">
                                                <Link to={"/"}>Home</Link>
                                            </li>
                                            <li><Link to="/MoreArtists">Artists</Link></li>
                                            <li><a href="about.html">About</a></li>
                                            {/*<li><a href="about.html">Music News</a></li>*/}
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </nav>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <div className="site-mobile-menu">
                    <div className="site-mobile-menu-header">
                        <div className="site-mobile-menu-close mt-3">
                            <span className="icon-close2 js-menu-toggle"></span>
                        </div>
                    </div>
                    <div className="site-mobile-menu-body"></div>
                </div>

                <div className="site-blocks-cover overlay"   style={{ backgroundImage: `url(${img})` }} data-aos="fade" data-stellar-background-ratio="0.5" data-aos="fade">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7 text-center" data-aos="fade-up" data-aos-delay="400">
                                <h1 className="event_desctitle">{event.title}</h1>
                                <p className="mb-4 event_desc"><span className="small">{event.description}</span></p>
                                {participer?<button className="btn btn-secondary p-3 text-uppercase" onClick={this.participer(currentUser.id,event.id)}>Participer a l'event</button>:""}
                                {this.state.message==="ok"?

                                            <div className="offset-1 mt-3 col-10 alert alert-success text-capitalize" style={{padding: 30}}>
                                                <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
                                                Nous vous remercions de votre demande de participation a l'event {this.props.event.title}.Une fois la demande  acceptée , vous serez notifier
                                            </div>

                                        :null}





                            </div>
                        </div>
                    </div>
                </div>




            </div>

        );
    }
}


