import React,{Component} from 'react';
import img from '../../../../public/assets/img/images.jpeg';
import axios from "axios";
import { Redirect } from 'react-router';
import {CCard} from "@coreui/react";


export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            name: '',
            email: '',
            message: '',
            redirect: false,
            showMessage: false,

            user_id: '',
            event_id: '',

        }

    }
    componentDidMount() {
        const userdata={test: JSON.parse(localStorage["appState"])}
        const id = userdata.test.user.id;

        this.setState({
            user_id: id,
        });
    }

    nameChange =  e => {

        this.setState({

            name: e.target.value
        });
    }
    emailChange =  e => {

        this.setState({

           email: e.target.value
        });
    }
    msgChange = e => {

        this.setState({

            message: e.target.value
        });
    }
    handleSubmit=(e)=> {
        e.preventDefault();
        console.log(this.state)
        console.log('submiiiit')
        let id=this.props.event.id;
        console.log(id)
        console.log('id')


        const {name, email, message,event_id,user_id} = this.state;
        const values = {name, email, message,event_id,user_id};

        axios.post('/api/comment/new',{
            data: {
                name: values.name,
                email: values.email,
                message: values.message,
                event_id: id,
                user_id: values.user_id,
            }


        }).then(() => {
            this.setState({ showMessage: true,redirect:true })
        })
            .then(Response =>{
                this.setState({
                    name: '',
                    email: '',
                    message: '',

                })
            }).catch(err => console.log(err));
        console.log('error create comment')
    }


    render() {

let id=this.props.event.id
    if(this.state.redirect) {
        return(
        <div className="mb-4 offset-3 col-6 text-center alert alert-success" >Merci pour votre commentaire !</div>)
        // <Redirect to={"/EventDesc/" + id} />;
    }
        return (
            <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins" style={{ backgroundImage: `url(${img})` }}>
                <div className="wrapper wrapper--w680">
                    <div className="card card-4">
                    <div className="card-body">
                        <h2 className="titleComment text-center">Add a Comment</h2>
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <div className="row row-space">
                                <div className="col-6">
                                    <div className="input-group">
                                        <label className="label">Name*</label>
                                        <input className="input--style-4" type="text" name="name" onChange={this.nameChange}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <label className="label">Email*</label>
                                        <input className="input--style-4" type="email" name="email" onChange={this.emailChange}/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input-group">
                                    <label className="label">Comment*</label><br/>
                                    <textarea className="input--style-4" name="message" cols={90} onChange={this.msgChange}/>
                                </div>
                            </div>
                            <div className="p-t-15">
                                <button className="btn btn-primary btn-block" type="submit" >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                        </div>
                    </div>

             )
        }
    }
