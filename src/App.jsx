import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} replace />}></Route>
      <Route path={"/login"} element={<LoginPage />} />
      <Route
        path={"/tasks"}
        element={
          isAuthenticated ? <TasksPage /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default App;
