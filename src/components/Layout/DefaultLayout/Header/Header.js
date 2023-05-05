import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {FaUserCircle, FaShoppingBag, FaCog, FaTools} from "react-icons/fa"
import {IoMdLogOut} from "react-icons/io"

import clsx from "clsx";

import styles from "~/components/Layout/DefaultLayout/Header/Header.module.scss"
import Search from "~/components/Layout/DefaultLayout/Header/Search";
import AuthService from "~/services/authServices";
import config from "~/config";
import {Avatar, Logo, Usa, Vn} from "~/assert/images"


function Header() {

    const [activeOptionUser, setActiveOptionUser] = useState(false);
    const [avatar, setAvatar] = useState("")
    const [id, setID] = useState("")

    const logged = AuthService.logged();

    useEffect(() => {
        if (AuthService.logged()) {
            setID(localStorage.getItem('userID'))
            if (localStorage.getItem('avatar') === "null") {
                setAvatar(Avatar)
                return
            }
            setAvatar(localStorage.getItem('avatar'))
        }
    }, [logged])

    const handleClickUser = () => {
        if (!AuthService.logged()) {
            setActiveOptionUser(false)
            return
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
    }
    return (
        <div onMouseLeave={handleMouseLeave} className={clsx(styles.container)}>
            <nav className={clsx(styles.navbar)}>
                <div className={clsx(styles.navbarLeft)}>
                    <div>
                        <Link to={config.routes.home}>
                            <img className={clsx(styles.logo)} src={Logo}/>
                        </Link>
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
                    <Search/>
                    <div className={clsx(styles.tools)}>
                        <div className={clsx(styles.tool)}>
                            <div className={clsx(styles.linkIcon, styles.optionUserParent)}>
                                <div onClick={handleClickUser}
                                     className={clsx(styles.linkIcon, styles.toolIcon)}>{(logged &&
                                        <img className={clsx(styles.avatar)} src={avatar}/>) ||
                                    <Link to={config.routes.account}><FaUserCircle/></Link>}</div>
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
                                        <Link to={config.routes.account} onClick={logout}>
                                            <IoMdLogOut/><span>Logout</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <a className={clsx(styles.linkIcon, styles.toolIcon)}><FaShoppingBag/></a>
                        </div>
                        <div className={clsx(styles.language)}>
                            <a className={clsx(styles.linkIcon)} href={""}><img className={clsx(styles.languageIcon)}
                                                                                src={Vn}/></a>
                            <a className={clsx(styles.linkIcon)} href={""}><img className={clsx(styles.languageIcon)}
                                                                                src={Usa}/></a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header