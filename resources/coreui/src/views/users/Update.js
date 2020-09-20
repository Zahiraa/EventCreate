import React, {Component} from 'react';
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
    CSwitch,
    CIcon,
    CAlert
  } from '@coreui/react'
import { data } from 'autoprefixer';
export default class Update extends Component
{
    constructor(props){
        super(props);
        this.state={
            name: '',
          last_name: '',
            facebook: '',
            instagram: '',
            biography: '',
            email: '',
            date_naissance: '',
            city: '',
            password: '',
            role_id: '',
             roles: '',
            activation_token: '',
            showMessage: false

        }
        this.handleName=this.handleName.bind(this);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
        this.handlesubmitform=this.handlesubmitform.bind(this);
    }

    handleName=(event)=>{
        this.setState({
            name: event.target.value
        })
    }
    handlePassword=(event)=>{
        this.setState({
            password: event.target.value
        })
    }
    handleEmail=(event)=>{
        this.setState({
            email: event.target.value
        })
    }

    handleSelectChange = (event) => {
       this.setState({
           role_id: event.target.value
        });
      }
      // componentWillMount() {
      //   const data={test: JSON.parse(localStorage["appState"])}
      //   const id=this.props.match.params.id;
      //   let currentUser=(data.test.user)
      //   if(currentUser.id!==id){
      //     this.props.history.push('/user/'+currentUser.id)
      //   }
      // }

  componentDidMount=()=>{
    const id=this.props.match.params.id;
    const data={test: JSON.parse(localStorage["appState"])}

      let currentUser=(data.test.user)
    console.log(currentUser.id!=id)
    console.log(currentUser.id)
    console.log(id)
      if(currentUser.id!=id && currentUser.role!=1){
        this.props.history.push('/user/'+currentUser.id)
      }
      else{
        axios.get(`/api/user/${id}/edit`).then(
            Response => {
                this.setState({
                    name: Response.data.name,
                    last_name: Response.data.last_name,
                    email: Response.data.email,
                    facebook: Response.data.facebook,
                    instagram: Response.data.instagram,
                    biography: Response.data.biography,
                    city: Response.data.city,
                    date_naissance: Response.data.date_naissance,
                    // password: Response.data.password,
                    role_id: Response.data.role_id,
                    activation_token: Response.data.activation_token
                })
            }
        ).catch(err => console.log(err));

        axios.get(`/api/roles`).then(
          Response => {
            this.setState({
             roles:Response.data.roles,
            })
          }
        ).catch(err => console.log(err));
    }
    }

