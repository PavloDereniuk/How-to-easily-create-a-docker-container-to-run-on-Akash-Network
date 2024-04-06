import akashLogo from "./assets/akash-red.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={akashLogo} className="logo react" alt="Akash Network" />
        </a>
      </div>
      <a href="https://akash.network/" target="_blank">
        <h1>Discover Akash Network</h1>
      </a>
      <div className="card"></div>
    </>
  );
}

export default App;
