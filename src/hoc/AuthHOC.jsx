import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoProvider from "../context/TodoContext";
import useAuth from "../hooks/useAuth";

function AuthHOC(WrappedComponent) {
  function Component(params) {
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!auth.authenticated) {
        navigate("/signin");
      }
    }, [auth.authenticated, navigate]);

    return (
      <TodoProvider>
        <WrappedComponent />
      </TodoProvider>
    );
  }

  return Component;
}

export default AuthHOC;
