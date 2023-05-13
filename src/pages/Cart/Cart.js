import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';

import CartService from "~/services/cartServices";
import {NumericFormat} from "react-number-format";
import {FaTrash} from "react-icons/fa";
import clsx from "clsx";
import styles from "~/pages/Cart/Cart.module.scss"
import Notify from "~/components/Notify";

function Cart() {
    const {id} = useParams()
    const [data, setData] = useState([])
    const [change, setChange] = useState(false)
    const [haveData, setHaveData] = useState(false)
    const [total, setTotal] = useState(0)
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

    const columns = [
        {
            name: 'Image',
            selector: row => <img width={130} height={130} src={row.product.image}/>
        },
        {
            name: 'Name',
            selector: row => row.product.name,
            sortable: true,
            style: {
                fontWeight: 'bold',
                fontSize: '120%'
            }
        },
        {
            name: 'Quantity',
            selector: row => <div>
                <button
                    className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-blue-50 text-xl font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    onClick={() => {
                        handleUpdateCart(row.cartID, -1)
                    }}>-
                </button>
                <span className="mx-2"><span className="font-bold">{row.quantity}</span> in cart</span>
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
            name: 'Price',
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
            name: 'Temporary price',
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
            name: 'Action',
            selector: row => <FaTrash className={clsx(styles.trash)} onClick={() => {
                handleRemoveCart(row.cartID)
            }}/>,
            style: {
                fontSize: '200%'
            }
        },
    ]

    return (
        <div>
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
            <div>Total: {total}</div>
        </div>
    )
}

export default Cart