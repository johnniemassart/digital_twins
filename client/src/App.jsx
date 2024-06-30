import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/:username" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
