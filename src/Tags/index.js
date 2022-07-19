import { useEffect, useState } from "react";
import { API } from "../global";
import { NavBar } from "../NavBar";

import "./tags.css";


export function Tags() {
    const [tagsData, setTagsData] = useState([]);
    useEffect(function() {
        fetch(`${API}/tags`)
            .then((data)=>data.json())
            .then((tagsData)=>setTagsData(tagsData))
            .catch(() => {
                console.log("error")
            })
    }, []);
    return (
        <div className='bodyContent'>
            <NavBar/>
            <div className="tagsContainer">
                {tagsData && tagsData.map((tag, index) => {
                    return (
                        <div className="tagPageWrapper" key={index}>
                            <div className="tagName">{tag.tagName}</div>
                            <div className="tagDescription">{tag.description}</div>
                            <div className="tag-totalQuestions">{tag.totalQuestions ? tag.totalQuestions : 0} Quesions</div>
                        </div>
                    );
                })}
          </div>
        </div>
    );
}