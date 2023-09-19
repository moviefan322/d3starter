const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", WIDTH + MARGIN.TOP + MARGIN.BOTTOM);

  const g = svg
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

// X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 170)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("The word's tallest buildings");

  // Y label
  g.append("text")
  .attr("class", "y axis-label")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")

d3.json("data/buildings.json").then((data) => {
  data.forEach((d) => {
    d.height = Number(d.height);
  });
  console.log(data);

  const min = d3.min(data, (d) => d.height);
  const max = d3.max(data, (d) => d.height);
  const extent = d3.extent(data, (d) => d.height);
  const names = data.map((d) => d.name);

  // band scale
  const x = d3
    .scaleBand()
    .domain(names)
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  const y = d3.scaleLinear().domain([0, max]).range([HEIGHT, 0]);

  const xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)");

  const yAxisCall = d3
    .axisLeft(y)
    .ticks(8)
    .tickFormat((d) => d + "m");
  g.append("g").attr("class", "y axis").call(yAxisCall);

  const rectangles = g.selectAll("rect").data(data);

  const color = d3
    .scaleOrdinal()
    .domain(names)
    .range([
      "#c11d1d",
      "#eae600",
      "#7ebd01",
      "#f68a05",
      "#f35e9a",
      "#481e5d",
      "#b10d6a",
    ]);

  rectangles
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.height))
    .attr("width", x.bandwidth)
    .attr("height", (d) => HEIGHT - y(d.height))
    .attr("fill", (d, i) => color(d.name));
});

// log scale example:
const log = d3.scaleLog().domain([300, 150000]).range([0, HEIGHT]).base(10);

// time scale example:
const time = d3
  .scaleTime()
  .domain([new Date(2000, 0, 1), new Date(2001, 0, 1)])
  .range([0, 400]);

// const color2 = d3
//   .scaleOrdinal()
//   .domain(["africa", "europe", "asia", "americas", "oceania"])
//   .range(d3.schemaCategory10);
