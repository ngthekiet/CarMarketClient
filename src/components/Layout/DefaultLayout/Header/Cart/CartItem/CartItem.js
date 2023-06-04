import clsx from "clsx";
import {NumericFormat} from "react-number-format";
import {useTranslation} from "react-i18next"

import styles from "~/components/Layout/DefaultLayout/Header/Cart/Cart.module.scss"

function CartItem({data}) {
    const {t} = useTranslation()
    return (
        <div className={clsx(styles.cartItem)}>
            <img style={{margin: "0"}} src={data["product"].image}/>
            <div>
                <div className={clsx(styles.bold)}>
                    {data["product"].name}
                </div>
                <div>
                    {t("share-price")}: <NumericFormat
                    value={data["product"].price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}/>
                </div>
                <div>
                    {t("share-quantity")}: {data.quantity}
                </div>
            </div>
        </div>
    )
}

export default CartItem