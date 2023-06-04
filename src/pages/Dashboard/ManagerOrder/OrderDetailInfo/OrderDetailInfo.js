import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {NumericFormat} from "react-number-format";
import DataTable from "react-data-table-component";
import clsx from "clsx";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import OrderService from "~/services/orderServices";
import styles from "~/pages/Dashboard/ManagerOrder/OrderDetailInfo/OrderDetailInfo.module.scss"
import config from "~/config";

function OrderDetailInfo() {
    const {id} = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderService.orderDetail(id)
                if (response?.data)
                    setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const columns = [
        {
            selector: row =>
                <Link to={`/detail/${row.product.id}`}>
                    <img style={{margin: "0", width: "100px", height: "100px"}} src={row.product.image}
                         alt={""}/>
                </Link>,
            style: {
                justifyContent: "center"
            }
        },
        {
            selector: row => <Link style={{color: "#009be5"}}
                                   to={`/detail/${row.product.id}`}>{row.product.name}</Link>,
            style: {
                justifyContent: "center"
            }
        },
        {
            selector: row => "x" + row.quantity,
            style: {
                justifyContent: "center"
            }
        },
        {
            selector: row => <NumericFormat value={row.product.price}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"$"}/>,
            style: {
                justifyContent: "center"
            }
        },
        {
            selector: row => row.product.color,
            style: {
                justifyContent: "center"
            }
        },
        {
            selector: row => row.product.fuel,
            style: {
                justifyContent: "center"
            }
        },
    ]
    return (
        <>
            <Grid container spacing={2}>
                <Grid style={{margin: "0 auto"}} item xs={10}>
                    <div className={clsx(styles.frame)}>
                        <div className={clsx(styles.title)}>Purchase Order</div>
                        <div className={clsx(styles.company)}>UCAR company</div>
                        <div className={clsx(styles.hr)}></div>
                        <div className={clsx(styles.userInfo)}>
                            Buyer: {data.user?.firstname + " " + data.user?.lastname}
                        </div>
                        <div className={clsx(styles.userInfo)}>
                            Address: {data.user?.address}
                        </div>
                        <div className={clsx(styles.userInfo)}>
                            Email: {data.user?.email}
                        </div>
                        <div className={clsx(styles.userInfo)}>
                            Phone: {data.user?.phone}
                        </div>
                        <div className={clsx(styles.hr)}></div>
                        <DataTable columns={columns}
                                   data={data.products}
                                   highlightOnHover={true}
                                   noTableHead={true}
                        />
                        <div className={clsx(styles.hr)}></div>
                        <div className={clsx(styles.total)}>
                            Total: <NumericFormat value={data?.total}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  fixedDecimalScale={true}
                                                  prefix={"$"}/>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Link to={config.routes.managerOrder} className={clsx(styles.back)}>
                <Button variant="outlined">
                    Back
                </Button>
            </Link>
        </>
    )
}

export default OrderDetailInfo