import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {NumericFormat} from "react-number-format";
import {FaPaypal, FaShoppingBag} from "react-icons/fa";

import clsx from "clsx";
import styles from "~/pages/Content/ProductItem/ProductItem.module.scss";
import userID from "~/local/userID";
import CartService from "~/services/cartServices";
import config from "~/config";
import Notify from "~/components/Notify";

function ProductItem({data}) {
    const id = userID()
    const navigate = useNavigate()

    const addToCart = async (product) => {
        if (id === "") {
            navigate(config.routes.account)
            return
        }
        try {
            await CartService.addToCart(id, product, 1)
            Notify.notifySuccess("Đã thêm vào giỏ")
        } catch (error) {
            Notify.notifyError("Chưa thêm vào giỏ")
            console.log(error)
        }
    }
    return (
        <React.Fragment>
            <div className={clsx(styles.carBoxItem)}>
                <div className={clsx(styles.imagesCar)}>
                    <img
                        src={data.image}
                        alt={""}
                    />
                    <div className={clsx(styles.optionCar)}>
                        <div className={clsx(styles.pay)}>
                            <FaPaypal/>
                        </div>
                        <div onClick={() => {
                            addToCart(data.id)
                        }
                        } className={clsx(styles.bag)}>
                            <FaShoppingBag/>
                        </div>
                    </div>
                </div>
                <Link to={`/detail/${data.id}`}>
                    <div className={clsx(styles.nameCar, styles.paddingItemCar)}>{data.name}</div>
                    <div className={clsx(styles.priceCar, styles.paddingItemCar)}>From <span><NumericFormat
                        value={data.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}/></span></div>
                    <div className={clsx(styles.desCar, styles.paddingItemCar)}>Power: {data.power} |
                        Fuel: {data.fuel}</div>
                    <div className={clsx(styles.brand, styles.paddingItemCar)}>
                        <img
                            src={data.brand?.logo || ""}
                            alt={""}/>
                        <span>Performance Motos</span>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default ProductItem