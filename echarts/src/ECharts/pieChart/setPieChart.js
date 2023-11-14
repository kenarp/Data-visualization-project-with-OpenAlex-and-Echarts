import {
  allConceptsObj,
  dataset,
  top12Concepts,
} from "../../../data/pieDataImport";
import pieSeriesOption from "./pieSeriesOption";
import pieColorPalette from "./pieColors";

// console.log(dataset);
// console.log(allConceptsObj);
// console.log(top12Concepts);

let initialRadius = 20;
let initialThickness = 15;
let hasItemSelected = false;
let selectedConcepts = [];
const conceptPos = {};
const openAlexIcon =
  "path://M108.23,102.77c-.65-7.26,1.89-13.26-2-18.75-6.01-3.4-12.28-9.86-18.49-10.15-5.58-.19-11.4,5.4-17.05,8.56-10.9,6.1-21.8,12.2-32.6,18.47-7.29,5.79-25.14-9.74-33.18-13.32C-3.2,81.49,1.34,62.19,.66,52.66c.13-2.46,2.06-5.81,4.16-7.03C30.88,30.49,57.08,15.57,83.42,.94c2.26-1.26,6.47-1.25,8.71,.03,25.78,14.64,51.33,29.66,76.99,44.49,2.99,1.73,4.06,4.07,4.06,7.36-.04,41.16-.04,82.32,.01,123.48,0,3.54-1.33,5.82-4.43,7.65-107.98,60.62-54.75,58.97-163.89,.63-3.08-1.75-4.52-4-4.46-7.62,1.42-9.87-3.68-31.52,4.29-37.6,26.18-15.59,52.57-30.84,78.86-46.25,8.13-4.36,16.38,6.36,24.67,9.66Zm-19.24-68.42c1.17,8.05-3.13,29.47,3.54,31.68,26.75,15.17,24.68,11.82,23.97,42.43-1.51,17.18-23.09-11.4-31.58-6.29-24.4,14.02-48.66,28.28-73.04,42.35-2.57,1.49-3.31,3.2-3.25,5.98,1.56,7.69-3.55,25.73,4.05,28.98,24.79,13.69,48.74,28.54,73.79,41.75,0-9.13,.17-17.6-.08-26.05-.1-3.3,1.09-5.06,3.84-6.72,14.69-8.85,29.21-17.99,43.92-26.82,2.95-1.77,3.99-3.74,3.98-7.16-.14-27.99,0-55.99-.17-83.98-.02-3.9,1.17-6.04,4.68-7.72,6.82-3.27,13.41-7,20.18-10.58-23.22-15.36-48.61-28.37-72.65-42.8-1.25-.72-3.63-.68-4.9,.03C60.57,23.3,35.96,37.28,11.43,51.41c-1.35,.78-2.56,3-2.62,4.59-.81,30.65-2.78,22.07,22.9,37.3,0-8.6,.18-16.08-.08-23.55-.11-3.34,1.12-5.02,3.99-6.57,18.12-9.48,34.94-19.78,53.37-28.84Z M113.76,144.72c-9.09,5.6-17.74,10.93-26.76,16.48-9.16-5.07-18.65-10.31-29.21-16.15,35.79-19.2,21.53-20.81,55.97-.33Z";

function formatterCallback(params) {
  const conceptName = params.data.name;
  // console.log(selectedConcepts);
  if (hasItemSelected && !selectedConcepts.includes(conceptName)) {
    return;
  }
  const conceptLevel = params.seriesName;
  let description = allConceptsObj[params.data.name].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  const fullText = `<b>${conceptName}</b> <br> -${conceptLevel}<br> <br>${description}`;
  return fullText;
}

function positionCallback(point, params, dom, rect, size) {
  const x = conceptPos.x - size.viewSize[0] / 2;
  const y = conceptPos.y - size.viewSize[1] / 2;
  // Place tooltip on the right side for concepts in the left half, and vice versa
  const obj = {};
  obj[["left", "right"][x < 0 ? 0 : 1]] = size.viewSize[0] / 2 - Math.abs(x);
  obj[["top", "bottom"][y < 0 ? 0 : 1]] = size.viewSize[1] / 2 - Math.abs(y);
  // console.log(obj);
  return obj;
}

