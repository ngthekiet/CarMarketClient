import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDropzone} from 'react-dropzone';
import clsx from "clsx";
import {v4} from "uuid";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Modal from '@mui/material/Modal';
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useTranslation} from "react-i18next";

import styles from "~/pages/Dashboard/ManagerProduct/ProductInfo/ProductInfo.module.scss"
import BrandService from "~/services/brandServices";
import CategoriesService from "~/services/categoryServices";
import ProductService from "~/services/productServices";
import Notify from "~/components/Notify";
import {storage} from "~/firebase";

function ProductInfo({actionAdd, changeActionAdd, editId, actionEdit, changeActionEdit}) {
    const [change, setChange] = useState(false)
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
    const [image, setImage] = useState("")
    const [files, setFiles] = useState([])
    const [brandId, setBrandId] = useState(0)
    const [categoryId, setCategoryId] = useState(0)
    const [imageOld, setImageOld] = useState("")
    const [haveImageOld, setHaveImageOld] = useState(false)
    const [openModalBrand, setOpenModalBrand] = useState(false)
    const [openModalCategory, setOpenModalCategory] = useState(false)
    const [brandNew, setBrandNew] = useState("")
    const [brandNewLogo, setBrandNewLogo] = useState("")
    const [haveBrandNewLogo, setHaveBrandNewLogo] = useState("")
    const [categoryNew, setCategoryNew] = useState("")

    const navigate = useNavigate()
    const {t} = useTranslation()

    useEffect(() => {
        setChange(false)
        const fetchData = async () => {
            try {
                const resBrand = await BrandService.getAllBrands()
                const resCategory = await CategoriesService.getAllCategories()
                if (resBrand?.data) {
                    setListBrand(resBrand.data)
                }
                if (resCategory?.data) {
                    setListCategories(resCategory.data)
                }
                if (editId === undefined) {
                    setBrandId(resBrand.data[0].id)
                    setBrand(resBrand.data[0].name)
                    setCategoryId(resCategory.data[0].id)
                    setCategories(resCategory.data[0].name)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [change])

    useEffect(() => {
        if (editId === undefined)
            return
        const fetchData = async () => {
            try {
                const response = await ProductService.getProduct(editId)
                if (response?.data) {
                    const data = response.data
                    setName(data.name)
                    setPrice(data.price)
                    setSize(data.size)
                    setPower(data.power)
                    setDescription(data.description)
                    setDetail(data.details)
                    setColor(data.color)
                    setFuel(data.fuel)
                    setType(data.type)
                    setBrand(data.brand.name)
                    setBrandId(data.brand.id)
                    setCategories(data.category.name)
                    setCategoryId(data.category.id)
                    setImageOld(data.image)
                    setHaveImageOld(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [editId])

    useEffect(() => {
        if (actionAdd === true) {
            handleAddProduct()
            changeActionAdd(false)
        }
    }, [actionAdd])
    useEffect(() => {
        if (actionEdit === true) {
            handleEditProduct()
            changeActionEdit(false)
        }
    }, [actionEdit])

    const handleAddProduct = async () => {
        let imgURL
        try {
            const imageRef = await ref(storage, `images/products/${image.name + v4()}`)
            const imageResponse = await uploadBytes(imageRef, image)
            imgURL = await getDownloadURL(imageResponse.ref)
        } catch (error) {
            imgURL = ""
        }
        try {
            const brandResponse = await BrandService.getBrand(brandId)
            const categoryResponse = await CategoriesService.getCategory(categoryId)
            await ProductService.addProduct(name, imgURL, price, type, size, fuel, power, color, description, detail, categoryResponse.data, brandResponse.data)
        } catch (error) {
            Notify.notifyError(t("addfail"))
        }
        Notify.notifySuccess(t("addsuccess"))
        await navigate("/dashboard/product")
    }

    const handleEditProduct = async () => {
        let imgURL
        try {
            const imageRef = await ref(storage, `images/products/${image.name + v4()}`)
            const imageResponse = await uploadBytes(imageRef, image)
            imgURL = await getDownloadURL(imageResponse.ref)
        } catch (error) {
            try {
                const res = await ProductService.getProduct(editId)
                imgURL = res.data.image
            } catch (error) {
                imgURL = ""
            }
        }
        try {
            const brandResponse = await BrandService.getBrand(brandId)
            const categoryResponse = await CategoriesService.getCategory(categoryId)
            await ProductService.editProduct(editId, name, imgURL, price, type, size, fuel, power, color, description, detail, categoryResponse.data, brandResponse.data)
        } catch (error) {
            Notify.notifyError(t("updatefail"))
        }
        Notify.notifySuccess(t("updatesuccess"))
        await navigate("/dashboard/product")
    }

    useEffect(() => {
        setImage(files[0])
        setHaveImageOld(false)
    }, [files])

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        marginBottom: 8,
        marginRight: 8,
        width: "100%",
        height: "100%",
        padding: 4,
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    }

    const img = {
        display: 'block',
        width: '60%',
        height: '60%',
        maxHeight: 200
    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
            setImage(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        }
    })

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                    }}
                    alt={"Image"}
                />
            </div>
        </div>
    ))

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [])

    const styleModal = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px'
    }

    const handleNewCategory = async () => {
        try {
            await CategoriesService.newCategory(categoryNew)
            setChange(true)
            setOpenModalCategory(false)
            Notify.notifySuccess(t("addsuccess"))
        } catch (error) {
            Notify.notifyError(t("addfail"))
        }
    }

    useEffect(() => {
        setBrandNewLogo(haveBrandNewLogo)
    }, [haveBrandNewLogo])

    const handleNewBrand = async () => {
        let imgURL
        if (brandNewLogo === "") {
            imgURL = ""
        } else {
            try {
                const imageRef = await ref(storage, `images/brands/${brandNewLogo.name + v4()}`)
                const imageResponse = await uploadBytes(imageRef, brandNewLogo)
                imgURL = await getDownloadURL(imageResponse.ref)
            } catch (error) {
                imgURL = ""
            }
        }
        try {
            await BrandService.newBrand(brandNew, imgURL)
            await setChange(true)
            setOpenModalBrand(false)
            Notify.notifySuccess(t("addsuccess"))
        } catch (error) {
            Notify.notifyError(t("addfail"))
        }
    }

    return (
        <div className={clsx(styles.container)}>
            <Grid container spacing={2}>
                <Grid className={clsx(styles.title)} xs={12}>
                    {t("share-addproduct")}
                </Grid>
                <Grid xs={8}>
                    <div className={clsx(styles.frame)}>
                        <div className={clsx(styles.productInfo)}>
                            {t("db-productinfor")}
                        </div>
                        <div className={clsx(styles.productName)}>
                            <TextField value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} id="outlined-basic" label={t("share-name")}
                                       variant="outlined"
                                       size="small"/>
                        </div>
                        <div className={clsx(styles.productPP)}>
                            <TextField value={size} onChange={(e) => {
                                setSize(e.target.value)
                            }} id="outlined-basic"
                                       label={t("db-size")} variant="outlined" size="small"/>
                            <TextField value={power} onChange={(e) => {
                                setPower(e.target.value)
                            }} id="outlined-basic" label={t("db-power")}
                                       variant="outlined" size="small"/>
                        </div>
                        <div className={clsx(styles.productDes)}>
                            <TextField value={description} onChange={(e) => {
                                setDescription(e.target.value)
                            }} id="outlined-basic"
                                       label={t("db-description")} variant="outlined" multiline/>
                        </div>
                        <div className={clsx(styles.productDetail)}>
                            <TextField value={detail} onChange={(e) => {
                                setDetail(e.target.value)
                            }} id="outlined-basic" label={t("db-details")}
                                       variant="outlined" multiline/>
                        </div>
                    </div>
                </Grid>
                <Grid xs={4}>
                    <div className={clsx(styles.frame)}>
                        <div className={clsx(styles.productInfo)}>
                            {t("db-moreinfor")}
                        </div>
                        <div className={clsx(styles.moreInfoItem)}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="color">{t("share-color")}</InputLabel>
                                <Select
                                    labelId="color"
                                    id="color-select"
                                    value={color}
                                    label={t("share-color")}
                                    onChange={(e) => {
                                        setColor(e.target.value)
                                    }}
                                >
                                    <MenuItem value={"Black"}>Black</MenuItem>
                                    <MenuItem value={"Blue"}>Blue</MenuItem>
                                    <MenuItem value={"Gold"}>Gold</MenuItem>
                                    <MenuItem value={"Gray"}>Gray</MenuItem>
                                    <MenuItem value={"Green"}>Green</MenuItem>
                                    <MenuItem value={"Purple"}>Purple</MenuItem>
                                    <MenuItem value={"Red"}>Red</MenuItem>
                                    <MenuItem value={"White"}>White</MenuItem>
                                    <MenuItem value={"Yellow"}>Yellow</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={clsx(styles.moreInfoItem)}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="fuel">{t("share-fuel")}</InputLabel>
                                <Select
                                    labelId="fuel"
                                    id="fuel-select"
                                    value={fuel}
                                    label={t("share-fuel")}
                                    onChange={(e) => {
                                        setFuel(e.target.value)
                                    }}
                                >
                                    <MenuItem value={"Electric"}>Electric</MenuItem>
                                    <MenuItem value={"Gasoline"}>Gasoline</MenuItem>
                                    <MenuItem value={"Petrol"}>Petrol</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={clsx(styles.moreInfoItem)}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="type">{t("db-type")}</InputLabel>
                                <Select
                                    labelId="type"
                                    id="type-select"
                                    value={type}
                                    label={t("db-type")}
                                    onChange={(e) => {
                                        setType(e.target.value)
                                    }}
                                >
                                    <MenuItem value={"Cabriolet"}>Cabriolet</MenuItem>
                                    <MenuItem value={"Convertible "}>Convertible </MenuItem>
                                    <MenuItem value={"Coupe"}>Coupe</MenuItem>
                                    <MenuItem value={"Crossover"}>Crossover</MenuItem>
                                    <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
                                    <MenuItem value={"MPV"}>MPV</MenuItem>
                                    <MenuItem value={"Pickup"}>Pickup</MenuItem>
                                    <MenuItem value={"Roadster"}>Roadster</MenuItem>
                                    <MenuItem value={"Sedan"}>Sedan</MenuItem>
                                    <MenuItem value={"Spider"}>Spider</MenuItem>
                                    <MenuItem value={"Spyder"}>Spyder</MenuItem>
                                    <MenuItem value={"SUV"}>SUV</MenuItem>
                                    <MenuItem value={"Van (Goods)"}>Van (Goods)</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={clsx(styles.moreInfoItem, styles.add)}>
                            <FormControl className={clsx(styles.addItem)} size="small">
                                <InputLabel id="brand">{t("share-brand")}</InputLabel>
                                <Select
                                    labelId="brand"
                                    id="brand-select"
                                    value={brand}
                                    label={t("share-brand")}
                                    onChange={(e) => {
                                        setBrand(e.target.value)
                                    }}
                                >
                                    {listBrand.map((result, index) => (
                                        <MenuItem onClick={() => {
                                            setBrandId(result.id)
                                        }} key={index} value={result.name}>{result.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button onClick={() => {
                                setOpenModalBrand(true)
                            }} variant="contained" sx={{mr: 1}}>
                                New
                            </Button>
                            <Modal
                                open={openModalBrand}
                                onClose={() => {
                                    setOpenModalBrand(false)
                                }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className={clsx(styles.modalNew)} sx={styleModal}>
                                    <TextField onChange={(e) => {
                                        setBrandNew(e.target.value)
                                    }} className={clsx(styles.name)} id="outlined-basic"
                                               label="Brand Name" variant="outlined"
                                               size={"small"}/>
                                    <input onChange={(e) => {
                                        setHaveBrandNewLogo(e.target.files[0])
                                    }} className={clsx(styles.inputImage)} type={"file"} accept={"image/*"}/>
                                    <div className={clsx(styles.action)}>
                                        <Button onClick={handleNewBrand} variant="contained">Add</Button>
                                        <Button onClick={() => {
                                            setOpenModalBrand(false)
                                        }} variant="outlined" color="error">
                                            Cancel
                                        </Button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                        <div className={clsx(styles.moreInfoItem, styles.add)}>
                            <FormControl className={clsx(styles.addItem)} size="small">
                                <InputLabel id="categories">{t("share-category")}</InputLabel>
                                <Select
                                    labelId="categories"
                                    id="categories-select"
                                    value={categories}
                                    label={t("share-category")}
                                    onChange={(e) => {
                                        setCategories(e.target.value)
                                    }}
                                >
                                    {listCategories.map((result, index) => (
                                        <MenuItem onClick={() => {
                                            setCategoryId(result.id)
                                        }} key={index} value={result.name}>{result.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button onClick={() => {
                                setOpenModalCategory(true)
                            }} variant="contained" sx={{mr: 1}}>
                                New
                            </Button>
                            <Modal
                                open={openModalCategory}
                                onClose={() => {
                                    setOpenModalCategory(false)
                                }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className={clsx(styles.modalNew)} sx={styleModal}>
                                    <TextField onChange={(e) => {
                                        setCategoryNew(e.target.value)
                                    }} className={clsx(styles.name)} id="outlined-basic"
                                               label="Category Name" variant="outlined"
                                               size={"small"}/>
                                    <div className={clsx(styles.action)}>
                                        <Button onClick={handleNewCategory} variant="contained">Add</Button>
                                        <Button onClick={() => {
                                            setOpenModalCategory(false)
                                        }} variant="outlined" color="error">
                                            Cancel
                                        </Button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                </Grid>
                <Grid xs={4}>
                    <div className={clsx(styles.frame)}>
                        <div className={clsx(styles.productInfo)}>
                            Pricing
                        </div>
                        <div className={clsx(styles.productPrice)}>
                            <TextField value={price} onChange={(e) => {
                                if (e.target.value > 0)
                                    setPrice(e.target.value)
                                else setPrice(0)
                            }} id="outlined-basic" label="Price ($)"
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
                            {t("db-media")}
                        </div>
                        <section className={clsx(styles.image, "container")}>
                            <aside style={thumbsContainer}>
                                {thumbs}
                                {
                                    haveImageOld
                                    &&
                                    <img style={{
                                        display: "block",
                                        width: "50%",
                                        height: "50%",
                                        maxHeight: "200px",
                                        margin: "0 auto"
                                    }}
                                         src={imageOld}/>
                                }
                            </aside>
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <span
                                    className={clsx(styles.dropImage)}>{t("db-drag")}</span>
                            </div>
                        </section>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductInfo