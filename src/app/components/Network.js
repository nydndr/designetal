"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { RADIUS, drawNetwork } from "./drawNetwork";

export default function Network(data) {
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = window.innerWidth * 0.5;
  const height = window.innerHeight * 0.5;

  // read the data

  const nodes = data.data.nodes;
  const links = data.data.links;

  const canvasRef = useRef(null);

  // compute the nodes position using a d3-force

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) {
      return;
    }

    d3.forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("collide", d3.forceCollide().radius(RADIUS))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))

      .on("tick", () => {
        drawNetwork(context, width, height, nodes, links);
      });

    // build the links
    // build the nodes
  }, [width, height, nodes, links]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ width, height }}
        width={width}
        height={height}
      ></canvas>
    </div>
  );
}
