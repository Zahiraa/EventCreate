import React, { useState, useEffect, Component } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CLink
} from '@coreui/react'

import usersData from './UsersData'
import { render } from 'enzyme'
import Axios from 'axios'

export default class Users extends Component {

  constructor(props){
    super(props);
    this.state={
      users: []
    }
  }

  componentDidMount = () =>{
    const url=process.env.MIX_REACT_APP_ROOT
    Axios.get(url+'/users/liste').then(
      Response => {
          this.setState(
              {
                  users: Response.data
              }
          )
          console.log(this.state.users);
      }
  ).catch(err => console.log(err));
  }

  /**
   * delete user
   */
  handledelete = (id) =>{
    console.log('click', id)
    const isnotid = userid=>userid.id !=id;
    const userliste = this.state.users.filter(isnotid);
    this.setState({ users: userliste });
    Axios.delete(`/api/user/${id}/delete`)
    .then(
      response => {
        console.log(response)
    })
    .catch(err => console.log(err));
  }

  render() {

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> liste</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={this.state.users}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              { key: 'role_id', _classes: 'font-weight-bold' },

              'email', 'role_id', 'actions'
            ]}
            hover
            striped
            itemsPerPage={5}
            // activePage={page}
            pagination
            clickableRows
            //onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              // 'status':
              //   (item)=>(
              //     <td>
              //       <CBadge color={getBadge(item.status)}>
              //         {item.status}
              //       </CBadge>
              //     </td>
              //   ),
                'actions':
                (item)=>(
                  <td>
                     <CLink to={`/user/${item.id}/update/`}  type="submit" size="sm" className="btn btn-warning">Update</CLink>
                     <CLink size="sm" type="submit" onClick={this.handledelete.bind(this,item.id)} className="btn btn-danger">Delete</CLink>
                     <CLink to={`/user/${item.id}`} size="sm" className="btn btn-danger">Details</CLink>
                  </td>
                )
            }}
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
  }
}
