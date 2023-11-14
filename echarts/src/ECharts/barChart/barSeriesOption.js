const eduDecal = {
  color: "rgba(192, 192, 192,0.8)",
  dashArrayX: [
    [6, 6],
    [0, 6, 6, 0],
  ],
  dashArrayY: [6, 0],
};
const companyDecal = {
  color: "rgba(192, 192, 192,0.8)",
  dashArrayX: [1, 0],
  dashArrayY: [4, 3],
  rotation: -Math.PI / 4,
};

function getBarSeriesOption(category) {
  let categoryDecal = { symbol: "none" };
  if (category === "Works from educational institutions") {
    categoryDecal = eduDecal;
  }
  if (category === "Works from companies") {
    categoryDecal = companyDecal;
  }
  const seriesOption = {
    name: `${category}`,
    type: "bar",
    colorBy: "data",
    barCategoryGap: "30%",
    coordinateSystem: "polar",
    selectedMode: false,
    emphasis: {
      focus: "self",
      blurScope: "globe",
    },
    blur: { itemStyle: { opacity: 0.2 } },
    itemStyle: {
      decal: categoryDecal,
    },
  };

  return seriesOption;
}
export default getBarSeriesOption;
