import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
//Compnets
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import ItemDetail from "./components/ItemDetail/ItemDetail";
function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product/:id" element={<ItemDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
