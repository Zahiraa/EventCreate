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
  CSwitch,
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
import {getResults} from "../../../../../js/services";
export default class Step6 extends Component
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

    this.back=this.back.bind(this);
  }
  componentDidMount() {
    const { values, inputChange } = this.props;
    const url=process.env.MIX_REACT_APP_ROOT
    getResults(url+'/categories/'+values.categoryID,data=> {
      this.setState({
        categories: data.categories,
      })
    })
    console.log('ffffff'+values.categoryID)
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };


  handlesubmitform=(event)=>{

    event.preventDefault();
    const userdata={test: JSON.parse(localStorage["appState"])}
    let id = userdata.test.user.id;
    if(!id){
      id=2
    }
    axios.post('/api/event/new',{
      data: this.props.values,
      organisateur:id


    }).then(() => {
      this.setState({ showMessage: true,redirect:true })
    })
      .then(Response =>{
        this.setState({
          place: '',
          title: '',

        })
      }).catch(err => console.log(err));
    console.log('error create event')
  }
  render() {

    console.log('finnnnnnnn')
    console.log(this.props)
    if(this.state.redirect) {
      // return  <Redirect to="/events/liste" />;

      window.location.href="/MoreEvents/"
    }
    const { values, inputChange } = this.props;

    return(
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              RECAPITULATION

            </CCardHeader>
            <CCardBody>
              <form method="POST" onSubmit={this.handlesubmitform} encType="multipart/form-data">
                <CCardBody>
                  <div className="container" style={divContainer}>
                      <section className="section" style={SectionStyle}>
                <div className="left" style={left}>
                  <div className="event" style={event}>Live in concert</div>
                  <div className="title"  style={title}>{values.title}</div>
                  <div className="info" style={info}>{values.date} // {values.place}</div>
                </div>
                <div className="right" style={right}>
                  <div className="seats" style={seats}>section<span style={span}>A</span></div>
                  <div className="seats" style={seats}>row<span style={span}>13</span></div>
                  <div className="seats"  style={seats}>seat<span style={span}>{values.limit_places}</span></div>
                </div>
              </section>
                   </div>
              </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" style={{float:"right"}}> Submit</CButton>
              <CButton  size="sm" color="danger"  onClick={this.back}> back</CButton>
            </CCardFooter>
          </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}
const url="https://htmlpdfapi.com/uploads/images/568b96887261690f6dbe0000/content_background-concert-3.jpg?1451988615"
const divContainer = {
  width: 795,
  margin: "0 auto",
  color: "#ffffff",
  fontFamily: "Open Sans",
  fontWeight: 400,
  fontSize: 25,
};
const SectionStyle = {
  position: 'relative',
  height: 280,
  width: '100%',
  backgroundRepeat: "no-repeat",
  backgroundImage:`url(${url})`,

};
const right = {
  float: 'right',
  width: 160,
  paddingTop: 30,
};
const left = {

  boxSizing: 'border-box',
  float: 'left',
  width: 635,
  padding: '35 0 0 60',
};
const event = {

  lineHeight: 35,
  textTransform: 'uppercase',
  position: 'absolute',
  top: -310,
  left: 260,
};
const title = {

  marginBottom: 35,
  color: '#F5A623',
  fontFamily: "Audiowide",
  fontSize: '2em',
  textTransform: 'uppercase',
  top: 170,
  position: 'absolute',
  left: 90,
};
const info = {

  textTransform: 'uppercase',
  position: 'absolute',
  marginTop: 30,
  left: 30,
  fontSize: 18,
};
const seats = {
  marginBottom: 35,
  fontSize: '0.36em',
  textTransform: 'uppercase',
  textAlign: 'right'
};
const span = {
  display:" inline-block",
  width: 80,
  marginLeft: 15,
  padding: "10 0",
  color: "#F5A623",
  background: "rgba(255, 255, 255, 0.5)",
  fontFamily: "Kreon",
  fontSize: '2.777em',
  textAlign: "center",
  verticalAlign: "middle",
};

