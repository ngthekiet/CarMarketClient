import React, { Component } from 'react';
import './Account.css';
import Register from './register/Register';
import Login from './login/Login';

class Account extends Component {
    render() {
        return (
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Login #07</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <Login />
                                <Register />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Account;