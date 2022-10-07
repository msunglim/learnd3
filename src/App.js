import './App.css';
import * as d3 from 'd3' // Import D3
import { useEffect } from 'react'
import hw2 from "./hw2.json"

function App() {
  useEffect(() => {
    let HEIGHT = 500,
      WIDTH = 500, //distance between bars
      margin = { top: 30, right: 0, bottom: 60, left: 100 };

    let svg = d3
      .select("#svg-container")
      .append("svg")
      .attr("width", WIDTH + margin.left + margin.right)
      .attr("height", HEIGHT + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    let x = d3.scaleBand().range([0, WIDTH]).padding(0.2);
    let y = d3.scaleLinear().range([HEIGHT, 0]);

    function createAxisLeft(data) {
      y.domain([
        0,
        d3.max(
          data.map((e) => e.GDP),
          (d) => Number(d)
        )
      ]).nice();

      svg.append("g").call(d3.axisLeft(y));
    }
    //text like names of countries.
    function formatText(text) {
      //   to change text we need to select it
      text
        .selectAll("text")
        .attr("x", x.bandwidth() / 4)
        .attr("y", 0)
        .attr("dy", ".35em")
        // it will rotate from the center point...
        .attr("transform", "rotate(90)")
        // ... but we want to rotate from the start
        .attr("text-anchor", "start");
        
    }

    function createAxisBottom(data) {
      x.domain(data.map((e) => e.name));

      const text = svg
        .append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(d3.axisBottom(x));

      formatText(text, x);
    }
    function addLabelsToBars(bars) {
      bars
        .append("text")
        .text((d) => d.GDP)
        .style("opacity", 0)
        .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
        .attr("y", (d) => y(d.GDP) - 5)
        
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "3")
        // Add animation to the labels
        .transition()
        .duration(500)
        .style("opacity", 1);
    }

    function createBars(data) {
      let bars = svg
        .selectAll(".bars")
        .data(data, (d) => d.name)
        .enter()
        .append("g")
        .attr("class", "bars")
        .style("opacity", 1);

      // Appending rectangles
      bars
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(0))
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .style("fill", "red")
        // Adding animation to rectangles
        .transition()
        .duration(750)
        .attr("y", (d) => y(d.GDP))
        .attr("height", (d) => HEIGHT - y(d.GDP))
        

      addLabelsToBars(bars);
    }


    createAxisLeft(hw2);
    createAxisBottom(hw2);
    createBars(hw2);

  }, [])

  return (
    <div className="App">
      {/* <img src="https://cdn.mos.cms.futurecdn.net/yCPyoZDQBBcXikqxkeW2jJ-1200-80.jpg"></img> */}
      <div id="chart">
        <div id="pgraphs"></div>
        <span>Life is Extremely Hard</span>
        <div id="svg-container"></div>
      </div>
    </div>
  );
}

export default App;