const pieOption = {
  title: {
    text: "OpenAlex Top12 Concepts in HCI and their sub-concepts",
    right: "2%",
    top: "5%",
    textStyle: {
      overflow: "break",
      width: document.documentElement.clientWidth * 0.3,
      lineHeight: 25,
    },
  },
  tooltip: {
    trigger: "item",
    textStyle: {
      // width: 10,
      // height: 100,
      // overflow: "break",
    },
    position: positionCallback,
    formatter: formatterCallback,
    extraCssText:
      "max-width: 15%;  white-space: normal; word-wrap: break-word;",
  },
  legend: {
    data: [
      ...Object.keys(top12Concepts).map((concept, index) => {
        return {
          name: concept,
          icon: "circle",
          itemStyle: { borderWidth: 0, shadowColor: "#555555", shadowBlur: 2 },
        };
      }),
      ...dataset.map((level, levelIndex) => {
        return {
          name: `OpenAlex Level ${levelIndex + 2} Concepts in HCI`,
          icon: openAlexIcon,
          itemStyle: { borderWidth: 0, color: "#555555" },
        };
      }),
    ],
    z: 0,
    formatter: function (name) {
      const ranking = top12Concepts[name];
      const fullName = ranking ? ranking + " concept - " + name : name;
      return fullName;
    },
    orient: "horizental",
    right: "3%",
    top: "20%",
    textStyle: {
      width: document.documentElement.clientWidth * 0.25,
      overflow: "break",
    },
    // selectedMode: "multiple",
  },

  series: dataset.map((levelArr, levelIndex) => {
    const radius = [
      `${initialRadius}%`,
      `${initialRadius + initialThickness}%`,
    ];
    initialRadius += initialThickness + 2;
    initialThickness = 10;
    return {
      ...pieSeriesOption,
      z: dataset.length - levelIndex,
      center: ["40%", "50%"],
      radius,
      labelLine: {
        showAbove: true,
        // length: 45 * levelIndex,
        length2: 38 * (5 - levelIndex),
        minTurnAngle: 90,
        maxSurfaceAngle: 45,
      },
      name: `OpenAlex Level ${levelIndex + 2} Concepts in HCI`,
      data: Object.values(levelArr).map((conceptData, conceptIndex) => {
        return {
          ...conceptData,
          itemStyle: { color: pieColorPalette[levelIndex][conceptIndex] },
          select: {
            itemStyle: {
              opacity: 1,
            },
          },
        };
      }),
    };
  }),
};
const optionWithSortedData = JSON.parse(JSON.stringify(pieOption));

// Get Children Concepts of a given Parent Concept
function getChildrenConcepts(parentName) {
  const childrenArr = [];
  if (allConceptsObj[parentName].children) {
    allConceptsObj[parentName].children.forEach((child) => {
      childrenArr.push({
        seriesIndex: allConceptsObj[child].level - 2,
        name: child,
      });
    });
  }
  // console.log(childrenArr);
  return childrenArr;
}

// Get numbers of children in each level
function childrenCountByLevel(childrenArr) {
  const childrenNumberOfLevel = new Array(4);
  for (let i = 0; i < childrenNumberOfLevel.length; i++) {
    childrenNumberOfLevel[i] = 0;
  }
  childrenArr.forEach((obj) => {
    childrenNumberOfLevel[obj.seriesIndex]++;
  });
  return childrenNumberOfLevel;
}

