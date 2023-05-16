import { RecoilRoot } from "recoil";
import { MathFactsGrid } from "./components/MathFactsGrid";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <div className="App-main">
          <MathFactsGrid />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
