import { useContext } from "react";
import { ContractContext } from "../context/contract";

const IncrementContent = () => {
  const contract = useContext(ContractContext);

  const increment = async () => {
    await contract.functions.increment();
  };

  return (
    <div className="d-flex fd-column ai-center padding-t-15 padding-b-10">
      <h1 className="fs-2p5 fc-yellow margin-b-5">Increment</h1>
      <button
        className="fs-1p6 padding-button bg-yellow fc-black yellow-border-2 border-radius-1-r"
        onClick={increment}
      >
        Increment
      </button>
    </div>
  );
};

export default IncrementContent;
