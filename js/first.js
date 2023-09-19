d3.json("data/buildings.json").then((data) => {
  data.forEach((d) => {
    d.age = Number(d.age);
  });
});

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

const circles = svg.selectAll("circle").data(data);

circles
  .enter()
  .append("circle")
  .attr("cx", (d, i) => i * 50 + 25)
  .attr("cy", 250)
  .attr("r", (d) => 2 * d.age)
  .attr("fill", "red");

console.log(data);

// const svg = d3
//   .select("#chart-area")
//   .append("svg")
//   .attr("width", 500)
//   .attr("height", 400);

// add a line
const line = svg
  .append("line")
  .attr("x1", 800)
  .attr("y1", 800)
  .attr("x2", 200)
  .attr("y2", 200)
  .attr("stroke", "teal")
  .attr("stroke-width", 5);

svg
  .append("circle")
  .attr("cx", 100)
  .attr("cy", 250)
  .attr("r", 50)
  .attr("fill", "blue");

// add a rectangle

const rectangle = svg
  .append("rect")
  .attr("width", 100)
  .attr("height", 50)
  .attr("fill", "green");

// add a circle

const circle = svg
  .append("circle")
  .attr("cx", 250)
  .attr("cy", 350)
  .attr("r", 50)
  .attr("stroke", "black")
  .attr("fill", "orange");

// add an ellipse

const ellipse = svg
  .append("ellipse")
  .attr("cx", 150)
  .attr("cy", 100)
  .attr("rx", 50)
  .attr("ry", 100)
  .attr("fill", "pink");
