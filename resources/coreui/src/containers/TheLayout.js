import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { Switch, Route, Redirect } from 'react-router-dom';

const TheLayout = () => {
  const userdata={test: JSON.parse(localStorage["appState"])}
  return (
    userdata.test.isLoggedIn===true ?
    <>
    
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
    
    
    </>: 
    window.location.href="/"
  )
}

export default TheLayout
