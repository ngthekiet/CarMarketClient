import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import {useTranslation} from "react-i18next";

import styles from "~/pages/OrderDetail/OrderDetail.module.scss";
import OrderService from "~/services/orderServices";
import GeneralInfo from "~/pages/MyOrder/GeneralInfo";
import UserInfo from "~/pages/MyOrder/UserInfo";
import OrderInfo from "~/pages/MyOrder/OrderInfo";
import notify from "~/components/Notify";
import CartService from "~/services/cartServices";

function OrderDetail() {
    const {id} = useParams()
    const [data, setData] = useState([])
    const [haveData, setHaveData] = useState(false)
    const [cancel, setCancel] = useState(true)
    const [repurchase, setRepurchase] = useState(false)
    const [change, setChange] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        setChange(false)
        const fetchData = async () => {
            try {
                const response = await OrderService.getOrder(id)
                if (response?.data)
                    setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [change])

    useEffect(() => {
        if (data.length === 0) {
            setHaveData(false)
            return
        }
        setHaveData(true)
    }, [data])

    useEffect(() => {
        if (data.status === "Confirming") {
            setCancel(true)
            setRepurchase(false)
            return
        }
        setCancel(false)
        setRepurchase(true)
    }, [data])

    const handleCancel = async () => {
        try {
            await OrderService.cancelOrder(data.id)
            setChange(true)
            notify.notifySuccess("Đã hủy đơn hàng")
        } catch (error) {
            notify.notifyError("Không thể hủy đơn hàng")
        }
    }

    const handleRepurchase = async () => {
        try {
            await CartService.repurchase(id)
            notify.notifySuccess("Đã thêm vào giỏ")
        } catch (error) {
            notify.notifyError("Mua lại thất bại")
        }
    }

    const handleAction = () => {
        if (cancel)
            handleCancel()
        if (repurchase)
            handleRepurchase()
    }

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <>
            <div className={clsx(styles.title)}>
                {t("od-title")}
            </div>
            <Box className={clsx(styles.containerItems)} sx={{flexGrow: 1}}>
                {
                    haveData
                    &&
                    <Grid container spacing={2}>
                        <Grid xs={4}>
                            <Item><GeneralInfo data={data}/></Item>
                        </Grid>
                        <Grid className={clsx(styles.flexCenter)} xs={8}>
                            <Item><UserInfo data={data?.user}/></Item>
                        </Grid>
                        <Grid xs={10}>
                            <Item><OrderInfo oid={data?.id}/></Item>
                        </Grid>
                        <Grid className={clsx(styles.flexCenter)} xs={2}>
                            <Item>
                                <button
                                    onClick={handleAction}
                                    className={clsx("inline-flex items-center rounded-md px-5 py-2 text-xm font-bold ring-1 ring-inset", {
                                        "bg-blue-50 text-blue-700 ring-blue-700/10": repurchase,
                                        "bg-red-50 text-red-700 ring-red-700/10": cancel
                                    })}>
                                    {
                                        cancel
                                        &&
                                        <span>{t("share-cancel")}</span>
                                        ||
                                        <span>{t("share-rebuy")}</span>
                                    }
                                </button>
                            </Item>
                        </Grid>
                    </Grid>
                }
                <div className={clsx(styles.back)}>
                    <Button onClick={() => {
                        window.history.back()
                    }} variant="outlined">
                        {t("share-back")}
                    </Button>
                </div>
            </Box>
        </>
    )
}

export default OrderDetail