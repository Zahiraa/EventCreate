import React, { Component } from "react";

import axios from "axios";
import {getResults} from "../../services";
import PayWithPayPal from "./PayWithPayPal";

class TicketType extends Component {
    state = {
        event:"",
        ticket:"",
        paidFor:"",
        error:"",
        isCheckout: true
    };

  componentWillMount() {
      const url=process.env.MIX_REACT_APP_ROOT
      let event=this.props.match.params.event
      let type=this.props.match.params.type
      getResults(url+'/events/'+event,data=>{

          this.setState({ event:data.event}, function() {

          });

      })
      getResults(url + '/findTicket/' + type,data=>{

          this.setState({ticket:data.ticket}, function() {

          });

      })

  }


    render() {
        const{event,ticket}=this.state
        if (this.state.isCheckout) {
            return (
                <PayWithPayPal
                    total={ticket.price}
                    ticket={ticket}
                    items={event}
                />
            )
        }
    }
}

export default TicketType;
