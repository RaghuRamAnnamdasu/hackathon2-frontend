// import PublicIcon from '@mui/icons-material/Public';

// import "./navbar.css";
import { NavBar } from '../NavBar';
import { AllQuestionsWrapper } from "./allQuestions";

import "./allQuestions.css";

export function QuestionsWrapper() {
    return (
        <div className='bodyContent'>
            <NavBar />
            <AllQuestionsWrapper />
        </div>
    );
}
