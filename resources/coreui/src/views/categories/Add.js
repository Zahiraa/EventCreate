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
      libelle: '',
      categories: [],
      message:'Veuillez ajoutez une catégorie qui n\'existe pas'

    }

  }

  componentDidMount=()=>{
    const url=process.env.MIX_REACT_APP_ROOT
    axios.get(url+'/categories').then(
      Response => {
        this.setState(
          {
            categories: Response.data.categories
          }
        )

      }
    ).catch(err => console.log(err));
  }

  inputChange = e => {

      this.setState({
      libelle: e.target.value
    });


  };
  handlesubmitform=(event)=>{

    event.preventDefault();
    console.log('rr')

    axios.post('/api/categories/checkCategory',{
      data:
        {
          libelle:this.state.libelle
        }


    }) .then(res => {
      const exist = res.data.exist;
    if(!exist){
      axios.post('/api/categories/create',{
        data:
          {
            libelle:this.state.libelle
          }


      }).then(() => {
        this.setState({ libelle: "",redirect:true })
      })
        .then(Response =>{
          this.setState({
            libelle: '',


          })
        }).catch(err => console.log(err));
      console.log('error create event')
    }
    else{
      this.setState({
        message:'Category existe deja ! ',
        redirect:false
      })
    }
    })
      .then(Response =>{
        this.setState({
          libelle: '',


        })
      }).catch(err => console.log(err));
    console.log('error create event')

  }
      render() {
     console.log('ttt.state')
     console.log(this.state)
        if (this.state.redirect) {
          return <Redirect to="/Categories"/>;
        }

         return (
           <CRow>
             <CCol xs="12" md="12">
               <CCard>
                 <CCardHeader>
                   Add
                   <small> a new Category</small>
                 </CCardHeader>

                 <div className="container-fluid"><br/>




                 <div className="row">
                   <div className="col-3 alert alert-danger text-uppercase" style={{marginLeft:10}}>

                       {this.state.message}

                     {/*<p className="text-uppercase"><small>Veuillez ajoutez une catégorue qui n'existe pas déjà</small></p><br/>*/}
                   </div>
                   <div className="col-8">
                   {this.state.categories &&this.state.categories.length>0?this.state.categories.map((category)=>{
                     return(

                       <span className="badge badge-danger" style={{padding:10,marginLeft:20,fontSize:12,marginTop: 8}}>{category.libelle}</span>

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
                         <CLabel htmlFor="password-input">libelle</CLabel>
                       </CCol>
                       <CCol xs="12" md="6">
                         <CInput type="text" className="form-control" id="title" name="libelle" onChange={this.inputChange} value={this.state.libelle} required/>


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
