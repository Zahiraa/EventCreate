import React,{Component} from 'react';
import event05 from '../../../../public/assets/img/event-05.jpg';
import { Link } from 'react-router-dom';

export default class EventHeader extends React.Component {

    render() {
       console.log('this.props')
       console.log(this.props.event ,this.props.event.media)
        let img=event05
        if(this.props.event && this.props.event.media) {

            for(let i=0;i<this.props.event.media.length;i++){
                if(this.props.event.media[i].title!=="assurance" && this.props.event.media[i].title!=="autorisation"){

                     img=this.props.event.media[i].url
                    break
                }
            }

        }

let event=this.props.event
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

                                <div id="playerContainer"></div>

                            </div>
                        </div>
                    </div>
                </div>




            </div>

        );
    }
}


