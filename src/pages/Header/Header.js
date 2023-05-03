import {useEffect, useState} from "react";
import {FaUserCircle, FaShoppingBag, FaCog, FaTools, FaSearch} from "react-icons/fa"
import {IoMdLogOut} from "react-icons/io"
import {Link, useNavigate} from "react-router-dom";

import clsx from "clsx";
import styles from "./Header.module.scss"

import AuthService from "../../services/authServices";


function Header() {

    const [activeOptionUser, setActiveOptionUser] = useState(false);
    const [avatar, setAvatar] = useState("")
    const [id, setID] = useState("")
    const navigate = useNavigate()

    const logged = AuthService.logged();

    useEffect(() => {
        if (AuthService.logged()) {
            setID(localStorage.getItem('userID'))
            if (localStorage.getItem('avatar') === "null") {
                setAvatar('assert/images/avatar.png')
                return
            }
            setAvatar(localStorage.getItem('avatar'))
        }
    }, [])

    const handleClickUser = () => {
        if (!AuthService.logged()) {
            navigate("account")
            return;
        }
        if (activeOptionUser) {
            setActiveOptionUser(false)
            return
        }
        setActiveOptionUser(true)
    }

    const handleMouseLeave = () => {
        setActiveOptionUser(false)
    }

    const logout = () => {
        AuthService.logout()
        navigate("account")
    }
    return (
        <div onMouseLeave={handleMouseLeave} className={clsx(styles.container)}>
            <nav className={clsx(styles.navbar)}>
                <div className={clsx(styles.navbarLeft)}>
                    <div>
                        <a href={""}><img className={clsx(styles.logo)} src={"assert/images/logo.png"}/></a>
                    </div>
                    <ul>
                        <li>
                            <a href={""}>New Cars</a>
                        </li>
                        <li>
                            <a href={""}>Used Cars</a>
                        </li>
                        <li>
                            <a href={""}>Reviews</a>
                        </li>
                        <li>
                            <a href={""}>New</a>
                        </li>
                    </ul>
                </div>
                <div className={clsx(styles.navbarRight)}>
                    <div className={clsx(styles.search)}>
                        <div className={clsx(styles.containerSearch)}>
                            <input placeholder={"Search"} className={clsx(styles.boxSearch)} type={"text"}/>
                            <span><FaSearch/></span>
                        </div>
                        <div className={clsx(styles.listSearch)}>
                            <div className={clsx(styles.searchItem)}>
                                <div>
                                    <img
                                        src={"https://assets.ucars.sg/image/upload/c_fit,f_auto,w_1080/v1/s3/images/12956055851658307204616.PNG"}
                                    />
                                </div>
                                <span>BMW X3</span>
                            </div>
                            <div className={clsx(styles.searchItem)}>
                                <div>
                                    <img
                                        src={"https://assets.ucars.sg/image/upload/c_fit,f_auto,w_1080/v1/s3/images/12956055851658307204616.PNG"}
                                    />
                                </div>
                                <span>BMW X3</span>
                            </div>
                            <div className={clsx(styles.searchItem)}>
                                <div>
                                    <img
                                        src={"https://assets.ucars.sg/image/upload/c_fit,f_auto,w_1080/v1/s3/images/12956055851658307204616.PNG"}
                                    />
                                </div>
                                <span>BMW X3</span>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.tools)}>
                        <div className={clsx(styles.tool)}>
                            <div className={clsx(styles.linkIcon, styles.optionUserParent)}>
                                <a onClick={handleClickUser}
                                   className={clsx(styles.linkIcon, styles.toolIcon)}>{(logged &&
                                        <img className={clsx(styles.avatar)} src={avatar}/>) ||
                                    <FaUserCircle/>}</a>
                                <ul className={clsx(styles.optionUser, {
                                    [styles.activeOptionUser]: activeOptionUser
                                })}>
                                    <li>
                                        <Link to={""}>
                                            <FaTools/><span>Manage</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/profile/${id}`}>
                                            <FaCog/><span>Setting</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <a onClick={logout}><IoMdLogOut/><span>Logout</span></a>
                                    </li>
                                </ul>
                            </div>
                            <a className={clsx(styles.linkIcon, styles.toolIcon)}><FaShoppingBag/></a>
                        </div>
                        <div className={clsx(styles.language)}>
                            <a className={clsx(styles.linkIcon)} href={""}><img className={clsx(styles.languageIcon)}
                                                                                src={"assert/images/vn.png"}/></a>
                            <a className={clsx(styles.linkIcon)} href={""}><img className={clsx(styles.languageIcon)}
                                                                                src={"assert/images/usa.png"}/></a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header