import React, {useState} from "react";
import {useEffect} from "react";
import clsx from "clsx";
import {Pagination} from "@mui/material";

import styles from "~/pages/Content/Content.module.scss"
import ProductItem from "~/pages/Content/ProductItem";
import ProductService from "~/services/productServices";
import BrandItem from "~/pages/Content/BrandItem";
import BrandService from "~/services/brandServices";
import {All} from "~/assert/images/index"
import usePagination from "~/utils/pagination";

function Content() {
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [page, setPage] = useState(1)
    const PER_PAGE = 8
    const count = Math.ceil(products.length / PER_PAGE)
    const _DATA = usePagination(products, PER_PAGE)

    const handleChangePage = (e, p) => {
        setPage(p)
        _DATA.jump(p)
    }

    const fetchData = async () => {
        try {
            const responseP = (await ProductService.getAllProducts())
            if (responseP?.data)
                setProducts(responseP.data)
        } catch (error) {
            console.log(error)
        }
        try {
            const responseB = await BrandService.getAllBrands()
            if (responseB?.data)
                setBrands(responseB.data)
        } catch (error) {
            console.log(error)
        }
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
                    _DATA.currentData().map((result) => (
                        <ProductItem key={result.id} data={result}/>
                    ))
                }
            </div>
            <Pagination className={clsx(styles.pagination, styles.boxHr)} count={count} page={page}
                        onChange={handleChangePage}
                        color={"primary"} showFirstButton showLastButton/>
        </div>
    )
}

export default Content;