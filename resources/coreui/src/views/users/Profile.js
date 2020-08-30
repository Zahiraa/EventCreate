import React, { Component } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

export default class User extends Component {

  constructor(props){
    super(props);
    this.state={
      user: []
    }
  }

  componentDidMount=()=>{
    const userdata={test: JSON.parse(localStorage["appState"])}
    const id = userdata.test.user.id
    console.log('---tessssst---')
    console.log(userdata)
    axios.get(`/api/user/${id}/edit`).then(
        Response => {
            this.setState({
                user: Response.data,
            })
            console.log('--test---')
            console.log(Response.data);
        }
    ).catch(err => console.log(err));
  }

  render() {
    const userdata={test: JSON.parse(localStorage["appState"])}
    // const user = usersData.find( user => user.id.toString() === match.params.id)
    const userDetails = Object.entries(this.state.user)
      // [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  return (

    userdata.test.isLoggedIn===true && userdata.user.role===2 ?
    <>
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails !== null
                    ?
                    userDetails.map(([key, value], index) => (

                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
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
    </>
    :
    window.location.href="/"
  )
}
}
