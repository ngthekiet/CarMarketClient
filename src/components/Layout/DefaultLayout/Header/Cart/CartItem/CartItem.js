import clsx from "clsx";
import styles from "~/components/Layout/DefaultLayout/Header/Cart/Cart.module.scss"
import {NumericFormat} from "react-number-format";

function CartItem({data}) {
    return (
        <div className={clsx(styles.cartItem)}>
            <img style={{margin: "0"}} src={data["product"].image}/>
            <div>
                <div className={clsx(styles.bold)}>
                    {data["product"].name}
                </div>
                <div>
                    Price: <NumericFormat
                    value={data["product"].price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}/>
                </div>
                <div>
                    Quantity: {data.quantity}
                </div>
            </div>
        </div>
    )
}

export default CartItem