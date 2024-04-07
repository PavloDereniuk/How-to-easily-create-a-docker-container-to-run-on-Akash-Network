import akashLogo from "./assets/akash-red.svg";
import "./App.css";

function App() {
  return (
    <>
      <a href="https://akash.network/" target="_blank">
        <img src={akashLogo} className="logo" alt="Akash Network" />
      </a>
      <a href="https://akash.network/" target="_blank">
        <h1>Discover Akash Network</h1>
      </a>
    </>
  );
}

export default App;
