import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import clsx from "clsx";
import styles from "./Account.module.scss"

import AuthService from "../../services/authServices";
import Register from "./Register/Register";
import Login from "./Login/Login";

function Account() {
    const [active, setActive] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (AuthService.logged())
            navigate("/")
    }, [])
    return (
        <div className={clsx(styles.accountBody)}>
            <div className={clsx(styles.container, {
                [styles.rightPanelActive]: active
            })}>
                <div className={clsx(styles.formContainer, styles.signUpContainer)}>
                    <Register/>
                </div>
                <div className={clsx(styles.formContainer, styles.signInContainer)}>
                    <Login/>
                </div>
                <div className={clsx(styles.overlayContainer)}>
                    <div className={clsx(styles.overlay)}>
                        <div className={clsx(styles.overlayPanel, styles.overlayLeft)}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button onClick={() => {
                                setActive(false)
                            }
                            } className={clsx(styles.ghost, styles.hover)}>Sign In
                            </button>
                        </div>
                        <div className={clsx(styles.overlayPanel, styles.overlayRight)}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button onClick={() => {
                                setActive(true)
                            }
                            } className={clsx(styles.ghost, styles.hover)}>Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account