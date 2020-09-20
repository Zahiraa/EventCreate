import React, { Component } from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CLink, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

export default class User extends Component {

  constructor(props){
    super(props);
    this.state={
      user: []
    }
  }
  componentWillMount() {
    const id=this.props.match.params.id;
    const data={test: JSON.parse(localStorage["appState"])}

    let currentUser=(data.test.user)
    console.log(currentUser.id!=id)
    console.log(currentUser.id)
    console.log(id)
    if(currentUser.id!=id){
      this.props.history.push('/user/'+currentUser.id)
    }
  }
  componentDidMount=()=>{
    let id=this.props.match.params.id;
    const data={test: JSON.parse(localStorage["appState"])}

    let currentUser=(data.test.user)
    console.log(currentUser.id!=id)
    console.log(currentUser)
    console.log(id)
    if(currentUser.id!=id && currentUser.role!=1){
      this.props.history.push('/user/'+currentUser.id)
      id=currentUser.id
    }
    console.log("test id");
    console.log(id);
    axios.get(`api/user/${id}/edit`).then(
        Response => {
            this.setState({
                user: Response.data,
            })
            console.log(Response.data);
        }
    ).catch(err => console.log(err));
  }

  render() {
    // const user = usersData.find( user => user.id.toString() === match.params.id)
    const userDetails = Object.entries(this.state.user)
      // [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  return (


    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
          </CCardHeader>
          <CCardBody>
            <CLink style={{float:'right',color:"white"}} to={`/user/${this.state.user.id}/update/`}  type="submit" size="sm" className="btn btn-warning ext-uppercase font-weight-bold mb-3">Update profile</CLink>

              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails != null
                    ?
                    userDetails.map(([key, value], index) => (
                        key!=="role"?
                        <tr key={index.toString()}>
                          <td className="text-uppercase">{`${key}`}</td>
                          <td>

                            <strong >{value}</strong>
                          </td>
                        </tr>
                      :
                          <tr key={index.toString()}>
                            <td className="text-uppercase">{`${key}`}</td>
                            <td>

                              <strong className="text-uppercase text-danger">{value}</strong>
                            </td>
                          </tr>
                    ))
                    :
                    ''
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
}
