import {useEffect, useState} from "react";

import clsx from "clsx";

import styles from "~/components/Layout/DefaultLayout/Header/Cart/Cart.module.scss"
import CartService from "~/services/cartServices";
import userID from "~/local/userID";
import CartItem from "~/components/Layout/DefaultLayout/Header/Cart/CartItem";
import {Link} from "react-router-dom";

function Cart({handleHideBag}) {
    const [data, setData] = useState([])
    const [haveData, setHaveData] = useState(false)
    const uid = userID()
    useEffect(() => {
        if (uid === "")
            return
        const fetchData = async () => {
            const response = await CartService.getCart(uid)
            if (response?.data)
                setData(response.data.products)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (data.length === 0) {
            setHaveData(false)
            return
        }
        setHaveData(true)
    }, [data])
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.cart)}>
                GIỎ HÀNG
            </div>
            {
                haveData
                &&
                <div>
                    {data.map((result) => (
                        <CartItem key={result.cartID} data={result}/>
                    ))}
                </div>
                ||
                <div>Không có sản phẩm</div>
            }
            <div className={clsx(styles.cartOption)}>
                <div onClick={() => {
                    handleHideBag()
                }}>
                    Đóng
                </div>
                <Link onClick={() => {
                    handleHideBag()
                }} to={`/cart/${uid}`}>
                    <div>
                        Đặt hàng
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Cart