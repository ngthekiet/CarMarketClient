import {useEffect, useState} from "react";
import clsx from "clsx";
import {Pagination} from "@mui/material";
import {useTranslation} from "react-i18next";

import NewsService from "~/services/newsServices";
import NewsItem from "~/pages/News/NewsItem";
import styles from "~/pages/News/News.module.scss";
import usePagination from "~/utils/pagination";

function News() {
    const {t} = useTranslation()
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
            try {
                const response = await NewsService.getRss(process.env.REACT_APP_URL_RSS)
                if (response?.data)
                    setData(response.data.rss.channel.item)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className={clsx(styles.title)}>{t("navbar-news")}</div>
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