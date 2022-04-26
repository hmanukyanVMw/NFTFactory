import {ethers} from "ethers"
import {useEffect, useState} from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
// import Greeter from "./Token.deployed.json";


function App() {
  const [data, setData] = useState("");
  const [contract, setContract] = useState();

  const getData = async () => {
    debugger;
    const data = await contract.greet();
    setData(data);
  }

  const updateData = async () => {
    const transaction = await contract.setGreeting(data);
    await transaction.wait();
    getData();
  }

  const initialConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts"});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const singer = provider.getSigner();
      debugger;
      // 0x5FbDB2315678afecb367f032d93F642f64180aa3
      // 0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199
      setContract(new ethers.Contract(
          "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          Greeter.abi,
          singer
      ))
    } else {
      console.log("ssadasdas");
    }
  }

  useEffect(() => {
    initialConnection()
  }, [])


  return (
    <div  className="App">
      <button onClick={getData} >Get Data</button>
      <button onClick={updateData} >set Data</button>
      <input onChange={e => setData(e.target.value)} placeholder="New Greeting" />
      <header className="App-header">
        <p>
          {data}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;



