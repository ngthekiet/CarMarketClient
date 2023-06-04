import React, {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from "react-router-dom";

import ProductService from "~/services/productServices";
import {NumericFormat} from "react-number-format";
import userID from "~/local/userID";
import config from "~/config";
import CartService from "~/services/cartServices";
import Notify from "~/components/Notify";

function ProductDetail() {
    const [data, setData] = useState({})
    const {id} = useParams()
    const userId = userID()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = (await ProductService.getProduct(id))
                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])

    const addToCart = async (product, notify) => {
        if (userId === "") {
            navigate(config.routes.account)
            return
        }
        try {
            await CartService.addToCart(userId, product, 1)
            if (notify)
                Notify.notifySuccess("Đã thêm vào giỏ")
        } catch (error) {
            if (notify)
                Notify.notifyError("Chưa thêm vào giỏ")
        }
    }

    return (
        <div className="bg-white">
            <div className="pt-6">
                <div
                    className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.name}</h1>
                    </div>
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900"><span
                            className="mr-4 text-zinc-500">Price only</span><span
                            className="text-blue-600 font-bold text-4xl"><NumericFormat value={data.price}
                                                                                        displayType={"text"}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        fixedDecimalScale={true}
                                                                                        prefix={"$"}/></span>
                        </p>
                        <div className="mt-10">
                            <div className="flex items-center">
                                <h3 className="text-sm font-medium text-gray-900">Color:</h3>
                                <div style={{backgroundColor: data.color}}
                                     className="w-16 h-6 rounded-full ml-5 border-solid border-2 border-black">
                                </div>
                            </div>
                            <div className="flex items-center mt-5">
                                <img src={data.brand?.logo || ""}
                                     className="m-0 w-1/6 h-1/6 min-w-6 min-h-6 max-w-10 max-h-10"
                                     alt={data.brand?.logo || "image"}
                                />
                                <span className="text-2xl ml-8 text-zinc-500">|</span>
                                <span className="text-2xl ml-8 text-zinc-500">{data.brand?.name || ""}</span>
                            </div>
                            <Link onClick={() => {
                                addToCart(data.id, false)
                            }} to={`/cart/${userId}`}>
                                <button
                                    type="button"
                                    className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Pay now
                                </button>
                            </Link>
                            <button
                                onClick={() => {
                                    addToCart(data.id, true)
                                }}
                                type="button"
                                className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                Add to bag
                            </button>
                        </div>
                        <div className="w-full h-0.5 bg-gray-300 mt-5"></div>
                        <div className="font-bold">
                            Key Info
                        </div>
                        <table className="w-full mt-1">
                            <tbody>
                            <tr className="border-collapse border border-slate-500">
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    Color
                                </td>
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    {data?.color || "-"}
                                </td>
                            </tr>
                            <tr className="border-collapse border border-slate-500">
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    Fuel Type
                                </td>
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    {data?.type || "-"}
                                </td>
                            </tr>
                            <tr className="border-collapse border border-slate-500">
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    Power
                                </td>
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    {data?.power || "-"}
                                </td>
                            </tr>
                            <tr className="border-collapse border border-slate-500">
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    Body Size (L x W x H)
                                </td>
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    {data?.size || "-"}
                                </td>
                            </tr>
                            <tr className="border-collapse border border-slate-500">
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    Body Type
                                </td>
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    {data?.type || "-"}
                                </td>
                            </tr>
                            <tr className="border-collapse border border-slate-500">
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    Brand
                                </td>
                                <td className="w-1/2 leading-10 indent-2 border-collapse border border-gray-400">
                                    {data.brand?.name || "-"}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        <div className="mx-auto w-80">
                            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                                <img
                                    src={data.image}
                                    alt={data.image}
                                    className="m-0 h-full w-full object-contain object-center"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{data.description}</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>
                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{data.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
