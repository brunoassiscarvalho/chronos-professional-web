import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
import NoMatch from '../components/molecules/NoMatch';

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="main/*" element={<Main />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
