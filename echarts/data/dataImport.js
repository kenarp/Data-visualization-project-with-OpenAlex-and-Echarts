// const LOCAL_JSON = "http://localhost:8000";

// async function readData() {
//   const res = await fetch(LOCAL_JSON + "/data");
//   const data = await res.json();
//   return data;
// }

// const data = await readData();
// const dataset = data.map((level) =>
//   Object.values(level).map((concept) => {
//     return {
//       name: concept.name,
//       value: 1,
//       id: concept.id.slice(22),
//     };
//   })
// );

// const allConceptsObj = {};
// data.forEach((level) => {
//   Object.values(level).forEach(
//     (concept) =>
//       (allConceptsObj[concept.name] = {
//         level: concept.level,
//         children: concept.children || null,
//         description: concept.description,
//       })
//   );
// });

// const top12ConceptsObj = {
//   "Mode (computer interface)":
//     "https://api.openalex.org/works?filter=concepts.id:C48677424",
//   Usability: "https://api.openalex.org/works?filter=concepts.id:C170130773",
//   "Virtual reality":
//     "https://api.openalex.org/works?filter=concepts.id:C194969405",
//   Persona: "https://api.openalex.org/works?filter=concepts.id:C313442",
//   "Augmented reality":
//     "https://api.openalex.org/works?filter=concepts.id:C153715457",
//   "Modality (human\u2013computer interaction)":
//     "https://api.openalex.org/works?filter=concepts.id:C2780226545",
//   "Ubiquitous computing":
//     "https://api.openalex.org/works?filter=concepts.id:C172195944",
//   Affordance: "https://api.openalex.org/works?filter=concepts.id:C194995250",
//   "Game design": "https://api.openalex.org/works?filter=concepts.id:C503285160",
//   "Technology acceptance model":
//     "https://api.openalex.org/works?filter=concepts.id:C2776185967",
//   "Conceptual design":
//     "https://api.openalex.org/works?filter=concepts.id:C120208923",
//   "User experience design":
//     "https://api.openalex.org/works?filter=concepts.id:C201025465",
// };

// const top12Concepts = {};

// Object.keys(top12ConceptsObj).forEach((conceptName, index) => {
//   top12Concepts[conceptName] = `Ranking ${index + 1}`;
// });

// export { dataset, allConceptsObj, top12Concepts };
// // console.log(dataset);
// // console.log(allConceptsObj);
// // console.log(Object.keys(allConceptsObj).length);
