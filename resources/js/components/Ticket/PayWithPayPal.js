import React, { useState, useEffect, useRef } from 'react'
import HeaderTemplate from "../HeaderTemplate";
import {Link} from "react-router-dom";
import img from "../../../../public/assets/img/event1.jpg";


function PayWithPayPal (props) {
    const { items, total,ticket } = props
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    const url=process.env.MIX_REACT_APP_ROOT
    const propss = useRef(props);

    if(items.critere) {
        var seat = Math.floor(Math.random() * (parseInt(items.critere.limite_places) - 1 + 1)) + 1;
    }
    useEffect(() => {
        if(props.total) {
            window.paypal
                .Buttons({

                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                description: items.title,
                                amount: {
                                    currency_code: 'USD',
                                    value: props.total ? parseInt(props.total) : "10.00",
                                }
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        setPaidFor(true);
                        console.log('ORDER', order);
                    },
                    onError: err => {
                        setError(err);
                        console.error('ERROR', err);
                    },
                })
                .render(paypalRef.current);
        }
    }, [props]);
    let idUser=1
    if (localStorage.getItem('appState')!= null) {
        const userdata = {test: JSON.parse(localStorage["appState"])}
         idUser = userdata.test.user.id;
    }
    if (paidFor) {
        const customerSignup={
            'event':items.id,
            'ticket':ticket.id,
            'user':idUser,
            'status':1
        }
        axios.post(url+'/payment/pay', customerSignup)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        return (


            <div className="container" style={{marginTop: 300}}>
                <div className="row">
                    <div className="offset-1 col-10 alert alert-success text-capitalize" style={{padding: 30}}>
                        Felicitation, transaction terminée avec success. Rendez-vous le <strong>{items.date}</strong> a la place <strong>{items.place}</strong> Soyez le bienvenue
                        <br/> <br/>  <Link to={"/"} ><p className="text-uppercase">Retour au site</p></Link>
                    </div>
                </div>
            </div>

        )

    }

    if (error) {

        const customerSignup={
            'event':items.id,
            'ticket':ticket.id,
            'user':1,
            'status':0
        }
        axios.post(url+'/payment/pay', customerSignup)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        return (
            <div className="container" style={{marginTop: 300}}>
                <div className="row">
                    <div className="offset-1 col-10 alert alert-danger" style={{padding: 30}}>
                        Error in processing order. Please Retry again
                        <br/> <br/>  <Link to={"/"} ><p className="text-uppercase">Retour au site</p></Link>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div>



        <div className="site-section bg-light">
            <div className="container containerTicket">
                <div className="row">
                    <div className="col-md-6 col-lg-6 mb-5 text-white" data-aos="fade-up" data-aos-delay="100"><Link to={"/"}>Home</Link> /  <Link to={"/EventDesc/"+items.id}>{items.title}</Link> / Payment </div>
                </div>
                <div className="row">


                    <div className="col-md-6 col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">

                        <div className="alert alert-secondary text-uppercase text-center">Vous êtes sur le point de reçevoir votre ticket pour participer a l'évenement  <br/><strong> {items.title} </strong>qui aura lieu le <strong>{items.date} </strong>



                        </div>
                        <div className="alert alert-secondary text-uppercase text-center">
                            <h4 className="text-left"> {items.title}</h4>
                            <p className="text-left text-lowercase"><em> {items.description}</em></p>
                        </div>
                    </div>
                    <div className=" col-md-5 col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">
                    <div className="containerr">
                        <section className="sectionTicket">
                            <div className="left">
                                <div className="event">Live in concert</div>
                                <div className="title">{items.title}  - {total} $</div>
                                <div className="infoo" style={{marginBottom:10,color:"#F5A623"}}>{ticket.name}</div>
                                <div className="infoo">Saturday //{items.date} //{items.place}</div>

                            </div>
                            <div className="right font-weight-bold">
                                <div className="seats">section<span>A</span></div>
                                <div className="seats">row<span>13</span></div>

                               <div className="seats">seat<span>
                                   {seat}
                               </span>
                               </div>
                            </div>
                        </section>
                    </div>
                    </div>
                </div>


                    <div className="offset-2 col-md-12 col-lg-10 mb-5" data-aos="fade-up" data-aos-delay="100">


                        <div ref={paypalRef} />
                    </div>


            </div>
        </div>
    </div>

    )
}

export default PayWithPayPal
