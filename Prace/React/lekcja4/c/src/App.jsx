import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import IdPage from "./pages/IdPage";

function App() {
    return (
        <Router>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((e) => (
                <Link key={e} to={`/${e}`}>
                    {e}{" "}
                </Link>
            ))}
            <Routes>
                <Route path="*" element={<>Invalid page</>} />
                <Route path="/:id" element={<IdPage />} />
            </Routes>
        </Router>
    );
}

export default App;
