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

export default class Step5 extends Component
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
      tickets: '',

    }

    this.continue=this.continue.bind(this);
    this.back=this.back.bind(this);
  }
  componentDidMount() {
    const url=process.env.MIX_REACT_APP_ROOT
    getResults(url+'/tickets',data=>{
      this.setState({
        tickets:data.tickets,
      })

    })

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

    const { values, inputChange } = this.props;
    return(
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Budget & Ticket Price
              <small> Step 5</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">


                <CFormGroup row>
                  <CCol xs="12" md="3">
                    <CLabel htmlFor="password-input">Budget</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CInput type="number" id="budget" name="budget"  onChange={inputChange('budget')} value={values.budget} required />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="3">
                    <CLabel htmlFor="password-input">Ticket Price </CLabel>
                  </CCol>
                  <CCol xs="12" md="6">

                    <CSelect  multiple onChange={inputChange('ticket')}  name="ticket[]" value={values.ticket}>
                      <option>--- Ticket Price ---</option>
                      { this.state.tickets ?this.state.tickets.map((t,i) => {
                        return (
                          <option value={t.id}>{t.name } - {t.price} $</option>
                        )}):null}

                    </CSelect >
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
