import {ethers} from "ethers"
import {useEffect, useState} from "react";
import "./App.css";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import NFTFactory from "./artifacts/contracts/NFTFactory.sol/NFTFactory.json";
// import Greeter from "./Token.deployed.json";
import NFTFactoryAdd from "./NFTFactory.deployed.json";


function App() {
  const [cost, setCost] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [contract, setContract] = useState();
  const [error, setError] = useState("");

  const mintByOwner = async () => {
    if (inputValue) {
      const options = {value: ethers.utils.parseEther(inputValue)}
      try {
        const transaction = await contract.mintFromOwner(options);
        await transaction.wait();
        setError('');
      } catch (e) {
        setError(e.data !== undefined ? e.data.message : e.message);
        alert(e.data.message);
      }
      debugger

    } else {
      alert("Fill input value")
    }

  }

  const initialConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts"});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const singer = provider.getSigner();

      const contract = new ethers.Contract(
          NFTFactoryAdd.address,
          NFTFactory.abi,
          singer
      );
      const costHexadecimal = await contract.cost();
      convertAndSetCost(costHexadecimal);

      setContract(contract);
    } else {
      console.log("ssadasdas");
    }
  }

  useEffect(  () => {
    initialConnection();
  }, [])

  const getCost = async () => {
    const costHexadecimal = await contract.cost();
    convertAndSetCost(costHexadecimal);
  }

  const convertAndSetCost = (costHexadecimal) => {
    const amountByEther = ethers.utils.formatEther(costHexadecimal);
    setCost(amountByEther);
  }

  const updateCost = async () => {
    if (inputValue) {
      const transactionCost = await contract.setCost(ethers.utils.parseEther(inputValue) );
      debugger;
      await transactionCost.wait();
      await getCost();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p className="error">{error}</p>
        <input className="input-amount" type="number" onChange={e => setInputValue(e.target.value)}
               placeholder="amount" />
        <br/>
        <button onClick={mintByOwner} >MintByOwner</button>
        <br/>
        <button onClick={updateCost} >update Cost</button>
        <h3>Cost value is a: {cost} Ether</h3>
      </header>
    </div>
  );
}

export default App;



