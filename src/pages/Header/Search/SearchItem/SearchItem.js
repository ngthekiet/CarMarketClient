import {Link} from "react-router-dom";

import clsx from "clsx";

import styles from "~/pages/Header/Search/Search.module.scss";

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