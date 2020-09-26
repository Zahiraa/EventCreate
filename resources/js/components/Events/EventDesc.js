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



export default class EventDesc extends React.Component {
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
  getEventInfos(id){
      const url=process.env.MIX_REACT_APP_ROOT
      this.setState({
          id:id
      })

      indexEvents(url+'/events/'+id,data=>{
          this.setState({
              event:data.event,
          })

      })
      getResults(url+'/events/getRecommendedEvents/'+id,data=>{
          this.setState({
              recommended_events:data.events,
          })

      })
  }

        changeEvent=(id)=>{
         this.getEventInfos(id)
    }

    componentDidMount() {

        this.getEventInfos(this.state.id)
        if (localStorage.getItem('appState')!= null){
        const userdata={test: JSON.parse(localStorage["appState"])}
            const idUser = userdata.test.user.id;
            const url=process.env.MIX_REACT_APP_ROOT
            getResults(url+'/paymentsByUserAndEvent/'+idUser+"/"+this.state.id,data=>{
                this.setState({
                    payments:data.payments,
                })

            })
            getResults(url+'/users/'+idUser,data=>{
                this.setState({
                    user:data,
                })

            })
        }



    }
    render() {
        console.log("teeeehis.state")
        console.log(this.state)
        let currentUser=[]
        if(this.state.user && this.state.user.length>0 ) {
           currentUser=this.state.user[0]
        }

        let recommended=this.state.recommended_events
        console.log( 'recommended')
        console.log( recommended)
        let pics=[event01,event02,event03,event04]
        let medias=[];

        let event=this.state.event
        let img=guitarist
        if(event.media ) {
            img = event.media[0].url
        }
        console.log("this.srrtate")
        console.log(this.state)
        let users=[]
        if(this.state.event.user){
             users=this.state.event.user
        }
        console.log('users')
        console.log(users)
let id=this.props.match.params.id
        return (
     <div>

         <EventHeader event={this.state.event?this.state.event:[]} currentUser={currentUser}/>
    <div className="pb-5" style={{marginTop: -100}}>
        <div className="container-fluid">

                    <div className="row no-gutters">
                        {this.state.event && this.state.event.media ?

                            (
                                this.state.event.media.map((media,i) => {
                            return media.title!=="assurance" && media.title!=="autorisation"?(

                                <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
                                    <a href="#" className="unit-9">

                                        <div className="image"   style={{ backgroundImage: `url(${media.url})` }}></div>

                                        <div className="unit-9-content">
                                            {this.state.event.categories && this.state.event.categories.length>0?
                                                this.state.event.categories.slice(0, 1).map((category,i) => {
                                                    return (<h2>{category.libelle}</h2>)}):
                                                (<h2>Art Gossip</h2>)}
                                            <span>Friday {this.state.event.date}</span>
                                        </div>
                                    </a>
                                </div>
                            ):null
                        }

                        )

                            ):
                            (pics.map((media,i) => {
                                return (
                            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
                            <a href="#" className="unit-9">

                                <div className="image"   style={{ backgroundImage: `url(${media})` }}></div>

                                <div className="unit-9-content">
                                    <h2>Art Gossip</h2>
                                    <span>Friday {this.state.event.date}</span>
                                </div>
                            </a>
                        </div>
                                )}))
                        }

                    </div>

        </div>
    </div>

  <Program event={event}/>


    <div className="site-section bg-light block-13">
        <div className="container" data-aos="fade-up">
            <div className="row">
                <div className="site-section-heading text-center mb-5 w-border col-md-6 mx-auto">
                    <h2 className="mb-5">Loved By Our Listeners</h2>
                </div>
            </div>
            <div className="row">
                  {this.state.event.comments && this.state.event.comments.length>0  && this.state.event.comments.length>=3?this.state.event.comments.slice(0,3).map((comment) => {
                      return (

                          <div className="col-md-4">
                              <div className="row">
                                  <div className="offset-4 col-md-8">
                                      <img className="w-50 mx-auto img-fluid rounded-circle" src={event01} style={{width:100,height:100,marginBottom:20}}/>
                                  </div>
                                  <div className="col-md-12">
                                      <p className="font-italic site-section-heading text-center mb-5 w-border col-md-6 mx-auto">
                                          &ldquo;
                                          {comment.message}
                                          &ldquo;</p>
                                  </div>
                              </div>
                          </div>

                      )}):

                      <div className="row">
                      <div className="col-md-4">
                          <div className="row">
                              <div className="offset-4 col-md-8">
                                  <img className="w-50 mx-auto img-fluid rounded-circle" src={event01} style={{width:100,height:100,marginBottom:20}}/>
                              </div>
                              <div className="col-md-12">
                                  <p className="font-italic site-section-heading text-center mb-5 w-border col-md-6 mx-auto">
                                      &ldquo;
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, fugit nam obcaecati fuga itaque deserunt officia
                                      &ldquo;</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-4">
                      <div className="row">
                      <div className="offset-4 col-md-8">
                      <img className="w-50 mx-auto img-fluid rounded-circle" src={event01} style={{width:100,height:100,marginBottom:20}}/>
                      </div>
                      <div className="col-md-12">
                      <p className="font-italic site-section-heading text-center mb-5 w-border col-md-6 mx-auto">&ldquo;
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, fugit nam obcaecati fuga itaque deserunt officia&ldquo;</p>
                      </div>
                      </div>
                      </div>
                      <div className="col-md-4">
                      <div className="row">
                      <div className="offset-4 col-md-8">
                      <img className="w-50 mx-auto img-fluid rounded-circle" src={event01} style={{width:100,height:100,marginBottom:20}}/>
                      </div>
                      <div className="col-md-12">
                      <p className="font-italic site-section-heading text-center mb-5 w-border col-md-6 mx-auto">&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, fugit nam obcaecati fuga itaque deserunt officia&ldquo;</p>
                      </div>
                      </div>
                      </div>
                      </div>

                  }
                      </div>

            <div className="nonloop-block-13 owl-carousel">

                <div className="text-center p-3 p-md-5 bg-white">
                    <div className="mb-4">
                        <img src={team1} alt="Image" className="w-50 mx-auto img-fluid rounded-circle"/>
                    </div>
                    <div className="">
                        <h3 className="font-weight-light h5">Megan Smith</h3>
                        <p className="font-italic">&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iusto. Aliquam illo, cum sed ea? Ducimus quos, ea?&rdquo;</p>
                    </div>
                </div>

                <div className="text-center p-3 p-md-5 bg-white">
                    <div className="mb-4">
                        <img src={team2} alt="Image" className="w-50 mx-auto img-fluid rounded-circle"/>
                    </div>
                    <div className="">
                        <h3 className="font-weight-light h5">Brooke Cagle</h3>
                        <p className="font-italic">&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iusto. Aliquam illo, cum sed ea? Ducimus quos, ea?&rdquo;</p>
                    </div>
                </div>

                <div className="text-center p-3 p-md-5 bg-white">
                    <div className="mb-4">
                        <img src={team3} alt="Image" className="w-50 mx-auto img-fluid rounded-circle"/>
                    </div>
                    <div className="">
                        <h3 className="font-weight-light h5">Philip Martin</h3>
                        <p className="font-italic">&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iusto. Aliquam illo, cum sed ea? Ducimus quos, ea?&rdquo;</p>
                    </div>
                </div>

                <div className="text-center p-3 p-md-5 bg-white">
                    <div className="mb-4">
                        <img src={team2} alt="Image" className="w-50 mx-auto img-fluid rounded-circle"/>
                    </div>
                    <div className="">
                        <h3 className="font-weight-light h5">Steven Ericson</h3>
                        <p className="font-italic">&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iusto. Aliquam illo, cum sed ea? Ducimus quos, ea?&rdquo;</p>
                    </div>
                </div>

                <div className="text-center p-3 p-md-5 bg-white">
                    <div className="mb-4">
                        <img src={team3} alt="Image" className="w-50 mx-auto img-fluid rounded-circle"/>
                    </div>
                    <div className="">
                        <h3 className="font-weight-light h5">Nathan Dumlao</h3>
                        <p className="font-italic">&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iusto. Aliquam illo, cum sed ea? Ducimus quos, ea?&rdquo;</p>
                    </div>
                </div>

                <div className="text-center p-3 p-md-5 bg-white">
                    <div className="mb-4">
                        <img src={team1} alt="Image" className="w-50 mx-auto img-fluid rounded-circle"/>
                    </div>
                    <div className="">
                        <h3 className="font-weight-light h5">Brook Smith</h3>
                        <p className="font-italic">&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iusto. Aliquam illo, cum sed ea? Ducimus quos, ea?&rdquo;</p>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <div className="site-blocks-cover overlay inner-page-cover subscribe"   style={{ backgroundImage: `url(${event05})` }} data-aos="fade" data-stellar-background-ratio="0.5">
        <div className="container">
            <div className="row align-items-center justify-content-center text-center">

                <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <h2><strong>Get ticket</strong></h2><br/>
                    <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit nihil saepe libero sit odio obcaecati veniam.</p>
                    {this.state.payments.length>0?<p>Vous avez deja pris votre ticket<b>&nbsp;&nbsp;Obtenir un autre ticket ?</b></p>:""}
                    <br/> <form action="#" method="post" className="site-block-subscribe">
                        <div className="input-group mb-3">

                            <Link to={"/Tickets/"+event.id} style={{marginLeft:180,backgroundColor:'#7cbd1e',color:'white',padding: "15px 50px"}} className="btn" type="button" id="button-addon2">
                                <strong className="text-uppercase">Get ticket</strong>
                            </Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div className="site-section">
        <div className="container" data-aos="fade-up">
            <div className="row">
                <div className="site-section-heading text-center mb-5 w-border col-md-6 mx-auto">
                    <h2 className="mb-5">Our musicians</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, fugit nam obcaecati fuga itaque deserunt officia, error reiciendis ab quod?</p>
                </div>
            </div>
            <div className="row">
                {users?users.map((artist,i) => {
                    return artist.role.libelle!=="organisateur" && artist.role.libelle!=="user"&& artist.role.libelle!=="admin"&&(


                <div key={i} className="col-md-6 col-lg-4 mb-5 mb-lg-5">

                    <div className="team-member">

                        {artist.media?
                            <Link to={"/Artist/"+artist.id} ><img  className="img-fluid eventImg" src={artist.media.url} style={{width: 400}}/></Link>
                            :
                            <Link to={"/Artist/"+artist.id}><img  className="img-fluid eventImg" src={event01} style={{width: 400}}/></Link>
                        }

                        <div className="text">
                            <Link to={"/Artist/"+artist.id} className="infos-artists">
                                <h2 className="mb-2 font-weight-light h4">{artist.name} {artist.last_name}</h2>
                                <span className="d-block mb-2 text-white-opacity-05 text-uppercase">{artist.role.libelle}</span>
                                <p className="mb-4">{artist.biography}.</p>
                            </Link>
                        </div>

                    </div>
                </div>

                    )}): null  }


            </div>
        </div>
    </div>
         <div className="site-section">
             <div className="container" data-aos="fade-up">

                 <div className="row">
                     <div className="site-section-heading text-center mb-5 w-border col-md-6 mx-auto">
                         <h2 className="mb-5">Organised by</h2>

                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, fugit nam obcaecati fuga itaque deserunt officia, error reiciendis ab quod?</p>
                     </div>
                 </div>
                 <div className="row">
                     {users?users.map((artist,i) => {
                         {if (artist.role.libelle==="organisateur" || artist.role.libelle==="user" || artist.role.libelle==="admin") {
                             return (
                         //return artist.role.libelle==="organisateur" || artist.role.libelle==="user" || artist.role.libelle==="admin" (

                             <div key={i} className="offset-4 col-md-6 col-lg-4 mb-5 mb-lg-5">

                                 <div className="team-member">

                                     {artist.media?
                                         <Link to={"/Artist/"+artist.id} ><img  className="img-fluid eventImg" src={artist.media.url} style={{width: 400}}/></Link>
                                         :
                                         <Link to={"/Artist/"+artist.id}><img  className="img-fluid eventImg" src={event01} style={{width: 400}}/></Link>
                                     }



                                     <div className="text" style={{width:'100%'}}>
                                         {/*<Link to={"/Artist/"+artist.id} className="infos-artists">*/}
                                             <h2 className="mb-2 font-weight-light h4">{artist.name} {artist.last_name}</h2>
                                             <span className="d-block mb-2 text-white-opacity-05 text-uppercase">{artist.role.libelle}</span>
                                             <p className="mb-4">{artist.biography}</p>
                                         {/*</Link>*/}
                                     </div>

                                 </div>
                             </div>

                                 )}}}):null}


                 </div>
             </div>
         </div>
         {recommended.length>0?
    <div className="site-section bg-light">
        <div className="container">
            <div className="row">
                <div className="site-section-heading text-center mb-5 w-border col-md-6 mx-auto" data-aos="fade-up">
                    <h2 className="mb-5">Recommended for you</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, fugit nam obcaecati fuga itaque deserunt officia</p>
                </div>
            </div>
            <div className="row">

                {recommended.map((event,i) =>
                    event.id!==this.state.event.id?(
                <div key={i} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                    {event.media && event.media.length>0?
                        event.media.slice(0, 1).map((m,i) =>
                        <Link to={"/EventDesc/"+event.id} onClick={(e)=>this.changeEvent(event.id)}><img  className="img-fluid eventImg" src={m.url} style={{width: 400}}/></Link>
                        ):
                        <Link to={"/EventDesc/"+event.id} onClick={(e)=>this.changeEvent(event.id)}><img  className="img-fluid eventImg" src={event05} style={{width: 400}}/></Link>
                    }

                    <div className="p-4 bg-white">
                        <span className="d-block text-secondary small text-uppercase">{event.date}</span>
                        <h2 className="h5 text-black mb-3"> <Link to={"/EventDesc/"+event.id} onClick={(e)=>this.changeEvent(event.id)} >{event.title}</Link></h2>
                        <p>{event.description}</p>
                    </div>
                </div>
                     ):null)}
                <div className=" offset-5 col-md-6 button-all">  <Link className="main_btn btn-events" to="/MoreEvents">Back to Events</Link></div>

            </div>
        </div>
    </div>
             :""}

         <CommentForm event={event}/>


</div>

        );
    }
}


