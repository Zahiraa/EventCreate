import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {getResults} from "../../../../../js/services";
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
  CRow,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

export default class Step4 extends Component
{
  constructor(props){
    super(props);
    this.state={
      title: '',
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
    this.back=this.back.bind(this);
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    if(this.state.redirect) {
      return  <Redirect to="/events/liste" />;
    }
    console.log(this.state)
    const { values, inputChange } = this.props;
    return(
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Assurance & Security
              <small> Step 4</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                  <CFormGroup row>
                    <CCol xs="12" md="3">
                      <CLabel htmlFor="password-input">Autorisation</CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput type="file" id="autorisation" name="autorisation"  onChange={inputChange('autorisation')}  value={values.autorisation} required/>

                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="3">
                      <CLabel htmlFor="password-input">Limite Age</CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput type="number" id="age" name="age" name="limit_age"  onChange={inputChange('limit_age')} value={values.limit_age} required/>
                    </CCol>
                  </CFormGroup>
                <CFormGroup row>
                  <CCol xs="12" md="3">
                    <CLabel htmlFor="password-input">Assurance</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CInput type="file" id="assurance" name="assurance"  onChange={inputChange('assurance')} value={values.assurance} required/>

                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="12" md="3">
                    <CLabel htmlFor="password-input">Limite des Places</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CInput type="number" id="limite" name="limit_places"  onChange={inputChange('limit_places')} value={values.limit_places} required />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>

              <div className="row">
                <div className="col-6">
                  <button className="btn btn-danger" onClick={this.back}>Back</button>
                </div>
                <div className="col-6 text-right">
                  <button className="btn btn-primary" onClick={this.continue}>Continue</button>
                </div>
              </div>
            </CCardFooter>
          </CCard>

        </CCol>
      </CRow>
    );
  }
}
