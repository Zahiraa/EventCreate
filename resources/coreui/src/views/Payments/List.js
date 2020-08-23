import React, {Component} from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CLink
} from '@coreui/react'
import Axios from 'axios';
import {indexEvents} from "../../../../js/services";

export default class List extends Component
{

    constructor(props){
        super(props)
        this.state={
            payments:[]
        }
    }

    componentDidMount=()=>{
        const url=process.env.MIX_REACT_APP_ROOT
        const userdata={test: JSON.parse(localStorage["appState"])}
        const id = userdata.test.user.id;
        Axios.get(url+'/payments/'+id).then(
            Response => {
                this.setState(
                    {
                        payments: Response.payments
                    }
                )
                console.log(this.state.events);
            }
        ).catch(err => console.log(err));
    }

    getBadge = status => {
        switch (status) {
            case 1 : return 'success'
            case 0 : return 'secondary'
        }
    }


    fields = ['event', 'price','dateEvent', 'datePayment','status']

    render() {

        return(

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Payments Liste
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={this.state.payments}
                                fields={this.fields}
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={10}
                                pagination
                                scopedSlots = {{
                                    'status':
                                        (item)=>(
                                            <td>
                                                <CBadge color={this.getBadge(item.status)}>
                                                    {item.status}
                                                </CBadge>
                                            </td>
                                        ),

                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}
