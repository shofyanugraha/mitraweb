import React, {Component, Fragment} from 'react';
import { Textbox, Radiobox } from 'react-inputs-validation';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import axios from 'axios';

import Modal from './../../../UI/Modal/Modal';

import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import "./DatePicker.css";


import './Register.css';

class Register extends Component{
    state = {
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: new Date(),
        phone: '',
        sex: 100,
        hasFirstNameError: true,
        hasLastNameError: true,
        hasPhoneError: true,
        hasEmailError: true,
        enableButton: false,
        processRegister: false,
        responseData: null
    }


    checkInput = () => {
        const { hasFirstNameError, hasLastNameError, hasEmailError, hasPhoneError} = this.state;
        if(!hasFirstNameError && !hasLastNameError && !hasEmailError && !hasPhoneError) {
            this.setState({enableButton: true});
        }
    }

    postDataHandler = () => {
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            date_of_birth: this.state.date_of_birth,
            phone: this.state.phone,
            sex: this.state.sex,
        };
        this.setState({processRegister:true, enableButton:false});
        axios.post( 'https://mitraistest.herokuapp.com/register', data )
            .then( response => {
                this.setState({responseData: response.data});
            } ).catch(error => {
                this.setState({responseData: error.response.data});
            });
    }
    
    render () {
        const sexString = this.state.sex === 100 ? 'male' : 'female';
        
        let modalMessage = (
            <div>Process Register</div>
        );
            if(this.state.responseData !== null) {
                if(!this.state.responseData.meta.status){
                    const errorData = {
                        ...this.state.responseData.meta.error
                    };
                    const dataError = Object.keys(this.state.responseData.meta.error).map((error, key)=>{
                        return <li key={error + key}>{errorData[error]}</li>;
                    });
                    modalMessage = (
                        <Fragment>
                            <h4 style={{
                                textAlign: 'center',
                                color: 'red'
                            }}>Oops Sorry</h4>
                            <ul>
                                { dataError }
                            </ul>
                        </Fragment>
                    );
                } else {
                    modalMessage = (
                        <Fragment>
                            <h4 style={{
                                textAlign: 'center',
                                color: 'red'
                            }}>Register Berhasil</h4>
                            <Link className="btn" to="/login">Login</Link>
                        </Fragment>
                    )   
                }
            }
            
        
        return (
            <Fragment>
                <section className="Register">
                    <Modal show={ this.state.processRegister } hide={ this.updatePurchasingCancelState }>
                        {modalMessage}
                    </Modal>
                    <h3>Registration</h3>
                    <div className="form-group">
                        <label>Mobile Phone</label>
                        <Textbox
                            className="form-control"
                            name="phone" 
                            type="text" 
                            value={ this.state.phone } 
                            placeholder="Input your Phone" 
                            onChange={ (phone, e) => {
                                this.setState({ phone });
                            }} 
                            onBlur={()=>{}} 
                            validationOption={{
                                name: 'Phone', 
                                check: true,
                                required: true,
                                reg: /^[0-9+]+$/,
                                regMsg: 'No telpon tidak sesuai dengan format indonesia'
                            }}
                            validationCallback={res => {
                                this.setState({
                                  hasPhoneError: res
                                });
                                this.checkInput();
                            }}/>
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <Textbox
                            className="form-control"
                            name="first_name" 
                            type="text" 
                            value={ this.state.first_name } 
                            placeholder="Input your First Name" 
                            onChange={ (first_name, e) => {
                                this.setState({first_name});
                            }} 
                            onBlur={()=>{}} 
                            validationOption={{
                                name: 'First Name', 
                                check: true,
                                required: true
                            }}
                            validationCallback={res =>{
                                this.setState({
                                  hasFirstNameError: res
                                });
                                this.checkInput();
                              }}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <Textbox
                            className="form-control"
                            name="last_name" 
                            type="text" 
                            value={ this.state.last_name } 
                            placeholder="Input your Last Name" 
                            onChange={ (last_name, e) => {
                                this.setState({ last_name });
                            }} 
                            onBlur={()=>{}} 
                            validationOption={{
                                name: 'Last Name', 
                                check: true,
                                required: true
                            }}
                            validationCallback={res =>{
                                this.setState({
                                  hasLastNameError: res
                                });
                                this.checkInput();
                              }}/>
                    </div>
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <DatePicker
                            className="form-control"
                            placeholderText="Input your date of birth"
                            selected={this.state.date_of_birth}
                            onChange={(date) => {
                                this.setState({
                                    date_of_birth: date
                                });
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Sex</label>
                        <Radiobox 
                            value={ sexString }
                            name="sex"
                            optionList={[
                                {id: 'male', name : 'male'},
                                {id: 'female', name : 'female'}
                            ]} 
                            customStyleContainer={{
                                display: 'flex',
                                justifyContent: 'flex-start'
                              }}
                            customStyleOptionListItem={{ marginRight: '20px' }}
                            onChange={(sex, e)=>{

                                let sexed;
                                switch(sex){
                                    case 'male':
                                        sexed = 100;
                                        break;
                                    case 'female':
                                        sexed = 200;
                                        break;
                                    default:
                                        sexed = 100;
                                }
                                    
                                this.setState({
                                    sex: sexed
                                })
                            }} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Textbox
                            name="email" 
                            type="text" 
                            value={ this.state.email } 
                            placeholder="Input your Email" 
                            onChange={ (email, e) => {
                                this.setState({ email });
                            }} 
                            onBlur={()=>{}} 
                            validationOption={{
                                name: 'Email', //Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                                check: true, //Optional.[Bool].Default: true. To determin if you need to validate.,
                                required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                                customFunc: email => {
                                  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                  if (reg.test(String(email).toLowerCase())) {
                                    return true;
                                  } else {
                                    return 'is not a valid email address';
                                  }
                                }   
                              }}
                            validationCallback={res => {
                                this.setState({
                                  hasEmailError: res
                                });
                                this.checkInput();
                              }}/>
                    </div>
                    <div className="form-group" style={{
                        textAlign:"center"
                    }}>
                        <button className="btn" disabled={!this.state.enableButton} onClick={ this.postDataHandler }>Register</button>
                    </div>
                    
                    

                </section>
               
            </Fragment>
        )
    }
}

export default Register;