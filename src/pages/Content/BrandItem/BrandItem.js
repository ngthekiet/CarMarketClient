import clsx from "clsx";
import styles from "~/pages/Content/BrandItem/BrandItem.module.scss";
import React from "react";
import ProductService from "~/services/productServices";

function BrandItem({data, handleSearchByBrand}) {

    const handleBrand = async (cid) => {
        if (handleSearchByBrand !== undefined) {
            const response = await ProductService.getProductsByBrand(cid)
            if (response?.data)
                handleSearchByBrand(response.data)
        }
    }

    return (
        <div onClick={() => {
            handleBrand(data.id)
        }
        } className={clsx(styles.brandItem)}>
            <img src={data.logo} alt={""}/>
        </div>
    )
}

export default BrandItem