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
            email: '',
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
      componentDidMount=()=>{
        const id = this.props.match.params.id;
        axios.get(`/api/user/${id}/edit`).then(
            Response => {
                this.setState({
                    name: Response.data.name,
                    email: Response.data.email,
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

    handlesubmitform=(event)=>{
        event.preventDefault();
        this.setState({ showMessage: false });
        // const userdata={name: this.state.name, email: this.state.email, password: this.state.password, role_id: this.state.role_id,}
        const userdata={name: this.state.name, email: this.state.email, role_id: this.state.role_id,}
        const id=this.props.match.params.id;
        axios.put(`/api/user/${id}/update`,userdata)
        .then((response) => {
            console.log(response)
            this.setState({ showMessage: true })
            this.props.history.push('/users')
        }).catch(err => console.log(err));
    }
    render() {

        // const { selectedOption } = this.state;
        // const value = selectedOption && selectedOption.value;

        return(
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
                                        <CLabel htmlFor="role">role</CLabel>
                                        <CSelect
                                            onChange={this.handleSelectChange}
                                            value={this.state.role_id}
                                        >
                                          {this.state.roles &&this.state.roles.length>0?this.state.roles.map((role)=>{
                                              return(

                                                <option value={role.id}>{role.libelle}</option>

                                              )})

                                            :null
                                          }

                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
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
        );
    }
}
