import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {FaFacebook, FaGoogle} from "react-icons/fa";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";

import clsx from "clsx";

import styles from "~/pages/Account/Account.module.scss";
import AuthService from "~/services/authServices";

function Login() {
    const {t} = useTranslation()

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
                window.history.back()
            }
            if (response === 403) {
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
            <h1>{t("login-sign in")}</h1>
            <div className={clsx(styles.socialContainer)}>
                <a className={clsx(styles.fbIcons)}><FaFacebook/></a>
                <a className={clsx(styles.ggIcons)}><FaGoogle/></a>
            </div>
            <span>{t("login-account")}</span>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} autoFocus={true} type="text" placeholder={t("login-username")}
                       value={username}
                       onChange={handleUsername}/>
                {existUsername &&
                    <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                    <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}

            </div>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} type="password" placeholder={t("login-password")}
                       value={password}
                       onChange={handlePassword}/>
                {validPassword &&
                    <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                    <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}
            </div>
            <a href="#" className={clsx(styles.hoverTextRed)}>{t("login-forgot")}</a>
            <button type={"button"} className={clsx(styles.hover, {
                [styles.signInButton]: activeSubmit
            })}
                    onClick={handleLogin}>{t("login-login")}
            </button>
        </form>
    )
}

export default Login