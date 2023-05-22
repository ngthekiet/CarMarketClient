import React from "react";
import {useEffect, useState} from "react";
import OrderService from "~/services/orderServices";
import {useParams, useNavigate} from "react-router-dom";

import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import clsx from "clsx";

import GeneralInfo from "~/pages/MyOrder/GeneralInfo";
import UserInfo from "~/pages/MyOrder/UserInfo";
import OrderInfo from "~/pages/MyOrder/OrderInfo";
import styles from "~/pages/MyOrder/MyOrder.module.scss"
import Action from "~/pages/MyOrder/Action";
import userID from "~/local/userID";

function MyOrder() {
    const {id} = useParams()
    const [data, setData] = useState([])
    const [haveData, setHaveData] = useState(false)
    const navigate = useNavigate()
    const uid = userID()

    useEffect(() => {
        if (uid !== id)
            navigate("/notfound")
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderService.myOrder(id)
                if (response?.data)
                    setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (data.length === 0) {
            setHaveData(false)
            return
        }
        setHaveData(true)
    }, [data])
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <React.Fragment>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.title)}>
                    My order
                </div>
                {haveData
                    &&
                    <>
                        {data.map((result) => (
                            <Box className={clsx(styles.containerItems)} key={result.id} sx={{flexGrow: 1}}>
                                <Grid container spacing={2}>
                                    <Grid xs={4}>
                                        <Item><GeneralInfo data={result}/></Item>
                                    </Grid>
                                    <Grid className={clsx(styles.flexCenter)} xs={8}>
                                        <Item><UserInfo data={result.user}/></Item>
                                    </Grid>
                                    <Grid xs={10}>
                                        <Item><OrderInfo oid={result.id}/></Item>
                                    </Grid>
                                    <Grid className={clsx(styles.flexCenter)} xs={2}>
                                        <Item><Action oid={result.id}/></Item>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </>
                    ||
                    <div className={clsx(styles.noOrders)}>There are no records to display</div>
                }
            </div>
        </React.Fragment>

    )
}

export default MyOrder