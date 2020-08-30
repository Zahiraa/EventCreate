import React, { lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link, withRouter } from 'react-router-dom'
const userdata={test: JSON.parse(localStorage["appState"])}
const Users = lazy(() => import('../users/Users.js'))
const Profile = lazy(() => import('../users/Profile.js'))

const Dashboard = () => { 
  return (
    userdata.test.user.role_id===1 ?
    <>
      <Users />
    </>
    :
    userdata.test.user.role_id===2 ?
    <>
      <Profile />
    </> : ''
  )
}

export default withRouter(Dashboard)
