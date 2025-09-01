import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import CreateAccount from './components/auth/CreateAccount';
import Users from './components/users/Users';
import UserForm from './components/users/UserForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
