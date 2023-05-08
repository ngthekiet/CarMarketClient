import {useEffect, useState} from "react";

import clsx from "clsx";

import styles from "~/components/Layout/DefaultLayout/Header/Cart/Cart.module.scss"
import CartService from "~/services/cartServices";
import userID from "~/local/userID";
import CartItem from "~/components/Layout/DefaultLayout/Header/Cart/CartItem";
import {AiFillCloseCircle} from "react-icons/ai";

function Cart({handleHideBag}) {
    const [data, setData] = useState([])
    const uid = userID()
    useEffect(() => {
        const fetchData = async () => {
            const response = await CartService.getCart(uid)
            if (response?.data)
                setData(response.data.products)
        }
        fetchData()
    }, [])
    return (
        <div className={clsx(styles.container)}>
            {data.map((result) => (
                <CartItem key={result.cartID} data={result}/>
            ))}
            <div><AiFillCloseCircle onClick={() => {
                handleHideBag()
            }
            }/></div>
        </div>
    )
}

export default Cart