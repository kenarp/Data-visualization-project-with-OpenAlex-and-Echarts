import BarChart from "./ECharts/barChart/BarChart";
import PieChart from "./ECharts/pieChart/PieChart";
import { WindowContextProvider } from "./WindowContext";

function App() {
  return (
    <WindowContextProvider>
      <BarChart />
      <PieChart />
    </WindowContextProvider>
  );
}

export default App;
