import { useContext, useState } from "react";
import { ContractContext } from "../context/contract";

const SetName = () => {
  const contract = useContext(ContractContext);

  let [inputValue, setInputValue] = useState({
    value: "",
  });

  const setName = async () => {
    await contract.functions.setName(inputValue.value);
    setInputValue({
      value: "",
    });
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue({
      value: event.target.value,
    });
  };

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-yellow margin-b-5">Set name</h1>
      <label className="fs-1p6 margin-b-1 fc-white">Name:</label>
      <input
        className="fs-1p6 margin-b-2 padding-0p5"
        onChange={handleInputChange}
        value={inputValue.value}
      />
      <button
        className="fs-1p6 padding-button bg-yellow fc-black yellow-border-2 border-radius-1-r"
        onClick={setName}
      >
        Submit
      </button>
    </div>
  );
};

export default SetName;
