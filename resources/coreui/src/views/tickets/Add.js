import React, {Component} from 'react';
import { Redirect } from 'react-router';
import axios from 'axios'
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
  CRow
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {getResults} from "../../../../js/services";
import Axios from "axios";
export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      tickets: [],
      message:'Veuillez ajoutez un ticket qui n\'existe pas'

    }

  }

  componentDidMount=()=>{
    const url=process.env.MIX_REACT_APP_ROOT
    axios.get(url+'/tickets').then(
      Response => {
        this.setState(
          {
            tickets: Response.data.tickets
          }
        )

      }
    ).catch(err => console.log(err));
  }

  inputChange  = input => e => {

      this.setState({
      [input]: e.target.value
    });


  };
  handlesubmitform=(event)=>{

    event.preventDefault();
    console.log('rr')

    axios.post('/api/tickets/checkTicket',{
      data:
        {
          name:this.state.name,
          price:this.state.price
        }


    }) .then(res => {
      const exist = res.data.exist;
    if(!exist){
      axios.post('/api/tickets/create',{
        data:
          {
            name:this.state.name,
            price:this.state.price
          }


      }).then(() => {
        this.setState({ name: "",price:"",redirect:true })
      })
        .then(Response =>{
          this.setState({
            name: "",
            price:""

          })
        }).catch(err => console.log(err));
      console.log('error create event')
    }
    else{
      this.setState({
        message:'Ticket existe deja ! ',
        redirect:false
      })
    }
    })
      .then(Response =>{
        this.setState({
          name: "",
          price:""

        })
      }).catch(err => console.log(err));
    console.log('error create ticket')

  }
      render() {
     console.log('ttt.state')
     console.log(this.state)
        if (this.state.redirect) {
          return <Redirect to="/Tickets"/>;
        }

         return (
           <CRow>
             <CCol xs="12" md="12">
               <CCard>
                 <CCardHeader>
                   Add
                   <small> a new Ticket</small>
                 </CCardHeader>

                 <div className="container-fluid"><br/>




                 <div className="row">
                   <div className="col-3 alert alert-danger text-uppercase" style={{marginLeft:10}}>

                       {this.state.message}

                     {/*<p className="text-uppercase"><small>Veuillez ajoutez une catégorue qui n'existe pas déjà</small></p><br/>*/}
                   </div>
                   <div className="col-8">
                   {this.state.tickets &&this.state.tickets.length>0?this.state.tickets.map((ticket)=>{
                     return(

                       <span className="badge badge-danger" style={{padding:10,marginLeft:20,fontSize:12,marginTop: 8}}>{ticket.name}</span>

                     )})

                     :null
                   }
                   </div>
                 </div>
                 </div>
                 <CCardBody>
                   <form method="POST" onSubmit={this.handlesubmitform}>


                     <CFormGroup row>
                       <CCol xs="12" md="3">
                         <CLabel htmlFor="password-input">name</CLabel>
                       </CCol>
                       <CCol xs="12" md="6">
                         <CInput type="text" className="form-control" id="place" name="name" onChange={this.inputChange('name')} value={this.state.name}/>

                       </CCol>
                     </CFormGroup>

                     <CFormGroup row>
                       <CCol xs="12" md="3">
                         <CLabel htmlFor="password-input">price</CLabel>
                       </CCol>
                       <CCol xs="12" md="6">
                         <CInput type="number" className="form-control" id="price" name="price" onChange={this.inputChange('price')} value={this.state.price}/>

                       </CCol>
                     </CFormGroup>

                     <CCardFooter>
                       <CButton type="submit" size="md" color="primary" style={{float:"right"}}> Submit</CButton>

                     </CCardFooter>
                   </form>
                 </CCardBody>



               </CCard>

             </CCol>
           </CRow>
         )

      }
}
