import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {NumericFormat} from "react-number-format";
import {FaPaypal, FaShoppingBag} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import clsx from "clsx";

import styles from "~/pages/Content/ProductItem/ProductItem.module.scss";
import userID from "~/local/userID";
import CartService from "~/services/cartServices";
import config from "~/config";
import Notify from "~/components/Notify";

function ProductItem({data}) {
    const uid = userID()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const addToCart = async (product, notify) => {
        if (uid === "") {
            navigate(config.routes.account)
            return
        }
        try {
            await CartService.addToCart(uid, product, 1)
            if (notify)
                Notify.notifySuccess(t("addsuccess"))
        } catch (error) {
            if (notify)
                Notify.notifyError(t("addfail"))
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
                            <Link onClick={async () => {
                                await addToCart(data.id, false)
                            }} to={`/cart/${uid}`}>
                                <FaPaypal/>
                            </Link>
                        </div>
                        <div onClick={() => {
                            addToCart(data.id, true)
                        }} className={clsx(styles.bag)}>
                            <FaShoppingBag/>
                        </div>
                    </div>
                </div>
                <Link to={`/detail/${data.id}`}>
                    <div className={clsx(styles.nameCar, styles.paddingItemCar)}>{data.name}</div>
                    <div className={clsx(styles.priceCar, styles.paddingItemCar)}>{t("content-from")}
                        <span><NumericFormat
                            value={data.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}/></span></div>
                    <div className={clsx(styles.desCar, styles.paddingItemCar)}>
                        <div>
                            {t("content-power")}: {data.power}
                        </div>
                        <div>
                            {t("share-fuel")}: {data.fuel}
                        </div>
                    </div>
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