import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import clsx from "clsx";

import styles from "~/pages/Dashboard/ManagerProduct/AddProduct/AddProduct.module.scss"
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import BrandService from "~/services/brandServices";
import CategoriesService from "~/services/categoryServices";
import Button from "@mui/material/Button";
import * as React from "react";

function AddProduct() {
    const [name, setName] = useState("")
    const [size, setSize] = useState("")
    const [power, setPower] = useState("")
    const [description, setDescription] = useState("")
    const [detail, setDetail] = useState("")
    const [price, setPrice] = useState(0)
    const [color, setColor] = useState("")
    const [fuel, setFuel] = useState("")
    const [type, setType] = useState("")
    const [brand, setBrand] = useState("")
    const [listBrand, setListBrand] = useState([])
    const [categories, setCategories] = useState("")
    const [listCategories, setListCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const resBrand = await BrandService.getAllBrands()
            const resCategory = await CategoriesService.getAllCategories()
            if (resBrand?.data) {
                setListBrand(resBrand.data)
                setBrand(resBrand.data[0].name)
            }
            if (resCategory?.data) {
                setListCategories(resCategory.data)
                setCategories(resCategory.data[0].name)
            }
        }
        fetchData()
    }, [])

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeSize = (e) => {
        setSize(e.target.value)
    }
    const handleChangePower = (e) => {
        setPower(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleChangeDetail = (e) => {
        setDetail(e.target.value)
    }

    const handleChangeColor = (e) => {
        setColor(e.target.value)
    }

    const handleChangeFuel = (e) => {
        setFuel(e.target.value)
    }

    const handleChangeType = (e) => {
        setType(e.target.value)
    }
    const handleChangeBrand = (e) => {
        setBrand(e.target.value)
    }

    const handleChangeCategories = (e) => {
        setCategories(e.target.value)
    }

    const handleChangePrice = (e) => {
        if (e.target.value > 0)
            setPrice(e.target.value)
        else setPrice(0)
    }

    return (
        <div className={clsx(styles.container)}>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <div className={clsx(styles.frame)}>
                        <div className={clsx(styles.productInfo)}>
                            Product Information
                        </div>
                        <div className={clsx(styles.productName)}>
                            <TextField value={name} onChange={handleChangeName} id="outlined-basic" label="Name"
                                       variant="outlined"
                                       size="small"/>
                        </div>
                        <div className={clsx(styles.productPP)}>
                            <TextField value={size} onChange={handleChangeSize} id="outlined-basic"
                                       label="Size (L x W x H)" variant="outlined" size="small"/>
                            <TextField value={power} onChange={handleChangePower} id="outlined-basic" label="Power (HP)"
                                       variant="outlined" size="small"/>
                        </div>
                        <div className={clsx(styles.productDes)}>
                            <TextField value={description} onChange={handleChangeDescription} id="outlined-basic"
                                       label="Description" variant="outlined" multiline/>
                        </div>
                        <div className={clsx(styles.productDetail)}>
                            <TextField value={detail} onChange={handleChangeDetail} id="outlined-basic" label="Details"
                                       variant="outlined" multiline/>
                        </div>
                    </div>
                </Grid>
                <Grid xs={4}>
                    <div className={clsx(styles.frame)}>
                        <div className={clsx(styles.productInfo)}>
                            More Information
                        </div>
                        <div className={clsx(styles.moreInfoItem)}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="color">Color</InputLabel>
                                <Select
                                    labelId="color"
                                    id="color-select"
                                    value={color}
                                    label="Color"
                                    onChange={handleChangeColor}
                                >
                                    <MenuItem value={"Red"}>Red</MenuItem>
                                    <MenuItem value={"Yellow"}>Yellow</MenuItem>
                                    <MenuItem value={"Blue"}>Blue</MenuItem>
                                    <MenuItem value={"Green"}>Green</MenuItem>
                                    <MenuItem value={"Black"}>Black</MenuItem>
                                    <MenuItem value={"White"}>White</MenuItem>
                                    <MenuItem value={"Purple"}>Purple</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={clsx(styles.moreInfoItem)}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="fuel">Fuel</InputLabel>
                                <Select
                                    labelId="fuel"
                                    id="fuel-select"
                                    value={fuel}
                                    label="Fuel"
                                    onChange={handleChangeFuel}
                                >
                                    <MenuItem value={"Electricity"}>Electricity</MenuItem>
                                    <MenuItem value={"Gasoline"}>Gasoline</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={clsx(styles.moreInfoItem)}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="type">Type</InputLabel>
                                <Select
                                    labelId="type"
                                    id="type-select"
                                    value={type}
                                    label="Type"
                                    onChange={handleChangeType}
                                >
                                    <MenuItem value={"SUV"}>SUV</MenuItem>
                                    <MenuItem value={"Van (Goods)"}>Van (Goods)</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={clsx(styles.moreInfoItem, styles.add)}>
                            <FormControl className={clsx(styles.addItem)} size="small">
                                <InputLabel id="brand">Brand</InputLabel>
                                <Select
                                    labelId="brand"
                                    id="brand-select"
                                    value={brand}
                                    label="Brand"
                                    onChange={handleChangeBrand}
                                >
                                    {listBrand.map((result, index) => (
                                        <MenuItem key={index} value={result.name}>{result.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="contained" sx={{mr: 1}}>
                                New
                            </Button>
                        </div>
                        <div className={clsx(styles.moreInfoItem, styles.add)}>
                            <FormControl className={clsx(styles.addItem)} size="small">
                                <InputLabel id="categories">Categories</InputLabel>
                                <Select
                                    labelId="categories"
                                    id="categories-select"
                                    value={categories}
                                    label="Categories"
                                    onChange={handleChangeCategories}
                                >
                                    {listCategories.map((result, index) => (
                                        <MenuItem key={index} value={result.name}>{result.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="contained" sx={{mr: 1}}>
                                New
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid xs={4}>
                    <div className={clsx(styles.frame)}>
                        <div className={clsx(styles.productInfo)}>
                            Pricing
                        </div>
                        <div className={clsx(styles.productPrice)}>
                            <TextField value={price} onChange={handleChangePrice} id="outlined-basic" label="Price ($)"
                                       variant="outlined"
                                       size="small"
                                       type="number"
                                       InputProps={{inputProps: {min: 0}}}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid xs={8}>
                    <div className={clsx(styles.frame)}>
                        <div className={clsx(styles.productInfo)}>
                            Media
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddProduct