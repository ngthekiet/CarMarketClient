import React from "react";
import clsx from "clsx";
import styles from "./ProductItem.module.scss";
import {FaPaypal, FaShoppingBag} from "react-icons/fa";

function ProductItem({data}) {
    return (
        <React.Fragment>
            <div className={clsx(styles.carBoxItem)}>
                <div className={clsx(styles.imagesCar)}>
                    <img
                        src={data.image}
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
                <div className={clsx(styles.nameCar, styles.paddingItemCar)}>{data.name}</div>
                <div className={clsx(styles.priceCar, styles.paddingItemCar)}>From <span>${data.price}</span></div>
                <div className={clsx(styles.desCar, styles.paddingItemCar)}>4 variants | with COE</div>
                <div className={clsx(styles.brand, styles.paddingItemCar)}>
                    <img
                        src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png"}/>
                    <span>Performance Motos</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductItem