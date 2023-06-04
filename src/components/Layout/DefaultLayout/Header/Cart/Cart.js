import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {NumericFormat} from "react-number-format";
import {useTranslation} from "react-i18next"
import clsx from "clsx";

import styles from "~/components/Layout/DefaultLayout/Header/Cart/Cart.module.scss"
import CartService from "~/services/cartServices";
import userID from "~/local/userID";
import CartItem from "~/components/Layout/DefaultLayout/Header/Cart/CartItem";

function Cart({handleHideBag}) {
    const {t} = useTranslation()
    const [data, setData] = useState([])
    const [haveData, setHaveData] = useState(false)
    const [total, setTotal] = useState(0)
    const uid = userID()
    useEffect(() => {
        if (uid === "")
            return
        const fetchData = async () => {
            try {
                const response = await CartService.getCart(uid)
                if (response?.data) {
                    setTotal(response.data.total)
                    setData(response.data.products)
                    return
                }
                setTotal(0)
            } catch (error) {
                console.log(error)
            }
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
                {t("share-cart")}
            </div>
            {
                haveData
                &&
                <div className={clsx(styles.cartItems)}>
                    {data.map((result) => (
                        <CartItem key={result.cartID} data={result}/>
                    ))}
                </div>
                ||
                <div>{t("share-nodata")}</div>
            }
            <div className="text-right mr-10"><span className="font-bold">{t("share-total")}:</span> <NumericFormat
                className="font-bold text-blue-700"
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}/></div>
            <div className={clsx(styles.cartOption)}>
                <div onClick={() => {
                    handleHideBag()
                }}>
                    {t("share-close")}
                </div>
                <Link onClick={() => {
                    handleHideBag()
                }} to={`/cart/${uid}`}>
                    <div>
                        {t("share-order")}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Cart