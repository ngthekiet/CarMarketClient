import {Link} from "react-router-dom";
import clsx from "clsx";

import styles from "~/pages/News/NewsItem/NewsItem.module.scss"
import GlobalService from "~/utils/rss";

function NewsItem({data}) {
    return (
        <div className={clsx(styles.newsItem)}>
            <div className={clsx(styles.contentItem)}>
                <Link to={`/news/${GlobalService.getLink(data.link)}`}>
                    <div dangerouslySetInnerHTML={{__html: GlobalService.getImage(data.description)}}></div>
                </Link>
                <div className={clsx(styles.content)}>
                    <Link to={`/news/${GlobalService.getLink(data.link)}`}
                          className={clsx(styles.title)} dangerouslySetInnerHTML={{__html: data.title}}>
                    </Link>
                    <div className={clsx(styles.description)}
                         dangerouslySetInnerHTML={{__html: GlobalService.getDescription(data.description)}}></div>
                </div>
            </div>
        </div>
    )
}

export default NewsItem