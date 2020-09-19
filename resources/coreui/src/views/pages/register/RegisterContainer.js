import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import {Link, withRouter} from 'react-router-dom';

class RegisterContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      error: '',
      errorMessage: '',
      formSubmitting: false,
      isLoggedIn: '',
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '2',
    },
    redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
  }

  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
    }
    if (this.state.isRegistered) {
      this.props.history.push("/dashboard#/dashboard");
      location.reload();
    }
  }

  componentDidMount() {
    const { prevLocation } = this.state.redirect.state || {prevLocation: { pathname: '/dashboard#/dashboard' } };
    if (prevLocation && this.state.isLoggedIn) {
      return this.props.history.push(prevLocation);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({formSubmitting: true});
    ReactDOM.findDOMNode(this).scrollIntoView();
    let userData = this.state.user;
    console.log(userData);
    axios.post("/api/register", userData)
      .then(response => {
        console.log('response')
        console.log(response)
        return response;
    }).then(json => {
      console.log('json')
      console.log(json.data)
        if (json.data) {
          let userData = {
            id: json.data.id,
            name: json.data.name,
            email: json.data.email,
            activation_token: json.data.activation_token,
            role_id: 2,
          };
          let appState = {
            isRegistered: true,
            user: userData
          };

          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isRegistered: appState.isRegistered,
            user: appState.user
          });
          let ur='/dashboard#/dashboard'
          this.props.history.push(ur);
        //  location.reload();
        //  this.props.history.push('/dashboard#/dashboard');
        } else {
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

  handleName(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user, name: value
      }
    }));
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
  handlePasswordConfirm(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user, password_confirmation: value
      }
    }));
  }

  render() {
console.log('rrrr')
console.log(this.state)
    let errorMessage = this.state.errorMessage;
    let arr = [];
    Object.values(errorMessage).forEach((value) => (
      arr.push(value)
    ));

    return (

      <div>

        <section className="banner_area">
              <div className="banner_inner d-flex align-items-center">
                <div className="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
                <div className="container">
                    <div className="banner_content text-center">
                      <div className="page_link">
                        <a href="/">Home</a>
                        <a href="#">Register</a>
                      </div>
                      <h2>Registration</h2>
                    </div>
                </div>
              </div>
        </section>


      <div className="c-app c-default-layout flex-row align-items-center mb-5 mt-5">

        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" id="name" name="name" placeholder="name" autoComplete="name"
                        required
                        onChange={this.handleName}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" name="email" placeholder="Email" autoComplete="email"
                      required
                      onChange={this.handleEmail}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="new-password"
                      required
                      onChange={this.handlePassword}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Repeat password" autoComplete="new-password"
                      required
                      onChange={this.handlePasswordConfirm}
                      />
                      {/* <CInput type="number" min="1" max="5"
                      required
                      onChange={this.handleUserRole}
                      /> */}
                    </CInputGroup>
                    <CButton type="submit" color="success" block >Create Account</CButton>
                  </CForm>
                </CCardBody>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="6">
                      <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
    )
  }
}

export default withRouter(RegisterContainer)
