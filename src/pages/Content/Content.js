import React, {useState} from "react";
import {useEffect} from "react";

import clsx from "clsx";

import styles from "~/pages/Content/Content.module.scss"
import ProductItem from "~/pages/Content/ProductItem";
import ProductService from "~/services/productServices";

function Content() {
    const [products, setProducts] = useState([])
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = (await ProductService.getAllProducts())
            if (response?.data)
                setProducts(response.data)
        }
        fetchData()
    }, [])

    const handleActive = (success, fail) => {
        setSuccess(success)
        setFail(fail)
    }

    return (
        <div className={clsx(styles.body)}>
            <div className={clsx(styles.containerCar)}>
                {
                    products.map((result) => (
                        <ProductItem key={result.id} data={result} handleActive={handleActive}/>
                    ))
                }
            </div>
            <div className={clsx(styles.success, styles.notify, {
                [styles.active]: success
            })}>
                <div className={clsx(styles.icon)}>
                    <i className="checkmark">✓</i>
                </div>
                <h1>Success</h1>
                <p>Successfully added to cart!</p>
            </div>
            <div className={clsx(styles.fail, styles.notify, {
                [styles.active]: fail
            })}>
                <div className={clsx(styles.icon)}>
                    <i className="checkmark">x</i>
                </div>
                <h1>Fail</h1>
                <p>Add to cart failed!</p>
            </div>
        </div>
    )
}

export default Content;