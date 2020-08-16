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
export default class Step1 extends Component
{
  constructor(props){
    super(props);
    this.state={
      title: '',
      users: '',
      place: '',
      status: false,
      description: '',
      date: '',
      categories: '',
      categoryID: '',
      tags  : '',
      images  : '',
      showMessage: false,
      redirect: false,

    }

    this.continue=this.continue.bind(this);
  }
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    if(this.state.redirect) {
      return  <Redirect to="/events/liste" />;
    }
    const { values, inputChange } = this.props;
    return(


    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            Event Info
            <small> Step 1</small>
          </CCardHeader>
          <CCardBody>
            <form method="POST" >

              <CFormGroup row>
                <CCol xs="12" md="3">
                  <CLabel htmlFor="password-input">title</CLabel>
                </CCol>
                <CCol xs="12" md="6">
                  <CInput type="text" className="form-control" id="title" name="title" onChange={inputChange('title')} value={values.title} required/>


                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="3">
                  <CLabel htmlFor="password-input">place</CLabel>
                </CCol>
                <CCol xs="12" md="6">
                  <CInput type="text" className="form-control" id="place" name="place" onChange={inputChange('place')} value={values.place} required/>

                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="3">
                  <CLabel htmlFor="password-input">description</CLabel>
                </CCol>
                <CCol xs="12" md="6">

                  <CTextarea cols={10} rows={5} className="form-control" id="description" name="description" onChange={inputChange('description')} value={values.description}/>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="3">
                  <CLabel htmlFor="password-input">date</CLabel>
                </CCol>
                <CCol xs="12" md="6">

                  <CInput type="date" className="form-control" id="date" name="date" onChange={inputChange('date')} value={values.date} required/>
                </CCol>
              </CFormGroup>

            </form>
          </CCardBody>
          <CCardFooter>

            <div className="row">

              <div className="col-12 text-right">
                <button className="btn btn-primary" type="submit" onClick={this.continue}>Continue</button>
              </div>
            </div>
          </CCardFooter>
        </CCard>

      </CCol>
    </CRow>
    );
  }
}
