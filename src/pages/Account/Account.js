import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import clsx from "clsx";

import styles from "~/pages/Account/Account.module.scss"
import AuthService from "~/services/authServices";
import Register from "~/pages/Account/Register/Register";
import Login from "~/pages/Account/Login/Login";

function Account() {
    const {t} = useTranslation()
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
                            <h1>{t("register-welcome")}</h1>
                            <p>{t("register-instruct")}</p>
                            <button onClick={() => {
                                setActive(false)
                            }
                            } className={clsx(styles.ghost, styles.hover)}>{t("register-sign in")}
                            </button>
                        </div>
                        <div className={clsx(styles.overlayPanel, styles.overlayRight)}>
                            <h1>{t("login-hello")}</h1>
                            <p>{t("login-instruct")}</p>
                            <button onClick={() => {
                                setActive(true)
                            }
                            } className={clsx(styles.ghost, styles.hover)}>{t("login-signup")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account