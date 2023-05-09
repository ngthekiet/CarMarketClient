import {Link} from "react-router-dom";

import clsx from "clsx";

import styles from "~/components/Layout/DefaultLayout/Header/Search/Search.module.scss";
import {NumericFormat} from "react-number-format";

function SearchItem({data}) {
    return (
        <Link to={`/detail/${data.id}`}>
            <div className={clsx(styles.searchItem)}>
                <div className={clsx(styles.itemImage)}>
                    <img
                        src={data.image}
                    />
                </div>
                <div className={clsx(styles.itemContent)}>
                    <div className={clsx(styles.itemName)}>{data.name}</div>
                    <div className={clsx(styles.itemPrice)}><NumericFormat
                        value={data.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}/></div>
                </div>
            </div>
        </Link>
    )
}

export default SearchItem