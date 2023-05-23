import clsx from "clsx";
import styles from "~/pages/Content/BrandItem/BrandItem.module.scss";
import React from "react";

function BrandItem() {
    return (
        <div className={clsx(styles.brandItem)}>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg"} alt={""}/>
            <div>Audi</div>
        </div>
    )
}

export default BrandItem