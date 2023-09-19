const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

d3.json("data/buildings.json").then((data) => {
  data.forEach((d) => {
    d.height = Number(d.height);
  });
  console.log(data);

  const y = d3.scaleLinear().domain([0, 828]).range([0, 400]);

  const rectangles = svg.selectAll("rect").data(data);

  rectangles
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      return i * 50 + 25;
    })
    .attr("y", 50)
    .attr("width", 25)
    .attr("height", (d) => y(d.height))
    .attr("fill", (d, i) => "green");
});

// log scale example:
const log = d3.scaleLog().domain([300, 150000]).range([0, 400]).base(10);

// time scale example:
const time = d3
  .scaleTime()
  .domain([new Date(2000, 0, 1), new Date(2001, 0, 1)])
  .range([0, 400]);

const color = d3
  .scaleOrdinal()
  .domain(["apple", "lemon", "lime", "orange", "peach", "plum", "strawberry"])
  .range([
    "#c11d1d",
    "#eae600",
    "#7ebd01",
    "#f68a05",
    "#f35e9a",
    "#481e5d",
    "#b10d6a",
  ]);

const color2 = d3
  .scaleOrdinal()
  .domain(["africa", "europe", "asia", "americas", "oceania"])
  .range(d3.schemaCategory10);
