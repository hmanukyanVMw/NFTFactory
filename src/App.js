import {ethers} from "ethers"
import {useEffect, useState} from "react";
import "./App.css";
import NFTFactory from "./artifacts/contracts/NFTFactory.sol/NFTFactory.json";
import NFTFactoryWithAddress from "./NFTFactory.deployed.json";


function App() {
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState("");
  const [cost, setCost] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [contract, setContract] = useState();
  const [error, setError] = useState("");

  const mint = async (isForOwner) => {
    if (inputValue) {
      const options = {
        value: ethers.utils.parseEther(inputValue),
        // from: owner //@TODO when need to change owner msg.from address
      }
      try {
        const transaction = isForOwner
            ? await contract.mintForOwner(options)
            : await contract.mint(senderAddress, options)

        await transaction.wait();
        setError('');

        await initialConnection();
      } catch (e) {
        setError(e.data !== undefined ? e.data.message : e.message);
      }
    } else {
      alert("Fill input value")
    }
  }

  const initialConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const data = await window.ethereum.request({ method: "eth_requestAccounts"});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const singer = provider.getSigner();

      const network = await provider.getNetwork();
      let contract;
      if (network.name === "rinkeby") {
        contract = new ethers.Contract(
          NFTFactoryWithAddress.address,
          NFTFactoryWithAddress.abi,
          singer
        );
      } else {
        contract = new ethers.Contract(
          NFTFactoryWithAddress.address,
          NFTFactory.abi,
          singer
        );
      }

      setContract(contract);
      setOwner(data[0]);

      const costHexadecimal = await contract.cost();
      convertAndSetCost(costHexadecimal);

      const balance = await provider.getBalance(data[0]);

      setBalance(ethers.utils.formatEther(balance));
    } else {
      console.log("ssadasdas");
    }
  }

  useEffect(  () => {
    initialConnection();
  }, [])

  const withdraw = async () => {
    try {
      const withdraw = await contract.withdraw();
      await withdraw.wait()

      await initialConnection();
      setError('');
    } catch (e) {
      setError(e.data !== undefined ? e.data.message : e.message);
    }

  }

  const convertAndSetCost = (costHexadecimal) => {
    const amountByEther = ethers.utils.formatEther(costHexadecimal);
    setCost(amountByEther);
  }

  const updateCost = async () => {
    if (inputValue) {
      try {
        const transactionCost = await contract.setCost(ethers.utils.parseEther(inputValue) );
        await transactionCost.wait();

        await initialConnection();
      } catch (e) {setError(e.data !== undefined ? e.data.message : e.message);}
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="error">{error}</div>
        <input className="inputAmount" type="number" onChange={e => setInputValue(e.target.value)}
               placeholder="amount" />
        <div style={{display: 'flex', padding: '5px'}}>
          <button onClick={() => mint(true)} >mint for owner</button>
          <button onClick={updateCost} >update Cost</button>
        </div>

        <br/>
        <div className="mintForm">
          <input onChange={e => setSenderAddress(e.target.value)}
                 placeholder="mint address" />
          <button className="buttonSuccess" onClick={() => mint(false)} >mint</button>
        </div>

        <br/>
        <h3>Cost value is a: {cost} Ether</h3>
        <h3>Balance is a: {balance} Ether</h3>
        {/*<button onClick={get} >update balance</button>*/}
        <br />
        <button className="buttonSuccess" onClick={withdraw} > withdraw </button>
      </header>
    </div>
  );
}

export default App;