    handleData = input => e => {
      this.setState({
        [input]:e.target.value
      })

  }
    handlesubmitform=(event)=>{

        event.preventDefault();
        console.log("submit")
        console.log(this.state)
        this.setState({ showMessage: false });
        // const userdata={name: this.state.name, email: this.state.email, password: this.state.password, role_id: this.state.role_id,}
        const userdata={name: this.state.name,last_name: this.state.last_name, email: this.state.email, role_id: this.state.role_id,facebook:this.state.facebook,instagram:this.state.instagram,biography:this.state.biography,city:this.state.city,date_naissance:this.state.date_naissance}
        console.log('rrr')
        console.log(userdata)
      const id=this.props.match.params.id;
        axios.put(`/api/user/${id}/update`,userdata)
        .then((response) => {
            console.log(response)
          const data={test: JSON.parse(localStorage["appState"])}
          let currentUser=(data.test.user)
            this.setState({ showMessage: true })
          if(currentUser.role!==1){
            this.props.history.push('/user/'+id)
          }
          else{
            this.props.history.push('/users')
          }

        }).catch(err => console.log(err));
    }
    render() {

        // const { selectedOption } = this.state;
        // const value = selectedOption && selectedOption.value;
        const userdata={test: JSON.parse(localStorage["appState"])}
        let currentUser=(userdata.test.user)
      console.log('currentUser')
      console.log(currentUser)
        return(
          //  userdata.test.isLoggedIn===true && userdata.user.role===1 || userdata.test.isLoggedIn===true && userdata.user.role===5 ?
            <>
        <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                   User
                  <small> Update</small>
                </CCardHeader>
                <form onSubmit={this.handlesubmitform}>
                    <CCardBody>

                            <CRow>
                                {/* { this.state.showMessage &&
                                        <CAlert color="success" duration={5000}>
                                            <strong>Added successfully !</strong>
                                        </CAlert>
                                } */}
                            </CRow>

                            <CRow>
                                <CCol xs="8">
                                <CFormGroup>
                                    <CLabel htmlFor="name">Name</CLabel>
                                    <CInput type="text" id="name" placeholder="Name"
                                    required
                                    onChange={this.handleName}
                                    value={this.state.name}
                                     />
                                </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="8">
                                <CFormGroup>
                                    <CLabel htmlFor="last_name">Last Name</CLabel>
                                    <CInput type="text" id="last_name" placeholder="Last Name"
                                    onChange={this.handleData('last_name')}
                                    value={this.state.last_name}
                                     />
                                </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CLabel htmlFor="email">email</CLabel>
                                        <CInput type="email" id="email" placeholder="email"
                                        required
                                        onChange={this.handleEmail}
                                        value={this.state.email}
                                        />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                              <CCol xs="8">
                                <CFormGroup>
                                  <CLabel htmlFor="city">city</CLabel>
                                  <CInput type="text" id="city" placeholder="city"

                                          onChange={this.handleData('city')}
                                          value={this.state.city}
                                  />
                                </CFormGroup>
                              </CCol>
                            </CRow>

                            <CRow>
                              <CCol xs="8">
                                <CFormGroup>
                                  <CLabel htmlFor="date_naissance">date de naissance</CLabel>
                                  <CInput type="date" id="date_naissance" placeholder="date de naissance"
                                          onChange={this.handleData('date_naissance')}
                                          value={this.state.date_naissance}
                                  />
                                </CFormGroup>
                              </CCol>
                            </CRow>
                      <CRow>
                        <CCol xs="8">
                          <CFormGroup>
                            <CLabel htmlFor="facebook">facebook</CLabel>
                            <CInput type="text" id="facebook" placeholder="www.facebook.com"

                                    onChange={this.handleData('facebook')}
                                    value={this.state.facebook}
                            />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="8">
                          <CFormGroup>
                            <CLabel htmlFor="instagram">instagram</CLabel>
                            <CInput type="text" id="instagram" placeholder="www.instagram.com"

                                    onChange={this.handleData('instagram')}
                                    value={this.state.instagram}
                            />
                          </CFormGroup>
                        </CCol>

                        <CCol xs="8">
                          <CFormGroup>
                            <CLabel htmlFor="biography">biography</CLabel>
                            <CTextarea type="text" id="biography" placeholder="biography"

                                    onChange={this.handleData('biography')}
                                    value={this.state.biography}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                            <CRow>
                              {currentUser.role == 1 ?
                                <CCol xs="8">
                                    <CFormGroup>
                                        <CLabel htmlFor="role">role</CLabel>

                                        <CSelect
                                          onChange={this.handleSelectChange}
                                          value={this.state.role_id}
                                        >
                                          {this.state.roles && this.state.roles.length > 0 ? this.state.roles.map((role) => {
                                              return (

                                                <option value={role.id}>{role.libelle}</option>

                                              )
                                            })

                                            : null
                                          }

                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                                :""
                              }
                            </CRow>
                            <CRow>
                                <CCol xs="8">
                                    {/*<CFormGroup>*/}
                                    {/*    <CLabel htmlFor="password">Password</CLabel>*/}
                                    {/*    <CInput type="password" id="password" placeholder="pasword"*/}

                                    {/*    onChange={this.handlePassword}*/}

                                    {/*    />*/}
                                    {/*</CFormGroup>*/}
                                </CCol>
                            </CRow>
                    </CCardBody>
                    <CCardFooter>
                        <CButton type="submit" size="sm" color="primary"> update</CButton>
                    </CCardFooter>
                </form>
              </CCard>
            </CCol>
          </CRow>
          </>
          // :
          // window.location.href="/"
        );
    }
}
