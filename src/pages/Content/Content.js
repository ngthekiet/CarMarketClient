import React, {useState} from "react";
import {useEffect} from "react";

import clsx from "clsx";

import styles from "~/pages/Content/Content.module.scss"
import ProductItem from "~/pages/Content/ProductItem";
import ProductService from "~/services/productServices";
import BrandItem from "~/pages/Content/BrandItem";
import BrandService from "~/services/brandServices";
import {All} from "~/assert/images/index"

function Content() {
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])

    const fetchData = async () => {
        const responseP = (await ProductService.getAllProducts())
        if (responseP?.data)
            setProducts(responseP.data)
        const responseB = await BrandService.getAllBrands()
        if (responseB?.data)
            setBrands(responseB.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearchByBrand = (value) => {
        setProducts(value)
    }

    const handleAll = () => {
        fetchData()
    }

    return (
        <div className={clsx(styles.body)}>
            <div className={clsx(styles.containerBrand)}>
                <div onClick={handleAll}>
                    <BrandItem data={{logo: All}}/>
                </div>
                {
                    brands.map((result) => (
                        <BrandItem key={result.id} data={result} handleSearchByBrand={handleSearchByBrand}/>
                    ))
                }
            </div>
            <div className={clsx(styles.containerCar)}>
                {
                    products.map((result) => (
                        <ProductItem key={result.id} data={result}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Content;