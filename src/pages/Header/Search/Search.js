import clsx from "clsx";
import styles from "./Search.module.scss";
import {FaSearch} from "react-icons/fa";
import SearchItem from "./SearchItem";
import {useEffect, useState} from "react";
import SearchService from "../../../services/searchServices";
import {RxDividerVertical} from "react-icons/rx";


function Search() {
    const [text, setText] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        let timeout
        const fetchData = async () => {
            timeout = setTimeout(async () => {
                if (text !== "") {
                    const response = await SearchService.search(text)
                    setData(response.data)
                    return
                }
                setData([])
            }, 300)
        }
        fetchData()
        return () => {
            clearTimeout(timeout)
        }
    }, [text])

    const handleText = (e) => {
        setText(e.target.value)
    }

    return (
        <div className={clsx(styles.search)}>
            <div className={clsx(styles.containerSearch)}>
                <input onChange={handleText} placeholder={"Search"} className={clsx(styles.boxSearch)} type={"text"}/>
                <div className={clsx(styles.line)}><RxDividerVertical/></div>
                <span className={clsx(styles.searchIcon)}><FaSearch/></span>
            </div>
            <div className={clsx(styles.listSearch)}>
                {data.map((result) => (
                    <SearchItem key={result.id} data={result}/>
                ))}
            </div>
        </div>
    )
}

export default Search