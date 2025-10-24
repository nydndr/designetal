export const RADIUS = 10;

export const drawNetwork = (context, width, height, nodes, links) => {
  context.clearRect(0, 0, width, height);

  // Draw the links first
  links.forEach((link) => {
    context.beginPath();
    context.moveTo(link.source.x, link.source.y);
    context.lineTo(link.target.x, link.target.y);
    context.stroke();
  });

  // Draw the nodes
  nodes.forEach((node) => {
    context.beginPath();
    context.moveTo(node.x + RADIUS, node.y);
    context.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
  });

  // Draw the labels
  nodes.forEach((node) => {
    context.fillText(node.name, node.x, node.y + 20);
  });

  console.log(nodes);
};
