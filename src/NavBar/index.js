import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from 'react-router-dom';

import "./NavBar.css";

export function NavBar() {
    const navigate = useNavigate();
    return (
      <div className="navBar">
            <div className='questionsWrapper' onClick={() => navigate("/questions")}>
                <PublicIcon/>
                <div>Questions</div>
            </div>
            <div className='tagsWrapper' onClick={() => navigate("/tags")}>Tags</div>
            <div className='usersWrapper' onClick={() => navigate("/members")}>Users</div>
            <div className='companiesWrapper'>Companies</div>
      </div>
    );
}