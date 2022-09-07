import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContractContext, contract } from "./context/contract";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import RetrieveContent from "./components/RetrieveContent";
import IncrementContent from "./components/IncrementContent";
import GetName from "./components/GetName";
import SetName from "./components/SetName";
import GetV4Name from "./components/GetV4Name";

const App = () => {
  return (
    <div className="bg-black min-height-100">
      <NavBar />
      <ContractContext.Provider value={contract}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/retrieveContent" element={<RetrieveContent />} />
          <Route path="/incrementContent" element={<IncrementContent />} />
          <Route path="/getName" element={<GetName />} />
          <Route path="/setName" element={<SetName />} />
          <Route path="/getV4Name" element={<GetV4Name />} />
        </Routes>
      </ContractContext.Provider>
    </div>
  );
};

export default App;
