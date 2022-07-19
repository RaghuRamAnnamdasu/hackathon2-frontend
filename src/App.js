import { Route, Routes } from 'react-router-dom';

import { Header } from './Header/index';
import { QuestionsWrapper } from './QuestionsWrapper/index';
import { Login } from './Login';
import { SignUp } from './SignUp';

import './App.css';
import { SingleQuestionPage } from './SingleQuestionPage';
import { AskQuestion } from './AskQuestion';
import { DefaultPage } from './DefaultPage';
import { RegisterdUsers } from './RegisteredUsers';
import { Tags } from './Tags';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<DefaultPage />}/>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/questions" element={<QuestionsWrapper />} />
        <Route path="/questions/:quesionId" element={<SingleQuestionPage />} />
        <Route path="/questions/askquestion" element={<AskQuestion />} />
        <Route path="/members" element={<RegisterdUsers />}/>
        <Route path="/tags" element={<Tags />}/>
      </Routes>
    </div>
  );
}

export default App;