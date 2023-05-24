import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import clsx from "clsx";

import NewsService from "~/services/newsServices";
import styles from "~/pages/Post/Post.module.scss"
import "~/pages/Post/Post.scss"
import GlobalService from "~/utils/rss";

function Post() {
    const {post} = useParams()
    const URL = process.env.REACT_APP_URL_THANHNIEN + post
    const [data, setData] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await NewsService.getPost(URL)
            if (response?.data)
                setData(response.data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className={clsx(styles.container)}
                 dangerouslySetInnerHTML={{__html: GlobalService.getPost(data)}}></div>
            <div className={clsx(styles.source)}>
                <a href={process.env.REACT_APP_URL_THANHNIEN}>#{process.env.REACT_APP_URL_THANHNIEN}</a>
            </div>
        </div>
    )
}

export default Post