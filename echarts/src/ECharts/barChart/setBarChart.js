import getBarSeriesOption from "./barSeriesOption";
import barColorPalette from "./barColors";
import { top12Concepts } from "../../../data/pieDataImport";
import {
  conceptCountsByYear,
  hciTotalCounts,
} from "../../../data/barDataImport";

const legendColor = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 1,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#ff9a00", // color at 0%
    },
    {
      offset: 0.4,
      color: "#3fdcc0",
    },
    {
      offset: 0.7,
      color: "#2d6ec1",
    },
    {
      offset: 1,
      color: "#7a3d9f", // color at 100%
    },
  ],
  global: false, // default is false
};
const openAlexIcon =
  "path://M108.23,102.77c-.65-7.26,1.89-13.26-2-18.75-6.01-3.4-12.28-9.86-18.49-10.15-5.58-.19-11.4,5.4-17.05,8.56-10.9,6.1-21.8,12.2-32.6,18.47-7.29,5.79-25.14-9.74-33.18-13.32C-3.2,81.49,1.34,62.19,.66,52.66c.13-2.46,2.06-5.81,4.16-7.03C30.88,30.49,57.08,15.57,83.42,.94c2.26-1.26,6.47-1.25,8.71,.03,25.78,14.64,51.33,29.66,76.99,44.49,2.99,1.73,4.06,4.07,4.06,7.36-.04,41.16-.04,82.32,.01,123.48,0,3.54-1.33,5.82-4.43,7.65-107.98,60.62-54.75,58.97-163.89,.63-3.08-1.75-4.52-4-4.46-7.62,1.42-9.87-3.68-31.52,4.29-37.6,26.18-15.59,52.57-30.84,78.86-46.25,8.13-4.36,16.38,6.36,24.67,9.66Zm-19.24-68.42c1.17,8.05-3.13,29.47,3.54,31.68,26.75,15.17,24.68,11.82,23.97,42.43-1.51,17.18-23.09-11.4-31.58-6.29-24.4,14.02-48.66,28.28-73.04,42.35-2.57,1.49-3.31,3.2-3.25,5.98,1.56,7.69-3.55,25.73,4.05,28.98,24.79,13.69,48.74,28.54,73.79,41.75,0-9.13,.17-17.6-.08-26.05-.1-3.3,1.09-5.06,3.84-6.72,14.69-8.85,29.21-17.99,43.92-26.82,2.95-1.77,3.99-3.74,3.98-7.16-.14-27.99,0-55.99-.17-83.98-.02-3.9,1.17-6.04,4.68-7.72,6.82-3.27,13.41-7,20.18-10.58-23.22-15.36-48.61-28.37-72.65-42.8-1.25-.72-3.63-.68-4.9,.03C60.57,23.3,35.96,37.28,11.43,51.41c-1.35,.78-2.56,3-2.62,4.59-.81,30.65-2.78,22.07,22.9,37.3,0-8.6,.18-16.08-.08-23.55-.11-3.34,1.12-5.02,3.99-6.57,18.12-9.48,34.94-19.78,53.37-28.84Z M113.76,144.72c-9.09,5.6-17.74,10.93-26.76,16.48-9.16-5.07-18.65-10.31-29.21-16.15,35.79-19.2,21.53-20.81,55.97-.33Z";

function tooltipFormatterCallback(params) {
  // console.log(params);
  const componentType = params.componentType || params[0].componentType;
  if (componentType !== "series") {
    return;
  }
  let papers = {};
  let allSeries = [];
  if (params.length) {
    allSeries = [...params];
  } else {
    allSeries.push(params);
  }
  allSeries.forEach((series) => {
    const category = series.seriesName;
    const year = series.value.year;
    papers[category] = {};
    papers[category]["counts"] =
      conceptCountsByYear[year][series.dataIndex][series.seriesName];
    papers[category]["percentage"] = series.value[category].toFixed(2) + "%";
  });

  const conceptName = params.name || params[0].name;
  const conceptColor = params.color || params[0].color;

  const reduceCallback = (prev, cur) => {
    const papersCount = `${cur}: <br><i><span style="color:${conceptColor}">${papers[cur]["counts"]}</span></i> papers`;
    const percentage = ` - <i><span style="color:${conceptColor}">${papers[cur]["percentage"]}</span></i> in HCI papers<br><br>`;
    return prev + papersCount + percentage;
  };

  const value = Object.keys(papers).reduce(reduceCallback, "<br>");
  // console.log(value);

  const fullText = `<b style="color:${conceptColor}">${conceptName}</b> ${value} `;
  return fullText;
}

