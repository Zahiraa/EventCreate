import React,{Component} from 'react';
import HeaderTemplate from "../HeaderTemplate";
import HomeBanner from "../Events/HomeBanner";
import banner from '../../../../public/assets/img/banner/home-banner.jpg';
import team4 from '../../../../public/assets/images/img_3.jpg';
import {showUser,indexEvents} from "../../services";
import { Link } from 'react-router-dom';
import img from "../../../../public/assets/img/event1.jpg";




export default class ArtistBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: [],
            user: [],
            events: [],
            medias: [],
        }
    }
    getAge=(dateN)=>{
        if(dateN) {
            var tempDate = new Date()
            return tempDate.getFullYear() - dateN.substring(0,4);
        }
    }
    componentWillMount() {
        const url=process.env.MIX_REACT_APP_ROOT

        showUser(url+'/users/'+this.props.match.params.id,data=>{
            this.setState({
                artist:data,
            })

        })
        showUser(url+'/allUsers/'+this.props.match.params.id,data=>{
            this.setState({
                user:data,
            })

        })
        indexEvents(url+'/usersShowEvents/'+this.props.match.params.id,data=>{
            this.setState({
                events:data.events,
                medias:data.media.media,
            })

        })

    }
    render() {
        console.log('-----artists-----');
        console.log(this.state);
        let artists=this.state.artist
        let users=this.state.user
        let events=this.state.events
        let medias=this.state.medias
        let list=medias
        let artist=[]
        if(artists.length>0)
            {  artist=artists[0] }
        else{
            if(events.length>0){
                artist=users[0]
            }

        }
console.log('list')
console.log(list)
        return (
            <div>

                <HeaderTemplate/>
                <HomeBanner pic={banner} text={[<h2><strong>{artist.name} {artist.last_name}</strong></h2>,<br/>, <h3 className="text-uppercase">{artist.role ? artist.role.libelle :null}</h3>]}/>

                <main id="main">


                    <section id="about" className="about">
                        <div className="container" data-aos="fade-up" id="welcome_area">

                            <div className="section-title">
                                <h2 className="text-uppercase">{artist.name} {artist.last_name} </h2>

                            </div>

                            <div className="row">
                                <div className="col-lg-4">
                                    {/*<img src={artist.media.url} className="img-fluid" alt="" style={{height:350,width:350}}/>*/}
                                    {artist.media?

                                        <Link to={"/Artist/"+artist.id}><img  className="img-fluid eventImg" src={artist.media.url}/></Link>

                                        :  <Link to={"/Artist/"+artist.id}><img  className="img-fluid eventImg" src={img}/></Link>
                                    }
                                </div>
                                <div className="col-lg-8 pt-4 pt-lg-0 content">
                                    {artist.role ? <h3 className="text-uppercase">{artist.role.libelle}</h3> :null}
                                    <p className="font-italic">
                                        {artist.biography}
                                    </p>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul>
                                                <li><i className="fa fa-arrow-circle-right" aria-hidden="true"></i>

                                                    <strong>Birthday:</strong> {artist.date_naissance}
                                                </li>
                                                <li><i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                                    <strong>Facebook:</strong>  <a href={artist.facebook} target="_blank">{artist.facebook}</a>
                                                </li>

                                                <li><i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                                    <strong>Email:</strong> <a href={"mailto: "+ artist.email}>{artist.email}</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">

                                            <ul>
                                                <li><i className="fa fa-arrow-circle-right" aria-hidden="true"></i> <strong>Age:</strong>&nbsp;{this.getAge(artist.date_naissance)}
                                                </li>
                                                <li><i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                                    <strong>Instagram:</strong>  <a href={artist.instagram} target="_blank">{artist.instagram}</a>
                                                </li>
                                                <li><i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                                    <strong>City:</strong>  {artist.city}
                                                </li>

                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>

                    <section id="skills" className="skills">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>événements auquels {artist.name} a participé </h2>
                                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum
                                    quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui
                                    impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic
                                    quas.</p>
                            </div>

                            <div className="row skills-content">


                                    {events &&  events.length>0 ?events.map((event,i) => {
                                        return (
                                            <div className="col-lg-4">
                                            <div className="row">
                                            <div className="col-md-6 progress">

                                        <span className="skill text-center">{event.title}<br/>
                                        <i className="val text-center">{event.created_at.substring(0,10)}</i></span>
                                    </div><br/>
                                                <div className="col-md-12">
                                            { event.media && event.media.length>0?event.media.slice(0,1).map(med =>

                                                   med.title!=="assurance" && med.title!=="autorisation"?(
                                                 <Link to={"/EventDesc/"+event.id}><img src={med.url} className="img-fluid" alt="ddd" style={{height:150,width:150}}/></Link>
                                                    ):   null

                                                ):
                                                <Link to={"/EventDesc/"+event.id}><img src={img} className="img-fluid" alt="ddd" style={{height:150,width:150}}/></Link>

                                            }
                                        </div>
                                    </div>
                                            </div>

                                        )
                                    })
                                        :<p className="text-uppercase mt-5 offset-4 alert alert-success">{artist.name} n'a participé a aucun event</p>}






                            </div>

                        </div>
                        <div className=" offset-5 col-md-6 button-all">
                            <Link className="main_btn btn-artists" to="/MoreArtists">Back to Artists</Link>
                        </div>
                    </section>




                </main>



            </div>


        );
    }
}



