import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Todos from "./components/Todos";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard/>} />
            <Route path="todos" element={<Todos />} />
          </Route>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
