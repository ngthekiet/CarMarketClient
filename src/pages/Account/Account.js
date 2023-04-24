import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FaFacebook, FaGoogle} from "react-icons/fa";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai"

import clsx from "clsx";
import styles from "./Account.module.scss"

import AuthService from "../../services/authServices";

function Account() {
    const [active, setActive] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [existUsername, setExistUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [activeSubmit, setActiveSubmit] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (AuthService.logged())
            navigate("/")
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = (await AuthService.checkUsername(username))
            if (response?.data === false) {
                setExistUsername(false)
            }
            if (response?.data === true) {
                setExistUsername(true)
            }
        }
        fetchData()
    }, [username])

    useEffect(() => {
        const fetchData = async () => {
            const response = (await AuthService.checkPassword(username, password))
            if (response?.data === false) {
                setValidPassword(false)
            }
            if (response?.data === true) {
                setValidPassword(true)
            }
        }
        fetchData()
    }, [username, password])

    useEffect(() => {
        if (existUsername && validPassword) {
            setActiveSubmit(false)
            return
        }
        setActiveSubmit(true)
    }, [existUsername, validPassword])

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        if (!activeSubmit) {
            const response = await AuthService.login(username, password)
            if (response?.data) {
                console.log(response.data.token)
                navigate("/")
            }
            if (response === 403) {
                console.log('khong co quyen truy cap')
                setPassword("")
            }
        }
    }

    const handleSubmitLogin = (e) => {
        if (e.key === 'Enter')
            handleLogin()
    }

    return (
        <div className={clsx(styles.accountBody)}>
            <div className={clsx(styles.container, {
                [styles.rightPanelActive]: active
            })}>
                <div className={clsx(styles.formContainer, styles.signUpContainer)}>
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className={clsx(styles.socialContainer)}>
                            <a href="#" className={clsx(styles.fbIcons)}><FaFacebook/></a>
                            <a href="#" className={clsx(styles.ggIcons)}><FaGoogle/></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <input type="password" placeholder="Confirm Password"/>
                        <button className={clsx(styles.hover)}>Sign Up</button>
                    </form>
                </div>
                <div className={clsx(styles.formContainer, styles.signInContainer)}>
                    <form>
                        <h1>Sign in</h1>
                        <div className={clsx(styles.socialContainer)}>
                            <a href="#" className={clsx(styles.fbIcons)}><FaFacebook/></a>
                            <a href="#" className={clsx(styles.ggIcons)}><FaGoogle/></a>
                        </div>
                        <span>or use your account</span>
                        <div className={clsx(styles.box)}>
                            <input onKeyDown={handleSubmitLogin} autoFocus={true} type="text" placeholder="Username"
                                   value={username}
                                   onChange={handleUsername}/>
                            {existUsername && <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                                <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}

                        </div>
                        <div className={clsx(styles.box)}>
                            <input onKeyDown={handleSubmitLogin} type="password" placeholder="Password" value={password}
                                   onChange={handlePassword}/>
                            {validPassword && <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                                <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}
                        </div>
                        <a href="#" className={clsx(styles.hoverTextRed)}>Forgot your password?</a>
                        <button type={"button"} className={clsx(styles.hover, {
                            [styles.signInButton]: activeSubmit
                        })}
                                onClick={handleLogin}>Sign In
                        </button>
                    </form>
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