import clsx from "clsx";
import styles from "../Account.module.scss";
import {FaFacebook, FaGoogle} from "react-icons/fa";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import AuthService from "../../../services/authServices";
import {useEffect, useState} from "react";
import ValidService from "../../../services/validServices";
import {useNavigate} from "react-router-dom";

function Register() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [acceptUsername, setAcceptUsername] = useState(false)
    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [validConfirmPassword, setValidConfirmPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [activeSubmit, setActiveSubmit] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (username !== "") {
                const exist = await AuthService.checkUsername(username)
                const valid = await ValidService.validUsername(username)
                if (exist?.data === false && valid?.data === true) {
                    setAcceptUsername(true)
                }
                if (exist?.data === true || valid?.data === false) {
                    setAcceptUsername(false)
                }
                return
            }
            setAcceptUsername(false)
        }
        fetchData()
    }, [username])

    useEffect(() => {
        const fetchData = async () => {
            if (password !== "") {
                const response = await ValidService.validPassword(password)
                if (response?.data === true) {
                    setValidPassword(true)
                    return
                }
                setValidPassword(false)
                return
            }
            setValidPassword(false)
        }
        fetchData();
    }, [password])

    useEffect(() => {
        if (confirmPassword !== "") {
            if (password === confirmPassword) {
                setValidConfirmPassword(true)
                return
            }
            setValidConfirmPassword(false)
            return;
        }
        setValidConfirmPassword(false)

    }, [password, confirmPassword])

    useEffect(() => {
        if (acceptUsername && validConfirmPassword) {
            setActiveSubmit(false)
            return
        }
        setActiveSubmit(true)
    }, [acceptUsername, validConfirmPassword])

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleRegister = async () => {
        if (!activeSubmit) {
            const response = await AuthService.register(username, password)
            if (response?.data) {
                console.log(response.data.token)
                navigate("/")
            }
            if (response === 403) {
                console.log('khong co quyen truy cap')
                setPassword("")
                setConfirmPassword("")
            }
        }
    }

    const handleSubmit = (e) => {
        if (e.key === 'Enter')
            handleRegister()
    }

    return (
        <form action="#">
            <h1>Create Account</h1>
            <div className={clsx(styles.socialContainer)}>
                <a href="#" className={clsx(styles.fbIcons)}><FaFacebook/></a>
                <a href="#" className={clsx(styles.ggIcons)}><FaGoogle/></a>
            </div>
            <span>or use your email for registration</span>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} type="text" placeholder="Username"
                       value={username}
                       onChange={handleUsername}/>
                {acceptUsername &&
                    <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                    <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}
            </div>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} type="password" placeholder="Password"
                       value={password}
                       onChange={handlePassword}/>
                {validPassword &&
                    <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                    <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}
            </div>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} type="password" placeholder="Confirm Password"
                       value={confirmPassword}
                       onChange={handleConfirmPassword}/>
                {validConfirmPassword &&
                    <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                    <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}
            </div>
            <button type={"button"} className={clsx(styles.hover, {
                [styles.signInButton]: activeSubmit
            })}
                    onClick={handleRegister}>Sign Up
            </button>
        </form>
    )
}

export default Register