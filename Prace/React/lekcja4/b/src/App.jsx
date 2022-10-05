import { useState } from "react";
import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Women from "./pages/Women";
import Men from "./pages/Men";
import DATA from "./data/students.json";

function App() {
    const [data, setData] = useState(DATA);
    return (
        <Router>
            <Link to="/">all </Link>
            <Link to="/w">w </Link>
            <Link to="/m">m </Link>
            <Routes>
                <Route path="/" element={<Home data={[data, setData]} />} />
                <Route path="/w" element={<Women data={[data, setData]} />} />
                <Route path="/m" element={<Men data={[data, setData]} />} />
            </Routes>
        </Router>
    );
}

export default App;
