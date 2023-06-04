import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {FaFacebook, FaGoogle} from "react-icons/fa";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";

import styles from "~/pages/Account/Account.module.scss";
import AuthService from "~/services/authServices";
import ValidService from "~/services/validServices";
import Notify from "~/components/Notify";

function Register() {
    const {t} = useTranslation()
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
            try {
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
            } catch (error) {
                console.log(error)
                Notify.notifyError(t("loadfail"))
            }
        }
        fetchData()
    }, [username])

    useEffect(() => {
        const fetchData = async () => {
            try {
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
            } catch (error) {
                console.log(error)
                Notify.notifyError(t("loadfail"))
            }
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
        try {
            if (!activeSubmit) {
                const response = await AuthService.register(username, password)
                if (response?.data) {
                    navigate("/")
                    Notify.notifySuccess(t("registersuccess"))
                }
            }
        } catch (error) {
            console.log(error)
            Notify.notifyError(t("loadfail"))
        }
    }

    const handleSubmit = (e) => {
        if (e.key === 'Enter')
            handleRegister()
    }

    return (
        <form action="#">
            <h1>{t("register-create")}</h1>
            <div className={clsx(styles.socialContainer)}>
                <a href="#" className={clsx(styles.fbIcons)}><FaFacebook/></a>
                <a href="#" className={clsx(styles.ggIcons)}><FaGoogle/></a>
            </div>
            <span>{t("register-account")}</span>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} type="text" placeholder={t("register-username")}
                       value={username}
                       onChange={handleUsername}/>
                {acceptUsername &&
                    <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                    <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}
            </div>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} type="password" placeholder={t("register-password")}
                       value={password}
                       onChange={handlePassword}/>
                {validPassword &&
                    <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                    <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}
            </div>
            <div className={clsx(styles.box)}>
                <input onKeyDown={handleSubmit} type="password" placeholder={t("register-confirm")}
                       value={confirmPassword}
                       onChange={handleConfirmPassword}/>
                {validConfirmPassword &&
                    <span className={clsx(styles.colorGreen)}><AiFillCheckCircle/></span> ||
                    <span className={clsx(styles.colorRed)}><AiFillCloseCircle/></span>}
            </div>
            <button type={"button"} className={clsx(styles.hover, {
                [styles.signInButton]: activeSubmit
            })}
                    onClick={handleRegister}>{t("register-signup")}
            </button>
        </form>
    )
}

export default Register