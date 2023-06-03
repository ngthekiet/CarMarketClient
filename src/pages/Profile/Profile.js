import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"

import UserService from "~/services/userServices";
import config from "~/config";
import token from "~/local/token";
import {Avatar} from "~/assert/images";
import {storage} from "~/firebase"
import Notify from "~/components/Notify";
import Button from "@mui/material/Button";

function Profile() {
    const {id} = useParams()
    const navigate = useNavigate()

    if (localStorage.getItem("userID") !== id)
        navigate("/notfound")

    const {t} = useTranslation()

    const [avatar, setAvatar] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [birthday, setBirthday] = useState(0)
    const [birthyear, setBirthyear] = useState(0)
    const [success, setSuccess] = useState(false)
    const [avatarChange, setAvatarChange] = useState("")

    useEffect(() => {
        setSuccess(false)
        const fetchData = async () => {
            const response = (await UserService.getUser(id))
            if (response?.data) {
                if (response.data.avatar === null)
                    setAvatar(Avatar)
                else
                    setAvatar(response.data.avatar)
                if (response.data.firstname === null)
                    setFirstname("")
                else
                    setFirstname(response.data.firstname)
                if (response.data.lastname === null)
                    setLastname("")
                else
                    setLastname(response.data.lastname)
                if (response.data.email === null)
                    setEmail("")
                else
                    setEmail(response.data.email)
                if (response.data.address === null)
                    setAddress("")
                else
                    setAddress(response.data.address)
                if (response.data.phone === null)
                    setPhone("")
                else
                    setPhone(response.data.phone)
                if (response.data.birthyear === 0)
                    setBirthday(0)
                else
                    setBirthday(response.data.birthyear)
            }
        }
        fetchData()
    }, [success])

    useEffect(() => {
        if (birthday === "" || parseInt(birthday) >= 2200 || parseInt(birthday) <= 0) {
            setBirthyear(0)
            return
        }
        setBirthyear(parseInt(birthday))
    }, [birthday])

    const handleFirstname = (e) => {
        setFirstname(e.target.value)
    }

    const handleLastname = (e) => {
        setLastname(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleAddress = (e) => {
        setAddress(e.target.value)
    }

    const handlePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleBirthday = (e) => {
        setBirthday(e.target.value)
    }

    const handleSave = async () => {
        if (token() === "") {
            Notify.notifyError("Cập nhật không thành công")
            return
        }

        try {
            await UserService.updateProfile(id, address, birthyear, email, firstname, lastname, phone)
            Notify.notifySuccess("Cập nhật thành công")
            setSuccess(true)
        } catch (error) {
            Notify.notifyError("Cập nhật không thành công")
        }
    }

    const changeAvatar = async () => {
        if (avatarChange === "") {
            Notify.notifyError("Cập nhật không thành công")
            return
        }
        const imageRef = ref(storage, `images/avatar/${avatarChange.name + v4()}`)
        const imageResponse = await uploadBytes(imageRef, avatarChange)
        const response = await getDownloadURL(imageResponse.ref)
        await UserService.changeAvatar(response, id)
        setAvatar(response)
        localStorage.setItem("avatar", response)
        setAvatarChange("")
        Notify.notifySuccess("Cập nhật thành công")
        setSuccess(true)
    }

    return (
        <div className="container mx-auto w-6/12 pt-2 pb-10 ">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{t("profile-profile")}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        {t("profile-content profile")}
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("profile-photo")}
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <img src={avatar} className="m-0 mt-2 h-12 w-12 text-gray-300 rounded-full" alt={""}/>
                                <input onChange={(e) => {
                                    setAvatarChange(e.target.files[0])
                                }
                                } type={"file"}/>
                                <Button onClick={changeAvatar} variant={"outlined"}>
                                    {t("profile-change")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{t("profile-info")}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{t("profile-content info")}</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("profile-firstname")}
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleFirstname}
                                    value={firstname}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="indent-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("profile-lastname")}
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleLastname}
                                    value={lastname}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="indent-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("profile-email")}
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleEmail}
                                    value={email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="indent-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="street-address"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                {t("profile-address")}
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleAddress}
                                    value={address}
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autoComplete="street-address"
                                    className="indent-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("profile-phone")}
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handlePhone}
                                    value={phone}
                                    type="text"
                                    name="phone-number"
                                    id="phone-number"
                                    autoComplete="given-name"
                                    className="indent-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("profile-birthday")}
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleBirthday}
                                    value={birthday}
                                    type="number"
                                    min={0}
                                    max={2200}
                                    name="birthday"
                                    id="birthday"
                                    autoComplete="family-name"
                                    className="indent-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to={config.routes.home}>
                    <Button variant={"outlined"} color={"error"}>{t("profile-cancel")}</Button>
                </Link>
                <Button onClick={handleSave} variant={"contained"}>{t("profile-save")}</Button>
            </div>
        </div>
    )
}

export default Profile
