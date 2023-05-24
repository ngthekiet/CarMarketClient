import {useEffect, useState} from "react";
import NewsService from "~/services/newsServices";
import NewsItem from "~/pages/News/NewsItem";
import clsx from "clsx";
import styles from "~/pages/News/News.module.scss";
import usePagination from "~/utils/pagination";
import {Pagination} from "@mui/material";

function News() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const PER_PAGE = 10
    const count = Math.ceil(data.length / PER_PAGE)
    const _DATA = usePagination(data, PER_PAGE)

    const handleChangePage = (e, p) => {
        setPage(p)
        _DATA.jump(p)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await NewsService.getRss(process.env.REACT_APP_URL_RSS)
            if (response?.data)
                setData(response.data.rss.channel.item)
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className={clsx(styles.title)}>News</div>
            <Pagination className={clsx(styles.pagination, styles.boxHr)} count={count} page={page}
                        onChange={handleChangePage}
                        color={"primary"} showFirstButton showLastButton/>
            {
                _DATA.currentData().map((result, index) => (
                    <NewsItem key={index} data={result}/>
                ))
            }
            <Pagination className={clsx(styles.pagination)} count={count} page={page} onChange={handleChangePage}
                        color={"primary"} showFirstButton showLastButton/>
        </div>
    )
}

export default News