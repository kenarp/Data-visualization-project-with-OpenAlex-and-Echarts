# Data visualization of popular research concepts in HCI based on OpenAlex and Echarts

This project collected research works data using OpenAlex API, preprocessed and orgnized with Python(Pandas) and Javascript, then visualized in Apache Echarts

## OpenAlex API

[OpenAlex](https://openalex.org/) is an index of hundreds of millions of interconnected entities across the global research system.

### Data from OpenAlex API

1. [OpenAlex Concepts](https://docs.openalex.org/api-entities/concepts) are abstract ideas that works are about. OpenAlex indexes about 65k concepts. Concepts are hierarchical, like a tree. There are 19 root-level concepts, and six layers of descendants branching out from them, containing about 65 thousand concepts all told.
2. Human–computer interaction is a level 1-concept in OpenAlex(id:C107457646). This projects collected all concepts having HCI as their ancestor concept, and sort them by the amount of works/papers in the past 20 years(from 2003-2022)

   - API URL for all level 2-5 sub-concepts under concept HCI:
     "https://api.openalex.org/concepts?per-page=200&filter=level:2|3|4|5,ancestors.id:C107457646"

3. From all of the sub-concepts of HCI, the 12 concepts with most works published in the past 20 years were selected for further comparision and visualization
4. Based on the top 12 concepts, the project collected the amount of works year-by-year from 2003 to 2022, and categorized the works by its [Author institution type](https://docs.openalex.org/api-entities/works/work-object/authorship-object#institutions) into 2 types: works from **educational institutions** and works from **companies**
   - [OpenAlex institution types](https://docs.openalex.org/api-entities/institutions/institution-object#type)
5. In the top 12 concepts, 11 of them are OpenAlex level 2 concepts, 1 as level 3. This project then got all the related sub-concepts of these top 12 concepts from the OpenAlex API, and organized them according to relationships.

## Visualization

This project uses [Apache Echarts](https://echarts.apache.org/en/index.html) to visualize the data collected above.

### Bar chart of top 12 concept works in HCI

The bar-chart reflects the change and trend of the sub-concepts in HCI, by showing the percentage change of all papers in the top 12 concepts yearly.
The bar-chart also compares the different tendancy between works from education institutions and companies, by comparing the percentage of works in each sub-concept, from educational institutions and companies, respectively.

### Chart of relationships between top 12 concepts and their sub-concepts

This chart was built based on the Echarts Pie-Series, but used to demonstrate the relationships between the top 12 concepts and their sub-concepts according to OpenAlex.
