import { BrowserRouter, Route, Routes } from 'react-router-dom';
import External from '../components/templates/External';
import NewUser from '../pages/professional/NewProfessional';
import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
import Home from '../pages/home/Home';
import Schedule from '../pages/schedule/Schedule';
import Chat from '../pages/chat/Chat';
import NoMatch from '../components/molecules/NoMatch';
import NewSchedule from '../pages/schedule/NewSchedule';
import FormSchedule from '../pages/schedule/FormSchedule';

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      <Route path="/main" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="agenda" element={<Schedule />} />
        <Route path="nova-agenda" element={<NewSchedule />} />
        <Route path="chat" element={<Chat />} />
        <Route path="form" element={<FormSchedule />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
