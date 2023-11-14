const pieSeriesOption = {
  // name:concept,
  type: "pie",
  startAngle: 90,
  selectedMode: "multiple",
  emphasis: {
    focus: "self",
    blurScope: "coordinateSystem",
    scaleSize: 7,
    label: {
      show: true,
      // alignTo: "labelLine",
      color: "#ffffff",
      padding: 5,
      backgroundColor: "inherit",
      textShadowColor: "#999999",
      textShadowBlur: 2,
    },
    labelLine: {
      show: true,
      lineStyle: {
        width: 1.5,
        cap: "butt",
        color: "#aaaaaa",
      },
    },
  },
  blur: { itemStyle: { opacity: 0.2 } },
  //   radius: ["20%", "30%"],
  itemStyle: {
    borderRadius: 5,
    borderColor: "#999",
    borderWidth: 0.2,
    opacity: 1,
    shadowColor: "#555",
    shadowBlur: 10,
  },
  select: {
    itemStyle: { opacity: 1 },
    label: {
      show: true,
      color: "#ffffff",
      fontSize: 16,
      alignTo: "labelLine",
      padding: 10,
      backgroundColor: "inherit",
    },
    labelLine: {
      show: true,
      showabove: true,
      lineStyle: {
        width: 1.5,
        cap: "butt",
        color: "#566",
      },
    },
  },
  label: { show: false },
  labelLayout: {
    moveOverlap: "shiftY",
    draggable: true,
  },
};

// function labelLayoutCallBack(params) {
//   console.log("labelX:" + params.labelRect.x);
//   console.log("labelY:" + params.labelRect.y);
//   // console.log("labelX:" + params.rect.x);
//   // console.log("labelY:" + params.rect.y);
//   return {
//     x: params.labelRect.x,
//     y: params.labelRect.y,
//   };
// }

export default pieSeriesOption;
