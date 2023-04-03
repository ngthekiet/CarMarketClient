import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                <div className="text w-100">
                    <h2>Welcome to login</h2>
                    <p>Don't have an account?</p>
                    <a href="#" className="btn btn-white btn-outline-white">
                        Sign Up
                    </a>
                </div>
            </div>
        );
    }
}

export default Register;