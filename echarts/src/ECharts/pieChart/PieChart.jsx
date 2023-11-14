import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { useWindowContext } from "../../WindowContext";
import { pieChartHandlers, pieOption } from "./setPieChart";

let myChart = null;

function PieChart() {
  const { clientHeight, clientWidth } = useWindowContext();
  const canvas = useRef(null);

  useEffect(function () {
    myChart = echarts.init(canvas.current);
    myChart.setOption(pieOption);

    pieChartHandlers(myChart);
    return () => myChart.dispose();
  }, []);

  useEffect(
    function () {
      myChart.resize();
    },
    [clientWidth, clientHeight]
  );

  return (
    <>
      <div
        ref={canvas}
        style={{
          // width: "100%",
          height: "100vh",
        }}
      ></div>
    </>
  );
}

export default PieChart;
