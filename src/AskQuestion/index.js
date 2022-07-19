import { Button, TextareaAutosize, TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

import { Tags } from "./tags";

import "./askQuestion.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../global";


export function AskQuestion() {
    const navigate = useNavigate();
    const[title, setTitle] = useState("");
    const[body, setBody] = useState("");
    const[tags, setTags] = useState([]);

    const onTitleChange = function(e) {
        setTitle(e.target.value);
    }

    const onBodyChange = function(e) {
        setBody(e.target.value);
    }

    const onTagsChange = function(e, value) {
        setTags(value);
    }

    const postQuestion = function() {
        var tagsList = [];
        tags.map((tag) => {
            tagsList.push(tag.title);
            return tagsList
        }) 
        var userDetails = localStorage.getItem("user");
        var data = [{
            posted_by: userDetails && userDetails.userName || "",
            question_title: title,
            question_body: body,
            tags: tagsList,
            votes: 0,
            views: 0
        }];
        fetch(`${API}/questions/askquestion`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"}
        }).then((res) => {
            navigate("/questions");
        }).catch(() => {
            console.log("error")
        })
    }

    return (
        <div className='askQUestionPageWrapper'>
           <h2>Ask a Public Question</h2>
           <div className="askQuestionCardWrapper">
                <div className="askQuestionTitleWrapper">
                    <div className="titleText">Title</div>
                    <p>Be specific and imagine you are asking a question to another person</p>
                    <input type="text" placeholder="e.g is javascript single thread or multi thread" onChange={(e) => onTitleChange(e)} value={title}/>
                </div>
                <div className="askQuestionBodyWrapper">
                    <div className="bodyText">Body</div>
                    <p>Include all the information someone would need to answer your question</p>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        minRows={8}
                        placeholder="Type your Question here"
                        style={{ width: 600 }}
                        onChange={(e) => onBodyChange(e)}
                        value={body}
                    />
                </div>
                <div className="askQuestionTagsWrapper">
                    <div className="tagsText">Tags</div>
                    <p>Add upto 5 tags to describe what your question is about</p>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={Tags}
                        onChange={(e, value) => onTagsChange(e, value)}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField {...params}  placeholder="e.g(React, Angular, SQL)" />
                        )}
                        sx={{ width: '500px' }}
                        />
                </div>
           </div>
           <Button className="postQuestionButton" type="button" variant="contained" onClick={() => postQuestion()}>Post Your Question</Button>
        </div>
    );
}