import React from "react";
import clsx from "clsx";
import {NumericFormat} from "react-number-format";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import styles from "~/pages/MyOrder/OrderInfo/ProductItem/ProductItem.module.scss"

function ProductItem({data}) {
    const {t} = useTranslation()
    return (
        <React.Fragment>
            <div className={clsx(styles.container)}>
                <Link to={`/detail/${data.product.id}`}>
                    <img style={{margin: "0"}} src={data.product.image}/>
                </Link>
                <div className={clsx(styles.info)}>
                    <img src={data.product.brand.logo}/>
                    <span>
                        <b>{t("share-name")}: </b><Link
                        to={`/detail/${data.product.id}`}><u>{data.product.name}</u></Link>
                    </span>
                    <span>
                        <b>{t("share-price")}: </b><NumericFormat value={data.product.price}
                                                                  displayType={"text"}
                                                                  thousandSeparator={true}
                                                                  prefix={"$"}/>
                    </span>
                    <span>
                        <b>{t("share-fuel")}: </b>{data.product.fuel}
                    </span>
                    <span>
                        <b>{t("share-quantity")}: </b>{data.quantity}
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductItem