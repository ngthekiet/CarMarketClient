import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import {NumericFormat} from "react-number-format";
import {useNavigate} from "react-router-dom";
import {FaTrash} from "react-icons/fa";
import {useTranslation} from "react-i18next";

import CartService from "~/services/cartServices";
import Button from "@mui/material/Button";
import clsx from "clsx";
import styles from "~/pages/Cart/Cart.module.scss"
import Notify from "~/components/Notify";
import OrderService from "~/services/orderServices";
import userID from "~/local/userID";

function Cart() {
    const {id} = useParams()
    const [data, setData] = useState([])
    const [change, setChange] = useState(true)
    const [haveData, setHaveData] = useState(false)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const {t} = useTranslation()

    useEffect(() => {
        if (userID() === "") {
            navigate("/account")
            return
        }
        if (userID() !== id)
            navigate("/notfound")
    }, [])

    useEffect(() => {
        setChange(false)
        const fetchData = async () => {
            const response = await CartService.getCart(id)
            if (response?.data) {
                setData(response?.data.products)
                setTotal(response.data.total)
                setHaveData(true)
                return
            }
            setHaveData(false)
            setTotal(0)
        }
        fetchData()
    }, [change])

    const handleRemoveCart = async (id) => {
        try {
            await CartService.removeFromCart(id)
            setChange(true)
            Notify.notifySuccess("Xóa thành công")
        } catch (error) {
            Notify.notifyError("Xóa thất bại")
            console.log(error)
        }
    }

    const handleUpdateCart = async (cartID, quantity) => {
        try {
            await CartService.updateCart(cartID, quantity)
            setChange(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOrder = async () => {
        try {
            if (!haveData) {
                Notify.notifyError("Không có sản phẩm")
                return
            }
            const response = await OrderService.order(id)
            setChange(true)
            Notify.notifySuccess("Đặt hàng thành công")
            navigate("/confirm")
        } catch (error) {
            Notify.notifyError("Đặt hàng thất bại")
            console.log(error)
        }
    }

    const columns = [
        {
            name: t("p-detail-image"),
            selector: row => <img width={130} height={130} src={row.product.image}/>
        },
        {
            name: t("p-detail-name"),
            selector: row => row.product.name,
            sortable: true,
            style: {
                fontWeight: 'bold',
                fontSize: '120%'
            }
        },
        {
            name: t("p-detail-quantity"),
            selector: row => <div>
                <button
                    className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-blue-50 text-xl font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    onClick={() => {
                        handleUpdateCart(row.cartID, -1)
                    }}>-
                </button>
                <span className="mx-2"><span className="font-bold">{row.quantity} </span>{t("p-detail-inCart")}</span>
                <button
                    className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-blue-50 text-xl font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    onClick={() => {
                        handleUpdateCart(row.cartID, 1)
                    }}>+
                </button>
            </div>,
            sortable: true,
            style: {
                fontSize: '120%'
            }
        },
        {
            name: t("p-detail-price"),
            selector: row => <NumericFormat value={row.product.price}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"$"}/>,
            sortable: true,
            style: {
                fontWeight: 'bold',
                fontSize: '120%',
                color: '#4f46e5'
            }
        },
        {
            name: t("p-detail-temporary"),
            selector: row => <NumericFormat value={row.temporaryPrice}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={"$"}/>,
            sortable: true,
            style: {
                fontWeight: 'bold',
                fontSize: '120%',
                color: '#4f46e5'
            }
        },
        {
            name: t("p-detail-action"),
            selector: row => <FaTrash className={clsx(styles.trash)} onClick={() => {
                handleRemoveCart(row.cartID)
            }}/>,
            style: {
                fontSize: '200%'
            }
        },
    ]

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.title)}>{t("p-detail-cart")}</div>
            {
                haveData
                &&
                <DataTable
                    columns={columns}
                    data={data}
                    pagination={true}
                    fixedHeader={true}
                    highlightOnHover={true}
                />
                ||
                <DataTable/>
            }
            <div className={clsx(styles.checkout)}>
                <div>{t("p-detail-total")}: <NumericFormat value={total}
                                                           displayType={"text"}
                                                           thousandSeparator={true}
                                                           decimalScale={2}
                                                           fixedDecimalScale={true}
                                                           prefix={"$"}/></div>
                <Button onClick={handleOrder} variant="contained">{t("p-detail-order")}</Button>
            </div>
        </div>
    )
}

export default Cart