// Sort Children Concepts of a given Parent Concept
function sortChildren(parentName, parentLevel, parentIndex, childrenArr) {
  const childrenNumberOfLevel = childrenCountByLevel(childrenArr);
  // console.log(childrenNumberOfLevel);

  const parentArcAngle =
    360 / optionWithSortedData.series[parentLevel].data.length;
  const parentOffsetAngle = optionWithSortedData.series[parentLevel].startAngle;

  for (let i = parentLevel + 1; i < optionWithSortedData.series.length; i++) {
    const childrenNumber = childrenNumberOfLevel[i];
    if (!childrenNumber) {
      continue;
    }
    const childArcAngle = 360 / optionWithSortedData.series[i].data.length;
    const childrenArcAngle = childrenNumber * childArcAngle;
    const childrenOffsetAngle = (childrenArcAngle - parentArcAngle) / 2;
    const startAngle =
      (360 / optionWithSortedData.series[parentLevel].data.length) *
        parentIndex -
      parentOffsetAngle -
      childrenOffsetAngle;
    optionWithSortedData.series[i].startAngle = -startAngle;
    optionWithSortedData.series[i].data = optionWithSortedData.series[
      i
    ].data.sort((a, b) => {
      const hasA = allConceptsObj[parentName].children.includes(a.name);
      const hasB = allConceptsObj[parentName].children.includes(b.name);
      return Number(hasB) - Number(hasA);
    });
  }
  return childrenNumberOfLevel;
}

// Blur Concept Levels with Zero Children Concept of given Parent Concept
function blurLevelOpacity(
  hasChildren,
  parentLevel,
  childrenNumberOfLevel,
  highlightedOption
) {
  highlightedOption.series.forEach((series, seriesIndex) => {
    if (seriesIndex !== parentLevel) {
      if (!hasChildren) {
        series.itemStyle.opacity = 0.2;
      } else {
        const levelOpacity = childrenNumberOfLevel[seriesIndex] ? 1 : 0.2;
        series.itemStyle.opacity = levelOpacity;
      }
    }
  });
}

// Sort and Highlight Children Concepts When MouseOver
function mouseoverHandler(myChart, parent) {
  // console.log(parent);
  conceptPos.x = parent.event.offsetX;
  conceptPos.y = parent.event.offsetY;
  if (hasItemSelected) {
    return;
  }
  const parentName = parent.data.name;
  const parentLevel = parent.seriesIndex;
  const parentIndex = parent.dataIndex;
  const hasChildren = allConceptsObj[parentName].children ? true : false;
  let childrenArr = [];
  let childrenNumberOfLevel = null;
  if (hasChildren) {
    childrenArr = getChildrenConcepts(parentName);
    childrenNumberOfLevel = sortChildren(
      parentName,
      parentLevel,
      parentIndex,
      childrenArr
    );
  }
  const highlightedOption = JSON.parse(JSON.stringify(optionWithSortedData));

  blurLevelOpacity(
    hasChildren,
    parentLevel,
    childrenNumberOfLevel,
    highlightedOption
  );
  highlightedOption.legend.show = false;

  myChart.setOption(highlightedOption);
  myChart.dispatchAction({
    type: "highlight",
    batch: [
      {
        seriesName: parent.seriesName,
        dataIndex: parent.dataIndex,
      },
      ...childrenArr,
    ],
  });
}

// Release Highlight Concepts When MouseOut
function mouseoutHandler(myChart, parent) {
  if (hasItemSelected) {
    return;
  }
  const currentChildren = getChildrenConcepts(parent.data.name);
  myChart.dispatchAction({
    type: "downplay",
    batch: [
      {
        seriesName: parent.seriesName,
        dataIndex: parent.dataIndex,
      },
      ...currentChildren,
    ],
  });
  optionWithSortedData.legend.show = true;
  myChart.setOption(optionWithSortedData);
}

