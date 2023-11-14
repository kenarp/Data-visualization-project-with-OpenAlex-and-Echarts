import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import { useWindowContext } from "../../WindowContext";
import barOption from "./setBarChart";
import { allConceptsObj, top12Concepts } from "../../../data/pieDataImport";
import styles from "./BarChart.module.css";
import barColorPalette from "./barColors";

let myChart = null;

function BarChart() {
  const { clientHeight, clientWidth } = useWindowContext();
  const canvas = useRef(null);
  const [conceptIndex, setConceptIndex] = useState(null);
  const conceptName = Object.keys(top12Concepts)[conceptIndex];
  const description = allConceptsObj[conceptName]?.description;
  const conceptColor = barColorPalette[conceptIndex];
  const conceptLevel = allConceptsObj[conceptName]?.level;

  useEffect(function () {
    myChart = echarts.init(canvas.current);
    myChart.setOption(barOption);
    return () => myChart.dispose();
  }, []);

  useEffect(
    function () {
      function setConcept(event) {
        const pointInPixel = [event.offsetX, event.offsetY];
        const pointInCanvas = myChart.convertFromPixel("polar", pointInPixel);
        const isInPolar = myChart.containPixel("polar", pointInPixel);
        if (isInPolar) {
          const dataIndex = pointInCanvas[1];
          if (dataIndex !== conceptIndex) {
            setConceptIndex(dataIndex);
          }
        }
      }
      myChart.getZr().on("mousemove", setConcept);
      return () => myChart.getZr()?.off("mousemove", setConcept);
    },
    [conceptIndex]
  );
  useEffect(
    function () {
      myChart.resize();
    },
    [clientWidth, clientHeight]
  );

  return (
    <>
      <a
        className={styles.githubLink}
        href="https://github.com/kenarp/ThreeJS-Venice-Gondola-Design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/github-mark.svg" alt="Github Repo" /> GitHub repository
      </a>
      <div
        ref={canvas}
        style={{
          // width: "100%",
          height: "100vh",
        }}
        className={styles.chart}
      ></div>
      {conceptName ? (
        <div className={styles.concept}>
          <h3 style={{ color: conceptColor }}>{conceptName}</h3>
          <p className={styles.conceptLevel}>
            - OpenAlex level {conceptLevel} concept
          </p>
          <p className={styles.subtitle}>Description:</p>
          <div className={styles.conceptDescription}>
            <p>
              <i>
                {description.charAt(0).toUpperCase() + description.slice(1)}
              </i>
            </p>
            <div
              className={styles.borderLine}
              style={{ borderLeft: `0.2em solid ${conceptColor}` }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BarChart;
