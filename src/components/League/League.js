import {ethers} from "ethers"
import {useEffect, useState} from "react";
import "./Legue.css";
import ArmenianLeagueTicketsFactory  from "../../artifacts/contracts/ArmenianLeagueTickets.sol/ArmenianLeagueTickets.json";
import ArmenianLeagueTicketsFactoryRinkeby from "../../ArmenianLeagueTicketsFactory.deployed.json";

function League() {
  const [contractData, setContractData] = useState({
    owner: '',
    contract: {},
  });
  const [error, setError] = useState("");

  const {contract, owner} = contractData;

  const mint = async (id) => {
      try {
        const uri = await contract.uri(id)
        const transaction = await contract.mint(owner, id, 1);
        await transaction.wait();
        debugger;

        if (!uri) {
          const transactionSetURI = await contract.setURI(id, `${ArmenianLeagueTicketsFactoryRinkeby.baseUrl + id}`)
          transactionSetURI.wait();
          setError('');
        }
        await initialConnection();
      } catch (e) {
        setError(e.data !== undefined ? e.data.message : e.message);
      }
  }

  const initialConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const data = await window.ethereum.request({method: "eth_requestAccounts"});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const singer = provider.getSigner();
      const network = await provider.getNetwork();

      debugger;
      let contract;
      if (network.name === "rinkeby") {
        contract = new ethers.Contract(
          ArmenianLeagueTicketsFactoryRinkeby.address,
          ArmenianLeagueTicketsFactoryRinkeby.abi,
          singer
        );
      } else {
        contract = new ethers.Contract(
          ArmenianLeagueTicketsFactoryRinkeby.address,
          ArmenianLeagueTicketsFactory.abi,
          singer
        );
      }


      setContractData({
        contract,
        owner: data[0],
      });
    } else {
      console.log("Your browser does not support metamask. Please use other browser");
    }
  }

  useEffect(  () => {
    initialConnection();
  }, [])



  return (
    <div className="App">
      <p>{error}</p>
      <ul className="commandsList">
        <li>
          <button onClick={() => mint(0)}>Shirak</button>
        </li>
        <li>
          <button onClick={() => mint(1)}>Bananc</button>
        </li>
        <li>
          <button onClick={() => mint(2)}>Pyunik</button>
        </li>
        <li onClick={() => mint(3)}>
          Alashkert
        </li>
        <li onClick={() => mint(4)}>
          Ararat
        </li>
        <li onClick={() => mint(5)}>
          Real Madrid
        </li>
        <li onClick={() => mint(6)}>
          Ganzasar
        </li>
        <li onClick={() => mint(7)}>
          Lori
        </li>
        <li onClick={() => mint(8)}>
          Mika
        </li>
        <li onClick={() => mint(9)}>
          Ulic
        </li>
      </ul>
    </div>
  );
}

export default League;