function tooltipPositionCallback(point, params, dom, rect, size) {
  const x = size.viewSize[0] / 2 - dom.offsetWidth / 2;
  const y = size.viewSize[1] / 2 - dom.offsetHeight / 2;
  return { left: x, top: y };
}

const baseOption = {
  title: {
    text: "Percentage Change of Papers in Top12 HCI sub-concepts from 2003-2022",
    left: "2%",
    top: "3%",
    textStyle: {
      overflow: "break",
      width: document.documentElement.clientWidth * 0.25,
      lineHeight: 25,
    },
  },
  legend: {
    data: [
      {
        name: "All works",
        // icon: openAlexIcon,
        itemStyle: {
          color: legendColor,
        },
      },
      {
        name: "Works from educational institutions",
        // icon: eduIcon,
        itemStyle: {
          color: "#ffffff",
          // color: legendColor,
        },
      },
      {
        name: "Works from companies",
        itemStyle: {
          color: "#ffffff",
        },
      },
    ],
    left: "2%",
    top: "19%",
    orient: "vertical",
    selected: {
      "All works": true,
      "Works from educational institutions": false,
      "Works from companies": false,
    },
  },
  color: barColorPalette,
  z: 0,
  polar: {
    radius: ["20%", "70%"],
    center: ["55%", "45%"],
  },
  // aria: {
  // enabled: true,
  // decal: {
  // show: true,
  // },
  // },
  radiusAxis: {
    inverse: true,
    // scale: true,
    max: 40,
    axisLine: {
      show: false,
    },
    axisTick: {
      // show: false,
    },
    axisLabel: {
      // inside: true,
      // showMaxLabel: false,
      // showMinLabel: false,
      color: "#aaaaaa",
      formatter: "{value}%",
      // verticalAlign: "top",
      verticalAlign: "bottom",
      margin: 1,
      rotate: 15,
    },
  },
  angleAxis: {
    type: "category",
    data: Object.keys(top12Concepts).map((concept, index) => {
      return {
        value: concept,
        textStyle: {
          color: barColorPalette[index],
          overflow: "break",
          width: 80,
          fontSize: 14,
        },
      };
    }),
    startAngle: 105,
    // triggerEvent: true,
    // boundaryGap: true,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      // show: true,
    },
    splitArea: {
      show: true,
      // interval: 1,
      areaStyle: {
        color: ["rgba(208, 208, 208, 0.2)", "rgba(255, 255, 255,0.2)"],
      },
    },
    axisPointer: {
      show: true,
      label: {
        show: false,
      },
      // triggerTooltip: false,
      type: "shadow",
      shadowStyle: {
        color: "rgba(32, 64, 64, 0.2)",
      },
    },
  },
  tooltip: {
    // trigger: "axis",
    // trigger: "item",
    // alwaysShowContent: true,
    textStyle: {
      width: "10%",
      // height: 100,
      // overflow: "break",
      padding: 0,
    },
    position: tooltipPositionCallback,
    formatter: tooltipFormatterCallback,
    extraCssText:
      "max-width: 25%;  white-space: normal; word-wrap: break-word;",
  },
};

const barOption = {
  // This is the properties of `baseOption`.
  ...baseOption,
  timeline: {
    // axisType: "category",
    padding: 0,
    symbol: "diamond",
    symbolSize: 10,
    // each item in `timeline.data` corresponds to each `option` in `options` array.(years)
    data: Object.keys(hciTotalCounts),
    top: "90%",
    left: "20%",
    right: "10%",
    // bottom: "5%",
    // autoPlay: true,
    playInterval: 1000,
    label: {
      // fontSize: 12,
      // rotate: 30,
      // padding: [40, 0, 0, 0],
      // align: "right",
    },
    checkpointStyle: {
      // symbol: "diamond",
      symbolSize: 12,
    },
  },
  // switchableOption's:
  options: Object.keys(hciTotalCounts).map((year) => {
    return {
      legend: {
        formatter: `${year} {name}`,
      },

      series: [
        "All works",
        "Works from educational institutions",
        "Works from companies",
      ].map((category) => {
        let seriesOption = getBarSeriesOption(category);
        return seriesOption;
      }),
      dataset: {
        dimensions: [
          "concept",
          "All works",
          "Works from educational institutions",
          "Works from companies",
        ],
        source: conceptCountsByYear[year].map((concept) => {
          return {
            concept: concept.concept,
            "All works":
              (concept["All works"] / hciTotalCounts[year]["total_works"]) *
              100,
            "Works from educational institutions":
              (concept["Works from educational institutions"] /
                hciTotalCounts[year]["education_works"]) *
              100,
            "Works from companies":
              (concept["Works from companies"] /
                hciTotalCounts[year]["company_works"]) *
              100,
            year: year,
          };
        }),
      },
    };
  }),
};

export default barOption;
