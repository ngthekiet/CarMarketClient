import {useEffect, useState} from "react";
import NewsService from "~/services/newsServices";
import NewsItem from "~/pages/News/NewsItem";
import clsx from "clsx";
import styles from "~/pages/News/News.module.scss";

function News() {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await NewsService.getRss("https://thanhnien.vn/rss/xe.rss")
            if (response?.data)
                setData(response.data.rss.channel.item)
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className={clsx(styles.title)}>News</div>
            {
                data.map((result, index) => (
                    <NewsItem key={index} data={result}/>
                ))
            }
        </div>
    )
}

export default News