import React, {Component} from 'react';
import axios from 'axios'
import img from "../../../../../public/assets/img/event1.jpg";

import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch,
    CIcon
  } from '@coreui/react'

export default class Update extends Component
{
    constructor(props){
        super(props);
        this.state={
            title: '',
            place: '',
            status: false,
            Description: '',
            date: '',
          budget: '',
             medias: '',
             users: '',
             tickets: '',
          critere: '',
            limit_places: '',
          limit_age: '',
          ArrayArtists: [],
          ArrayMedias: [],
          ArrayTickets: [],
          ArrayCritere: [],
          redirect: false,

        }
        this.handleTitle=this.handleTitle.bind(this);
        this.handlePlace=this.handlePlace.bind(this);
        this.handleStatus=this.handleStatus.bind(this);
        this.handleDescription=this.handleDescription.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.handleBudget=this.handleBudget.bind(this);
        this.handlesubmitform=this.handlesubmitform.bind(this);
    }

    handleTitle=(event)=>{
        this.setState({
            title: event.target.value
        })
    }
    handlePlace=(event)=>{
        this.setState({
            place: event.target.value
        })
    }
    handleStatus=()=>{
        this.setState({
            status: !this.state.status
        })
    }
    handleDescription=(event)=>{
        this.setState({
            description: event.target.value
        })
    }
    handleDate=(event)=>{
        this.setState({
            date: event.target.value
        })
    }
  handleBudget=(event)=>{
        this.setState({
            budget: event.target.value
        })
    }
  handlelimitPlaces=(event)=>{
      console.log(event.target.value)
        this.setState({
          limit_places: event.target.value
        })
    }
  handleAge=(event)=>{
        this.setState({
          limit_age: event.target.value
        })
    }
    handleCheckBox=(event)=>{
      let id=event.target.value
          if( !event.target.checked){

            var array = [...this.state.ArrayArtists]; // make a separate copy of the array
            var index = array.indexOf(parseInt(id))

            if (index !== -1) {
              array.splice(index, 1);
              this.setState({ArrayArtists: array});
            }
          }
          else{
            var exist = this.state.ArrayArtists.indexOf(id)
            if(exist === -1)
              this.state.ArrayArtists.push(id);
            this.setState({ArrayArtists:this.state.ArrayArtists});
          }

    }

