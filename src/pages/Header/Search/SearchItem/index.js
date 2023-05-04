import clsx from "clsx";
import styles from "../Search.module.scss";
import {Link} from "react-router-dom";

function SearchItem({data}) {
    return (
        <Link to={`/detail/${data.id}`}>
            <div className={clsx(styles.searchItem)}>
                <div>
                    <img
                        src={data.image}
                    />
                </div>
                <span>{data.name}</span>
            </div>
        </Link>
    )
}

export default SearchItem