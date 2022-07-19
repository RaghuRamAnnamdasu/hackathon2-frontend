// import PublicIcon from '@mui/icons-material/Public';

// import "./navbar.css";
import React, { useEffect, useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBar } from '../NavBar';

import "../QuestionsWrapper/allQuestions.css";
import { Button } from '@mui/material';
import { API } from '../global';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export function SingleQuestionPage() {
    const navigate = useNavigate();
    const[questionData, setQuestionsData] = useState({});
    const[answer, setAnswer] = useState("");
    const[guestName, setGuestName] = useState("");
    const[guestEmail, setGuestEmail] = useState("");
    const[guestNameError, setGuestNameError] = useState("");
    const[guestEmailError, setGuestEmailError] = useState("");
    const path = useLocation().pathname;
    var questionId = path.split("/")[2];
    var userDetails = localStorage.getItem("user");
    userDetails = JSON.parse(userDetails);
    useEffect(function() {
        getQuestionWithAnswers();
    }, []);

    const getQuestionWithAnswers = () => {
        window.scrollTo (0,0);
        fetch(`${API}/questions/${questionId}`)
            .then((data)=>data.json())
            .then((questionsData)=>setQuestionsData(questionsData[0]))
            .catch(() => {
                console.log("error")
            })
    }

    const askQuestion = () => {
        if(userDetails && userDetails.token) {
            navigate("/questions/askquestion");
        } else {
            navigate("/users/login");
        }
    }

    const onAnswerChnage = (e, value) => {
        setAnswer(e.target.value);
    }

    const postAnswer = () => {
        var data = [];
        if(userDetails && userDetails.token) {
            data = [{
                "user": userDetails && userDetails.userName || "",
                "answer": answer
            }];
        } else {
            if(!guestName) {
                setGuestNameError("Name is required to post your answer");
            } 
            if(!guestEmail) {
                setGuestEmailError("Email is required to post your answer");
            }
           data = [
                {
                    "user": guestName,
                    "answer": answer,
                    "guestEmail": guestEmail
                }
            ];
        }
        if(!guestNameError && !guestEmailError) {
            fetch(`${API}/questions/${questionId}/answer`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"content-type": "application/json"}
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                console.log(jsonResponse.message);
                if(jsonResponse.message) {
                    console.log(jsonResponse.message);
                } else {
                    navigate(`/questions/${questionId}`);
                    setAnswer("");
                    setGuestName("");
                    setGuestEmail("");
                    getQuestionWithAnswers();
                }
            }).catch (error => {
                console.log(error)
            })
        }
        
        
        // .then((res) => {
        //     navigate(`/questions/${questionId}`);
        // }).catch(() => {
        //     console.log("error")
        // })
    }

    return (
        <div className='bodyContent'>
            <NavBar />
            <div>
                <div className=''>
                    {Object.keys(questionData).length &&
                        <>
                            <div className='singleQuestionWrapper questionsContent'>
                                <div className="questions-left-part">
                                    <div className='questionsArrowIcons'>
                                        <ArrowDropUpIcon fontSize='large'/>
                                            <div className='questionVotes'>{questionData["votes"]}</div>
                                        <ArrowDropDownIcon fontSize='large'/>
                                    </div>
                                    {/* <div className="votes">{questionData["votes"]} votes</div>
                                    <div className="answers">{questionData["Answers"] && questionData["Answers"].length} answers</div>
                                    <div className="views">{questionData["views"]} views</div> */}
                                </div>
                                <div>
                                    <div className='questionTitleWrapper'>
                                        <h2 className='singleQuestionTitle'>{questionData["question_title"]}</h2>
                                        <Button type="button" variant='contained' onClick={() => askQuestion()}>Ask Question</Button>
                                    </div>
                                    <div>{questionData["question_body"]}</div>
                                    <div className="questionTagsWrapper">
                                        {questionData.tags && questionData.tags.map((tag, index) => {
                                            return (
                                                <div className="questionTag" key={index}>{tag}</div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className='singleQuestionAnswercontainer'>
                                <h2>{questionData["Answers"].length} Answers</h2>
                                {questionData["Answers"].map((data, index) => {
                                    return (
                                        <div className='answercontainer'>
                                            <div className='arrowIcons'>
                                                <ArrowDropUpIcon fontSize='large'/>
                                                <ArrowDropDownIcon fontSize='large'/>
                                            </div>
                                            <div>{data.answer}</div>
                                        </div>
                                    );
                                })}
                            </div>
                                <div className='answerWrapper'>
                                    <div>
                                    <h2>Your Answer</h2>
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        minRows={8}
                                        placeholder="Type your answer here"
                                        style={{ width: 600 }}
                                        onChange={(e, value) => onAnswerChnage(e, value)}
                                        value={answer}
                                    />
                                    </div>
                                    {!userDetails ?
                                        <div className='postAsAGuestWrapper'>
                                            <h3>Post as a Guest</h3>
                                            <div className='postNameWrapper'>
                                                <label htmlFor='guestName'>Name</label>
                                                <input type="text" id="guestName" className={guestNameError ? "errorBorder" : ""}
                                                    onChange={(e) => {
                                                        setGuestName(e.target.value);
                                                        setGuestNameError("");
                                                    }} value={guestName}/>
                                                {guestNameError ? <div className='guestError'>{guestNameError}</div> : ""}
                                            </div>
                                            <div className='postEmailWrapper'>
                                                <label htmlFor='guestEmail'>Email</label>
                                                <input type="email" id="guestEmail" className={guestEmailError ? "errorBorder" : ""}
                                                    onChange={(e) => {
                                                        setGuestEmail(e.target.value);
                                                        setGuestEmailError("");
                                                    }} value={guestEmail}/>
                                                {guestEmailError ? <div className='guestError'>{guestEmailError}</div> : ""}
                                            </div>
                                        </div> : ""
                                    }
                                    <Button className="postAnswer" type="button" variant="contained" onClick={() => postAnswer()}>Post Your Answer</Button>
                                </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}