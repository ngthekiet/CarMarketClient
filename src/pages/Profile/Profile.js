import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

import clsx from "clsx";

import styles from "~/pages/Profile/Profile.module.scss"
import UserService from "~/services/userServices";
import config from "~/config";
import token from "~/local/token";
import {Avatar} from "~/assert/images";

function Profile() {
    const {id} = useParams()

    const [avatar, setAvatar] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [birthday, setBirthday] = useState(0)
    const [birthyear, setBirthyear] = useState(0)
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)

    useEffect(() => {
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
            setFail(true)
            setTimeout(() => {
                setFail(false)
            }, 1000)
            return
        }

        try {
            await UserService.updateProfile(id, address, avatar, birthyear, email, firstname, lastname, phone)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 1000)
        } catch (error) {
            setFail(true)
            setTimeout(() => {
                setFail(false)
            }, 1000)
        }
    }

    return (
        <div className="container mx-auto w-6/12 pt-2 pb-10 ">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <img src={avatar} className="h-12 w-12 text-gray-300 rounded-full"/>
                                <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive
                        mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
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
                                Last name
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
                                Email address
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
                                Address
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
                                Number phone
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
                                Birthday
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
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                </Link>
                <button onClick={handleSave}
                        type="button"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
            <div className={clsx(styles.notify, styles.success, {
                [styles.active]: success
            })}>
                Success
            </div>
            <div className={clsx(styles.notify, styles.fail, {
                [styles.active]: fail
            })}>
                Fail
            </div>
        </div>
    )
}

export default Profile
