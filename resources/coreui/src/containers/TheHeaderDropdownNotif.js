import React, {Component} from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Axios from "axios";
import {Link} from "react-router-dom";


export default class TheHeaderDropdownNotif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsCount:5,
      notifications:[]

    }

  }
  redirect=(eventId)=>{

    // return  <Redirect to="/dashboard#/events/add" />;
    window.location.href="/EventDesc/"+eventId

  }
  componentDidMount=()=>{
    const url=process.env.MIX_REACT_APP_ROOT
    if (localStorage.getItem('appState')!= null) {
      const userdata={test: JSON.parse(localStorage["appState"])}
      const id = userdata.test.user.id;
      Axios.get(url+'/getNotificationsByUser/'+id).then(
        Response => {
          this.setState(
            {
              notifications: Response.data.notifications
            }
          )
          console.log(this.state.notifications);
        }
      ).catch(err => console.log(err));
    }
  }

  render() {
  let notifications=this.state.notifications

    return(

      <CDropdown
        inNav
        className="c-header-nav-item mx-2"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <CIcon name="cil-bell"/>
          <CBadge shape="pill" color="danger">{notifications.length}</CBadge>
        </CDropdownToggle>
        <CDropdownMenu  placement="bottom-end" className="pt-0">
          <CDropdownItem
            header
            tag="div"
            className="text-center"
            color="light"
          >
            <strong>You have {notifications.length} notifications</strong>
          </CDropdownItem>
          {notifications.map((notification,i) => {
            return (

                <CDropdownItem onClick={() => this.redirect(notification.event_id)}><CIcon name="cil-user-follow" className="mr-2 text-success" /> {notification.text}</CDropdownItem>



            )
          })
          }


          <CDropdownItem
            header
            tag="div"
            color="light"
          >
          </CDropdownItem>

        </CDropdownMenu>
      </CDropdown>

    )
  }
  }

