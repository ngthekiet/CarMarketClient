import clsx from "clsx";
import styles from "../Account.module.scss";
import {FaFacebook, FaGoogle} from "react-icons/fa";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import AuthService from "../../../services/authServices";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [existUsername, setExistUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [activeSubmit, setActiveSubmit] = useState(true)

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

    const handleSubmit = (e) => {
        if (e.key === 'Enter')
            handleLogin()
    }
    return (
        <form>
            <h1>Sign in</h1>
            <div className={clsx(styles.socialContainer)}>
                <a href="#" className={clsx(styles.fbIcons)}><FaFacebook/></a>
                <a href="#" className={clsx(styles.ggIcons)}><FaGoogle/></a>
            </div>
            <span>or use your account</span>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} autoFocus={true} type="text" placeholder="Username"
                       value={username}
                       onChange={handleUsername}/>
                {existUsername &&
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
            <a href="#" className={clsx(styles.hoverTextRed)}>Forgot your password?</a>
            <button type={"button"} className={clsx(styles.hover, {
                [styles.signInButton]: activeSubmit
            })}
                    onClick={handleLogin}>Sign In
            </button>
        </form>
    )
}

export default Login