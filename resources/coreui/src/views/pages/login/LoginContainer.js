import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      error: '',
      formSubmitting: false,
      role: '',
      user: {
        email: '',
        password: '',
      },
      redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
    }
  }
  componentDidMount() {
    const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/dashboard' } };
    if (prevLocation && this.state.isLoggedIn) {
      this.props.history.push(prevLocation);
      location.reload();
    }

  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({formSubmitting: true});
    let userData = this.state.user;
    const url=process.env.MIX_REACT_APP_ROOT
    console.log('userData')
    console.log(userData)
    axios.post(url+"/login", userData).then(response => {
      return response;
    }).then(json => {
      console.log(json)
      if (json.data.success) {
        console.log('json.data.success')
        console.log(json.data)
        let userData = {
          id: json.data.id,
          name: json.data.name,
          email: json.data.email,
          role: json.data.role_id,
          access_token: json.data.access_token,
        };
        let appState = {
          isLoggedIn: true,
          user: userData
        };

        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isLoggedIn: appState.isLoggedIn,
          user: appState.user,
          error: ''
        });
        let ur="";
        // this.state.user.role===1 || this.state.user.role===5 ? ur="/dashboard" : this.state.user.role===2 ? ur="dashboard#/user/"+this.state.user.id : ur="/";
        var role=this.state.user.role
        var idUser=this.state.user.id
        if(role===1){
          ur="/dashboard"
        }
        else{
          ur="dashboard#/user/"+idUser
        }
        console.log(ur);
       this.props.history.push(ur);
       location.reload();
      }
      else {
        alert(`Our System Failed To Register Your Account!`);
      }
    }).catch(error => {if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      let err = error.response.data;
      this.setState({
        error: err.message,
        errorMessage: err.errors,
        formSubmitting: false
      })
    }
    else if (error.request) {
      // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      let err = error.request;
      this.setState({
        error: err,
        formSubmitting: false
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      let err = error.message;
      this.setState({
        error: err,
        formSubmitting: false
      })
    }
    }).finally(this.setState({error: ''}));
  }

  handleEmail(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user, email: value
      }
    }));
  }
  handlePassword(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user, password: value
      }
    }));
  }

  render() {

    return (
      <div>
        <section className="banner_area">
          <div className="banner_inner d-flex align-items-center">
            <div className="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
            <div className="container">
              <div className="banner_content text-center">
                <div className="page_link">
                  <a href="/">Home</a>
                  <a href="#">Login</a>
                </div>
                <h2>Login page</h2>
              </div>
            </div>
          </div>
        </section>
        <div className="c-app c-default-layout flex-row align-items-center mt-5 mb-5">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="8">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="email" name="email" placeholder="email" autoComplete="email"
                                  required
                                  onChange={this.handleEmail}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" name="password" placeholder="Password" autoComplete="current-password"
                                  required
                                  onChange={this.handlePassword}
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton type="submit" color="primary" className="px-4">{this.state.formSubmitting ? "Logging You In..." : "Log In"}</CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0">Forgot password?</CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CCardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.</p>
                        <Link to="/register">
                          <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginContainer)
