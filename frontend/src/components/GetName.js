import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";

const GetName = () => {
  const contract = useContext(ContractContext);

  let [name, setName] = useState({
    name: "",
  });

  const getName = async () => {
    const name = await contract.functions.name();
    setName({
      name: name[0],
    });
  };

  useEffect(() => {
    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex ai-center fd-column padding-t-20 padding-b-10">
      <h1 className="fs-2p5 fc-yellow margin-b-5">Box name</h1>
      <span className="fs-2 fc-white">{name.name}</span>
    </div>
  );
};

export default GetName;
