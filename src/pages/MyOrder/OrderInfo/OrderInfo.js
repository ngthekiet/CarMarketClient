import React, {useEffect, useState} from "react";
import {NumericFormat} from "react-number-format";
import clsx from "clsx";
import {useTranslation} from "react-i18next";


import OrderService from "~/services/orderServices";
import ProductItem from "~/pages/MyOrder/OrderInfo/ProductItem";
import styles from "~/pages/MyOrder/OrderInfo/OrderInfo.module.scss"

function OrderInfo({oid}) {
    const [data, setData] = useState([])
    const [products, setProduct] = useState([])
    const {t} = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderService.orderDetail(oid)
                if (response?.data) {
                    setData(response.data)
                    setProduct(response.data.products)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [oid])
    return (
        <React.Fragment>
            <div>
                {products.map((result, index) => (
                    <ProductItem key={index} data={result}/>
                ))}
            </div>
            <div className={clsx(styles.total)}>
                <span>
                    <b>{t("share-total")}: </b><NumericFormat className={clsx(styles.priceTotal)} value={data.total}
                                                              displayType={"text"}
                                                              thousandSeparator={true}
                                                              decimalScale={2}
                                                              fixedDecimalScale={true}
                                                              prefix={"$"}/>
                </span>
            </div>
        </React.Fragment>
    )
}

export default OrderInfo