import React from "react";
import clsx from "clsx";
import {NumericFormat} from "react-number-format";
import {Link} from "react-router-dom";

import styles from "~/pages/MyOrder/OrderInfo/ProductItem/ProductItem.module.scss"

function ProductItem({data}) {
    return (
        <React.Fragment>
            <div className={clsx(styles.container)}>
                <Link to={`/detail/${data.product.id}`}>
                    <img style={{margin: "0"}} src={data.product.image}/>
                </Link>
                <div className={clsx(styles.info)}>
                    <img src={data.product.brand.logo}/>
                    <span>
                        <b>Name: </b><Link to={`/detail/${data.product.id}`}><u>{data.product.name}</u></Link>
                    </span>
                    <span>
                        <b>Price: </b><NumericFormat value={data.product.price}
                                                     displayType={"text"}
                                                     thousandSeparator={true}
                                                     prefix={"$"}/>
                    </span>
                    <span>
                        <b>Fuel: </b>{data.product.fuel}
                    </span>
                    <span>
                        <b>Quantity: </b>{data.quantity}
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductItem