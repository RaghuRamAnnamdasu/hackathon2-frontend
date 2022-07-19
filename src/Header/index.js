// import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import "./header.css";

export function Header() {
    const navigate = useNavigate();
    var userDetails = localStorage.getItem("user");
    userDetails = userDetails && JSON.parse(userDetails);
    return (
      <div className="header">
        <div className="iconWrapper" onClick={() => navigate("/")}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/512px-Stack_Overflow_icon.svg.png" alt="" />
            <div className='stackOverflowText'>Stack<span>Overflow</span></div>
        </div>
        <div className="searchWrapper">
            <input type="text" placeholder='search'/>
            {/* <SearchIcon /> */}
        </div>
        {userDetails && userDetails.token ?
            <div className='signOutWrapper'>
                <Button variant="outlined" startIcon={<PowerSettingsNewIcon />} onClick={() => {
                    localStorage.clear();
                    navigate("/");
                }}>
                    Sign Out
                </Button>
            </div> :
            <div className="loginWrapper">
                <Button type="button" variant="outlined" onClick={() => navigate("/users/login")}>Login</Button>
                <Button type="button" variant="contained" onClick={() => navigate("/users/signup")}>Sign Up</Button>
            </div>
        }

      </div>
    );
  }