// Adjust the Value of selected Concepts
function adjustSelected(
  parentSeriesIndex,
  parentDataIndex,
  childrenNumberOfLevel,
  pieOption
) {
  const selectedAngles = {};
  const parentAngle = 1 / pieOption.series[parentSeriesIndex].data.length;
  selectedAngles[parentSeriesIndex] = parentAngle;
  let maxAngle = parentAngle;
  for (let i = parentSeriesIndex + 1; i < childrenNumberOfLevel.length; i++) {
    const childrenAngle =
      childrenNumberOfLevel[i] / pieOption.series[i].data.length;
    selectedAngles[i] = childrenAngle;
    maxAngle = Math.max(maxAngle, childrenAngle);
  }
  maxAngle = maxAngle > 0.25 || selectedConcepts.length == 1 ? maxAngle : 0.25;
  // console.log(selectedAngles);
  const newParentVal =
    ((pieOption.series[parentSeriesIndex].data.length - 1) * maxAngle) /
    (1 - maxAngle);
  pieOption.series[parentSeriesIndex].data[parentDataIndex].value =
    newParentVal;
  const parentOffsetAngle =
    optionWithSortedData.series[parentSeriesIndex].startAngle;

  const childrenOffsetAngle =
    360 -
    (360 /
      (pieOption.series[parentSeriesIndex].data.length - 1 + newParentVal)) *
      parentDataIndex +
    parentOffsetAngle;

  for (let i = parentSeriesIndex + 1; i < pieOption.series.length; i++) {
    if (!childrenNumberOfLevel[i]) {
      continue;
    }
    pieOption.series[i].startAngle = childrenOffsetAngle;

    if (selectedAngles[i] < maxAngle) {
      const newVal =
        ((pieOption.series[i].data.length - childrenNumberOfLevel[i]) *
          maxAngle) /
        ((1 - maxAngle) * childrenNumberOfLevel[i]);
      // console.log(newVal);
      for (
        let dataIndex = 0;
        dataIndex < pieOption.series[i].data.length;
        dataIndex++
      ) {
        if (
          selectedConcepts.includes(pieOption.series[i].data[dataIndex].name)
        ) {
          pieOption.series[i].data[dataIndex].value = newVal;
        }
      }
    }
  }
}

// Select Parent & Children Concepts When Click
function selectHandler(myChart, parent) {
  if (!hasItemSelected) {
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: [0, 1, 2, 3, 4, 5],
    });

    myChart.dispatchAction({
      type: "select",
      batch: [...getChildrenConcepts(parent.data.name)],
    });
    const childrenArr = allConceptsObj[parent.data.name]["children"] || [];
    selectedConcepts = [parent.data.name, ...childrenArr];

    const hiddenOption = myChart.getOption();
    const parentSeriesIndex = parent.seriesIndex;
    const parentDataIndex = parent.dataIndex;

    const childrenNumberOfLevel = Array(pieOption.series.length).fill(0);
    childrenArr.forEach((concept) => {
      const seriesIndex = allConceptsObj[concept].level - 2;
      childrenNumberOfLevel[seriesIndex]++;
    });

    // console.log(childrenNumberOfLevel);
    adjustSelected(
      parentSeriesIndex,
      parentDataIndex,
      childrenNumberOfLevel,
      hiddenOption
    );

    hiddenOption.series.forEach((arr) => {
      arr.emphasis.disabled = true;
      arr.data.forEach((concept) => {
        if (!selectedConcepts.includes(concept.name)) {
          concept.itemStyle.opacity = 0;
          concept.select.disabled = true;
        }
      });
    });
    myChart.setOption(hiddenOption, { replaceMerge: "series" });
  }
  if (hasItemSelected) {
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: pieOption.series.map((level, levelIndex) => levelIndex),
    });
    myChart.setOption(optionWithSortedData, { replaceMerge: "series" });
    selectedConcepts = [];
  }
  hasItemSelected = !hasItemSelected;
}

// Release Selected Items
function deselectHandler(myChart, event) {
  // !event.target means mouse is not on any data element of the chart
  if (!event.target) {
    if (hasItemSelected) {
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: [0, 1, 2, 3, 4, 5],
      });
      myChart.setOption(optionWithSortedData, { replaceMerge: "series" });
      hasItemSelected = false;
    }
  }
}

//Set cursor style
function setCursorStyle(myChart) {
  if (hasItemSelected) {
    myChart.getZr().setCursorStyle("default");
  }
}

function pieChartHandlers(myChart) {
  myChart.on("mouseover", (parent) => mouseoverHandler(myChart, parent));
  myChart.on("mouseout", (parent) => mouseoutHandler(myChart, parent));
  myChart.on("click", (parent) => selectHandler(myChart, parent));
  myChart.on("mousemove", () => setCursorStyle(myChart));
  myChart.getZr().on("click", (event) => deselectHandler(myChart, event));
}

export { pieOption, pieChartHandlers };
