import logo from "./logo.svg";
import "./App.css";
import Species from "./components/species";
import Sightings from "./components/sightings";
import Individuals from "./components/individuals";

function App() {
  return (
    <div className="App">
      <Species />
      <Sightings />
      <Individuals />
    </div>
  );
}

export default App;
