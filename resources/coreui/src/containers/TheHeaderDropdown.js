import React, { Component } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg, CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link, withRouter  } from 'react-router-dom'
import axios from 'axios'
import { extend } from 'jquery'
import {getResults} from "../../../js/services";


class TheHeaderDropdown extends Component {

  constructor(props){
    super(props);
    this.state={
      payments:"",
      user:[]
    };
    this.logOut = this.logOut.bind(this);
  }
componentDidMount() {
  let url=process.env.MIX_REACT_APP_ROOT
  let id=""
  var user = localStorage.getItem("appState");
  if(user)
  {
    id=JSON.parse(user).user.id
    console.log('rrrrggg')
    console.log(id)

    getResults(url+"/user/"+id+"/indexPayment",data=>{

      this.setState({
        payments:data.payments,
      })


    })
    console.log(url+"/user/"+id+'/show')
    getResults(url+"/user/"+id+'/show',data=>{
      console.log(data)
      console.log('datrrrrrrrrrra')
      this.setState({
        user:data,

      })

    })


}

}


  // logout = (e) => {
  //   e.preventDefault()
  //   console.log('tessssssssssssssssssssssssssssssssssssssssst')
  //   localStorage.removeItem('appState')
  //   console.log(this.props.history)
  //   this.props.history.push('/')
  //   location.reload()

//   // e.preventDefault();
//   // let url=process.env.MIX_REACT_APP_ROOT
//   //let route = e.target.getAttribute("action");
//   // axios.get(url+"/auth/logout").then(response => {
//   //   localStorage.removeItem('appState');
//   //   this.props.history.push('localhost:8000');
//   // }).catch(error => {
//   //   console.log(error);
//   // })
//   console.log("route ->");
// }

  logOut= (e) => {
    e.preventDefault()
    console.log('/privacy-policy')
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
    this.props.history.push('/privacy-policy');
    window.location.href="/login";

  }
  payments= () => {
    this.props.history.push('/payments');
    window.location.href="/payments";
  }

  render(){
      var username=""
      var userId=""
      var user = localStorage.getItem("appState");
      let currentUser=this.state.user
    console.log('rttt')
    console.log(currentUser)

    if(user){
       username=JSON.parse(user).user.name
       userId=JSON.parse(user).user.id
    }
console.log('this.state')
console.log(this.state)
      return (
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={'avatars/6.jpg'}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong className="text-uppercase">{currentUser?currentUser.name:'username'}</strong>
          </CDropdownItem>
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-bell" className="mfe-2" />*/}
          {/*  Updates*/}
          {/*  <CBadge color="info" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-envelope-open" className="mfe-2" />*/}
          {/*  Messages*/}
          {/*  <CBadge color="success" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-task" className="mfe-2" />*/}
          {/*  Tasks*/}
          {/*  <CBadge color="danger" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-comment-square" className="mfe-2" />*/}
          {/*  Comments*/}
          {/*  <CBadge color="warning" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem*/}
          {/*  header*/}
          {/*  tag="div"*/}
          {/*  color="light"*/}
          {/*  className="text-center"*/}
          {/*>*/}
          {/*  <strong>Settings</strong>*/}
          {/*</CDropdownItem>*/}
          <CDropdownItem>
            <CLink to={`/user/`+userId}  size="sm" className="text-dark"> <CIcon name="cil-user" className="mfe-2" />Profile</CLink>
          </CDropdownItem>
          {/* <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem> */}
          <CDropdownItem >
            <CLink to={`/payments/`}  size="sm" className="text-dark">  <CIcon name="cil-credit-card" className="mfe-2" /> Payments</CLink>



            <CBadge color="secondary" className="mfs-auto">{this.state.payments}</CBadge>
          </CDropdownItem>
          {/* <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
          <CDropdownItem divider />
          <CDropdownItem>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Lock Account
          </CDropdownItem>
          <CDropdownItem onClick={this.logOut}>
            <CIcon name="cil-account-logout" className="mfe-2" />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

export default withRouter(TheHeaderDropdown)
