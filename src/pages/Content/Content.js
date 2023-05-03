import React, {useState} from "react";
import clsx from "clsx";
import styles from "./Content.module.scss"
import ProductItem from "../../components/ProductItem";
import ProductService from "../../services/productServices";
import {useEffect} from "react";

function Content() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = (await ProductService.getAllProducts())
            if (response?.data)
                setProducts(response.data)
        }
        fetchData()
    }, [])

    return (
        <div className={clsx(styles.body)}>
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