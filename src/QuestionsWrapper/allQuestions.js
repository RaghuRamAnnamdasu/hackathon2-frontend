import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

import "./allQuestions.css";


export function AllQuestionsWrapper() {
    const navigate = useNavigate();
    const[questionsData, setQuestionsData] = useState([]);
    useEffect(function() {
        fetch(`${API}/questions/`)
            .then((data)=>data.json())
            .then((questionsData)=>setQuestionsData(questionsData))
            .catch(() => {
                console.log("error")
            })
    }, []);

    const askQuestion = () => {
        var userDetails = localStorage.getItem("user");
        userDetails = JSON.parse(userDetails);
        if(userDetails && userDetails.token) {
            navigate("/questions/askquestion");
        } else {
            navigate("/users/login");
        }
    }

    return (
        <div className='questionsBodyContent'>
          <div className="questionsHeader">
            <h1>All Questions</h1>
            <Button type="button" variant="contained" onClick={() => askQuestion()}>Ask Question</Button>
          </div>
          <div className="questionsCount">{questionsData.length} Questions</div>
          <div>
            {questionsData.map((question, index) => {
                return (
                    <div className="questionsContent" key={index}>
                        <div className="questions-left-part">
                            <div className="votes">{question.votes} votes</div>
                            <div className="answers">{question.Answers ?  question.Answers.length : 0} answers</div>
                            <div className="views">{question.views} views</div>
                        </div>
                        <div className="questions-main-part">
                            <div className="questionTitle" onClick={() => navigate(`${question.question_id}`)}>{question.question_title}</div>
                            <div className="questionBody">{question.question_body}</div>
                            <div className="questionsContentFooter">
                                <div className="questionTagsWrapper">
                                    {question.tags.map((tag, index) => {
                                        return (
                                            <div className="questionTag" key={index}>{tag}</div>
                                        );
                                    })}
                                </div>
                                <div className="askedBy">{question.posted_by} <span>asked</span></div>
                            </div>
                        </div>
                    </div>
                );
            })}
          </div>
        </div>
    );
}