  handleTicket=(event)=>{
    let id=event.target.value
    if( !event.target.checked){
      console.log('reeer')
      console.log(this.state.ArrayTickets)
      var array = [...this.state.ArrayTickets]; // make a separate copy of the array
      var index = array.indexOf(parseInt(id))
      console.log("index",id,index)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ArrayTickets: array});
      }
    }
    else{
      console.log('rr')
      var exist = this.state.ArrayTickets.indexOf(id)
      if(exist === -1)
        this.state.ArrayTickets.push(id);
      this.setState({ArrayTickets:this.state.ArrayTickets});
    }

  }

    handleMedias=(event)=>{

      let id=event.target.value
      if( !event.target.checked){

        var array = [...this.state.ArrayMedias]; // make a separate copy of the array
        var index = array.indexOf(parseInt(id))

        if (index !== -1) {
          array.splice(index, 1);
          this.setState({ArrayMedias: array});
        }
      }
      else{
        var exist = this.state.ArrayMedias.indexOf(id)
        if(exist === -1)
          this.state.ArrayMedias.push(id);
        this.setState({ArrayMedias:this.state.ArrayMedias});

      }




    }
    componentDidMount=()=>{
        const id = this.props.match.params.id;
        console.log(this.props);
        axios.get(`api/event/${id}/edit`).then(
            Response => {
                this.setState({
                    title: Response.data.event.title,
                    place: Response.data.event.place,
                    status: Response.data.event.status,
                    description: Response.data.event.description,
                    date: Response.data.event.date,
                    medias: Response.data.event.media,
                    users: Response.data.event.user,
                    budget: Response.data.event.budget,
                    tickets: Response.data.event.tickets,
                  critere: Response.data.event.critere,
                  ArrayMedias: Response.data.medias,
                  ArrayArtists: Response.data.users,
                  ArrayTickets: Response.data.tickets,
                  ArrayCritere: Response.data.critere,
                })
                console.log(Response.data);
            }
        ).catch(err => console.log(err));


    }


    handlesubmitform=(event)=>{
      console.log('this.state')
      console.log(this.state)
        event.preventDefault();
        const id=this.props.match.params.id;
      const {title, place, status, description, date,ArrayArtists,ArrayMedias,tickets,ArrayTickets,ArrayCritere,limit_places,limit_age} = this.state;
      const values = {title, place, status, description, date,ArrayArtists,ArrayMedias,tickets,ArrayTickets,ArrayCritere,limit_places,limit_age};
        // axios.put(`/api/event/${id}/update`,{
        //     title: this.state.title,
        //     place: this.state.place,
        //     status: this.state.status,
        //     description: this.state.description,
        //     date: this.state.date
        // }).then(Response =>{
        //     this.setState({
        //         title: '',
        //         place: '',
        //         status: false,
        //         description: '',
        //         date: ''
        //     })
        //     this.props.history.push('/events/liste')
        // })
        // .catch(err => console.log(err));

      axios.put(`/api/eventWithAllInfos/${id}/update`,{
        data: values


      }).then(() => {
        this.setState({ redirect:true })
      })
        .then(Response =>{
          this.props.history.push('/events/liste')
        }).catch(err => console.log(err));
      console.log('error create event')
    }

    render() {
let critere=this.state.critere
        return(
        <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                   Update
                  <small> Event</small>
                </CCardHeader>
                <form method="POST" onSubmit={this.handlesubmitform}>
                    <CCardBody>

                            <CRow>
                                <CCol xs="8">
                                <CFormGroup>
                                    <CLabel htmlFor="name">title</CLabel>
                                    <CInput id="name" placeholder="Title"
                                    required
                                    onChange={this.handleTitle}
                                    value={this.state.title}
                                     />
                                </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CLabel htmlFor="name">Place</CLabel>
                                        <CInput id="name" placeholder="adress"
                                        required
                                        onChange={this.handlePlace}
                                        value={this.state.place}
                                        />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CRow>
                                        <CCol xs="1"> <CLabel htmlFor="name">Status</CLabel></CCol>
                                        <CCol xs="11"> <CSwitch className={'mx-1'} variant={'3d'} color={'success'}
                                         checked={this.state.status}
                                         onChange={this.handleStatus}
                                         value={this.state.status}
                                         /></CCol>
                                        </CRow>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                              <CCol xs="8">
                                <CFormGroup>
                                  <CLabel htmlFor="name">Budget</CLabel>
                                  <CInput id="name" placeholder="Budget"
                                          required
                                          onChange={this.handleBudget}
                                          value={this.state.budget}
                                  />
                                </CFormGroup>
                              </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CLabel htmlFor="name">Description</CLabel>
                                        <CInput id="name" placeholder="Description"
                                        required
                                        onChange={this.handleDescription}
                                        value={this.state.description}
                                        />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CLabel htmlFor="name">Date</CLabel>
                                        <CInput type="date" id="date-input" name="date-input" placeholder="date"
                                        onChange={this.handleDate}
                                        value={this.state.date}
                                        />
                                    </CFormGroup>
                                </CCol>
                            </CRow><br/><hr/>

                            <CRow>
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CLabel htmlFor="medias"  className="text-uppercase">Medias</CLabel>
                                      <div className="row">
                                      {this.state.medias.length>0 ? this.state.medias.map((media,i) => {
                                        return (
                                          <div className="col-md-3">
                                      <img src={media.url} style={{width:100,height:100}}/>
                                      <p><small>{media.title}</small></p>
                                        <input type="checkbox" id={"media-" + media.id} name="date-input"
                                        onChange={this.handleMedias}
                                        value={media.id}
                                               defaultChecked={true}
                                        /></div>
                                      )}):null}
                                      </div>
                                    </CFormGroup>
                                </CCol>
                            </CRow><br/><hr />
                            <CRow>
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CLabel htmlFor="medias"  className="text-uppercase">Artists</CLabel>
                                      <div className="row">
                                      {this.state.users.length>0 ? this.state.users.map((user,i) => {

                                        {if (user.role.libelle!=="organisateur" && user.role.libelle!=="user" && user.role.libelle!=="admin") {
                                          return (

                                          <div className="col-md-3">
                                           <img src={user.media? user.media.url:img} style={{width:100,height:100}}/>
                                      <p><small className="text-uppercase">{user.name} - {user.role.libelle}</small></p>
                                        <input type="checkbox" id={"user-" + user.id} name="users-input"
                                        onChange={this.handleCheckBox}
                                               defaultChecked={true}
                                               value={user.id}
                                        /></div>
                                      )}}}):null}
                                      </div>
                                    </CFormGroup>
                                </CCol>
                            </CRow><hr/>
                            <CRow>
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CLabel htmlFor="medias"  className="text-uppercase">Tickets</CLabel>
                                      <div className="row">
                                      {this.state.tickets.length>0 ? this.state.tickets.map((ticket,i) => {
                                        return (
                                          <div className="col-md-3">

                                      <p><small className="text-uppercase">{ticket.name} - {ticket.price} $</small></p>
                                        <input type="checkbox" id={"ticket-" + ticket.id} name="ticket-input"
                                        onChange={this.handleTicket}
                                               defaultChecked={true}
                                               value={ticket.id}
                                        /></div>
                                      )}):null}
                                      </div>
                                    </CFormGroup>
                                </CCol>
                            </CRow><hr/>
                               <CRow>
                                 <CCol xs="8">
                                   <CFormGroup>
                                 <CLabel htmlFor="Criteres" className="text-uppercase">Criteres</CLabel>
                                   </CFormGroup>
                                 </CCol>
                               </CRow>
                            <CRow>
                              <CCol xs="4">
                                <CFormGroup>
                                  <CLabel htmlFor="limit">limit Places</CLabel>
                                  <CInput id="limit" placeholder="places"
                                          required
                                          onChange={this.handlelimitPlaces}
                                          defaultValue={critere.limite_places}
                                  />
                                </CFormGroup>
                              </CCol>

                              <CCol xs="4">
                                <CFormGroup>
                                  <CLabel htmlFor="age">limit Age</CLabel>
                                  <CInput id="age" placeholder="age"
                                          required
                                          onChange={this.handleAge}
                                          defaultValue={critere.limite_age}
                                  />
                                </CFormGroup>
                              </CCol>
                            </CRow>

                    </CCardBody>
                    <CCardFooter>
                        <CButton type="submit" size="sm" color="primary"> Submit</CButton>
                    </CCardFooter>
                </form>
              </CCard>
            </CCol>
          </CRow>
        );
    }
}
