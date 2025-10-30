"use client";

import { useEffect } from "react";
import { loadNetwork } from "./loadNetwork";

export default function Network(data) {
  useEffect(() => {
    loadNetwork(data);
  }, []);

  return (
    <div className="container">
      <svg id="container" viewBox="0 0 960 960"></svg>
    </div>
  );
}
