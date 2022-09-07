import { useContext, useState, useEffect } from "react";
import { ContractContext } from "../context/contract";
import { ethers } from "ethers";

const Home = () => {
  const contract = useContext(ContractContext);

  let [content, setContent] = useState({
    content: "",
  });

  const getContent = async () => {
    const content = await contract.functions.retrieve();
    const formatedContent = ethers.utils.formatEther(content[0]) * 1e18;
    setContent({
      content: formatedContent,
    });
  };

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex ai-center fd-column padding-t-20 padding-b-10">
      <h1 className="fs-2p5 fc-yellow margin-b-5">Box Content</h1>
      <span className="fs-2 fc-white">{content.content}</span>
    </div>
  );
};

export default Home;
