import {
  select,
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  drag,
  zoom,
} from "d3";

const MAIN_NODE_SIZE = 40;
const CHILD_NODE_SIZE = 15;
const LEAF_NODE_SIZE = 5;
const DEFAULT_DISTANCE = 90;
const MAIN_NODE_DISTANCE = 90;
const LEAF_NODE_DISTANCE = 5;
const MANY_BODY_STRENGTH = -180;

export const loadNetwork = (data) => {
  const svg = select("#container");
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const centerX = width / 2;
  const centerY = height / 2;

  const g = svg.append("g");

  const fields = data.data;

  let simulation = forceSimulation(fields.nodes)
    .force("charge", forceManyBody().strength(MANY_BODY_STRENGTH))
    .force(
      "link",
      forceLink(fields.links)
        .id((d) => {
          return d.id;
        })
        .distance((link) => link.distance)
    )
    .force("center", forceCenter(centerX, centerY));

  let dragInteraction = drag().on("drag", (event, node) => {
    node.fx = event.x;
    node.fy = event.y;
    simulation.alphaTarget(1).restart();
  });

  svg.call(
    zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    })
  );

  let lines = g
    .selectAll("line")
    .data(fields.links, (link) => link.id)
    .enter()
    .append("line")
    .attr("stroke", (link) => {
      return link.color || "red";
    });

  let circles = g
    .selectAll("circle")
    .data(fields.nodes, (node) => node.id)
    .enter()
    .append("circle")
    .attr("fill", "red")
    .attr("r", (node) => 20)
    .style("cursor", "pointer")
    .call(dragInteraction);

  circles
    .on("mouseover", (event, node) => {
      // Add tooltip on mouseover
      if (node.id !== "") {
        const tooltip = select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("background-color", "white")
          .style("padding", "10px")
          .style("border", "1px solid #ccc")
          .style("border-radius", "5px")
          .style("font-size", "14px")
          .style("visibility", "visible")
          .html(`Node: ${node.id}`);

        // Move the tooltip to the mouse position
        tooltip
          .style("top", `${event.pageY}px`)
          .style("left", `${event.pageX + 10}px`);
      }
    })
    .on("mouseout", () => {
      // Remove tooltip on mouseout
      select(".tooltip").remove();
    });

  let text = g
    .selectAll("text")
    .data(fields.nodes, (node) => node.id)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("pointer-events", "none")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .style("text-transform", "uppercase")
    .text((node) => node.name);

  simulation.on("tick", () => {
    circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
    text.attr("x", (node) => node.x).attr("y", (node) => node.y);

    lines
      .attr("x1", (link) => link.source.x)
      .attr("y1", (link) => link.source.y)
      .attr("x2", (link) => link.target.x)
      .attr("y2", (link) => link.target.y);
  });
};
