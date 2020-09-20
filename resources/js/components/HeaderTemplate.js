import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Switch,NavLink,Route,Link} from 'react-router-dom';
import Index from "./Index";
import MoreEvents from "./Events/MoreEvents";
// import Routes from '../Routes'

export default class HeaderTemplate extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isLoggedIn: false,
            user: []
        }
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
          let AppState = JSON.parse(state);
          this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
        }
      }

    componentDidMount(){
        let state=localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn:AppState.isLoggedIn, user: AppState.user});
        }
    }
    redirect=(myurl)=>{

        // return  <Redirect to="/dashboard#/events/add" />;
        window.location.href=myurl

    }
    render() {
        const myurl=`/dashboard#/user/${this.state.user.id}`;
        return (

            <div>

                <header className="header_area">
                    <div className="main_menu">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container box_1620">
                                <Link className="navbar-brand logo_h logoHeader" to="/" style={{textTransform:"uppercase",color:"white"}} > eventcreate</Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>

                                <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav menu_nav ml-auto">
                                        {/*<li className="nav-item active"><Link  to={"/"}>Home</Link></li>*/}
                                        {/*<li className="nav-item active"><Link to={"/MoreEvents"}>Events</Link></li> */}
                                        <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
                                        <li className="nav-item active"><Link className="nav-link" to="/MoreEvents">Events</Link></li>
                                        <li className="nav-item"><Link to="/MoreArtists" className="nav-link" href="speakers.html">Artists</Link></li>
                                        <li className="nav-item active"><Link className="nav-link" to="/MoreMedias">Gallery</Link></li>
                                        {/*<li className="nav-item"><a className="nav-link" href="speakers.html">Music News</a></li>*/}
                                        {/*<li className="nav-item submenu dropdown"><a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>*/}
                                        {/*        <ul className="dropdown-menu">*/}
                                        {/*            <li className="nav-item"><a className="nav-link" href="schedule.html">Schedule</a></li>*/}
                                        {/*            <li className="nav-item"><a className="nav-link" href="venue.html">Venue</a></li>*/}
                                        {/*                    <li className="nav-item"><a className="nav-link" href="price.html">Pricing</a></li>*/}
                                        {/*                        <li className="nav-item"><a className="nav-link" href="elements.html">Elements</a></li>*/}
                                        {/*        </ul>*/}
                                        {/*    </li>*/}
                                        {/*    <li className="nav-item submenu dropdown">*/}
                                        {/*        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"*/}
                                        {/*           role="button" aria-haspopup="true" aria-expanded="false">Blog</a>*/}
                                        {/*        <ul className="dropdown-menu">*/}
                                        {/*            <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li>*/}
                                        {/*            <li className="nav-item"><a className="nav-link" href="single-blog.html">Blog Details</a></li>*/}
                                        {/*        </ul>*/}
                                        {/*    </li>*/}
                                            <li className="nav-item"><a className="nav-link" href="#mapBox2">Contact</a></li>

                                    </ul>

                                    <ul className="nav navbar-nav navbar-right">

                                        {this.state.isLoggedIn ?
                                        <>

                                        {console.log(this.state.isLoggedIn)}
                                        <li className="nav-item"><Link to={myurl} className="tickets_btn" onClick={() => this.redirect(myurl)}>{this.state.user.name}</Link></li>
                                        </>
                                        :
                                        <>
                                        {console.log(this.state.isLoggedIn)}
                                        <li className="nav-item"><span className="tickets_btn"><Link to="/login" className="mr-3">LOGIN</Link>&nbsp;/&nbsp;<Link className="ml-3" to="/register">REGISTER</Link></span></li>
                                        <li className="nav-item"><a href="#" className="search"><i className="lnr lnr-magnifier"/></a></li>
                                        </>
                                        }

                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div>

                        </div>
                    </div>
                </header>

            </div>



                            );
                            }
                            }
