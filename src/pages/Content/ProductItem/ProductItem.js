import React from "react";
import {Link} from "react-router-dom";

import {FaPaypal, FaShoppingBag} from "react-icons/fa";

import clsx from "clsx";

import styles from "~/pages/Content/ProductItem/ProductItem.module.scss";
import {NumericFormat} from "react-number-format";

function ProductItem({data}) {
    console.log(data)
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
                        <div className={clsx(styles.bag)}>
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
                            src={data.brand.logo}
                            alt={""}/>
                        <span>Performance Motos</span>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default ProductItem