import { useState, useEffect } from "react";
import getWallet from "../resources/getWallet";

const Home = () => {
  let [wallet, setWallet] = useState({
    account: "",
  });

  const getAccount = async () => {
    const account = await getWallet();
    const splittedAccount = `...${account.slice(-5)}`;
    setWallet({
      account: splittedAccount,
    });
  };

  useEffect(() => {
    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex ai-center fd-column padding-t-20 padding-b-10">
      <h1 className="fs-2p5 fc-yellow margin-b-5">Upgraded Box</h1>
      <span className="fs-2 fc-white">Account: {wallet.account}</span>
    </div>
  );
};

export default Home;
