import { useEffect, useState } from "react";
import { API } from "../global";
import { NavBar } from "../NavBar";

import "./registerUser.css";


export function RegisterdUsers() {
    const [usersData, setUsersData] = useState([]);
    useEffect(function() {
        fetch(`${API}/members`)
            .then((data)=>data.json())
            .then((usersData)=>setUsersData(usersData))
            .catch(() => {
                console.log("error")
            })
    }, []);
    return (
        <div className='bodyContent'>
            <NavBar/>
            <div className="membersContainer">
            {usersData && usersData.map((user, index) => {
                    return (
                        <div className="userWrapper" key={index}>
                            <div className="profileImage">{user.displayName && user.displayName.charAt(0)}</div>
                            <div>
                                <div className="memberName">{user.displayName}</div>
                                <div className="memberEmail">{user.email}</div>
                            </div>
                        </div>
                    );
            })}
          </div>
        </div>
    );
}