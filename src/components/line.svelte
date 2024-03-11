<script>
  import { onMount, onDestroy } from 'svelte';
  import * as d3 from 'd3'; // Import D3 library

  let svgWidth = 200;
  let svgHeight = 600; // Increase the height for the animation to reach the top

  let svg;
  let shapes = [];
  let speedY = 5;
  let boxHeight;

  onMount(() => {
    const titleBarHeight = document.querySelector('.titleBar').clientHeight;
    boxHeight = titleBarHeight;
    
    svg = d3.select('#animation-container')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', boxHeight); // Set the height to match the title bar

    // Draw the line
    svg.append('line')
       .attr('x1', 0)
       .attr('y1', boxHeight - 50) // Adjust the y position as needed
       .attr('x2', svgWidth)
       .attr('y2', boxHeight - 50) // Adjust the y position as needed
       .attr('stroke', 'black')
       .attr('stroke-width', 2);

    startAnimation();
  });

  onDestroy(() => {
    // Clear all intervals when component is destroyed
    shapes.forEach(shape => clearInterval(shape.interval));
  });

  const fall = (shape) => {
    shape.cy += speedY;
    shape.element.attr('transform', `translate(${shape.cx},${shape.cy})`);

    if (shape.cy >= boxHeight - 50 - shape.size) { // Stop shape at the line
      shape.cy = boxHeight - 50 - shape.size;
      clearInterval(shape.interval);
    }
  };

  const createShape = () => {
    let shapeType = Math.floor(Math.random() * 3); // Random shape type: 0 = circle, 1 = triangle, 2 = rectangle
    let shape;
    
    switch (shapeType) {
      case 0: // Circle
        shape = {
          cx: Math.random() * svgWidth, // Random X position within the SVG width
          cy: -20, // Start above the SVG
          size: 10,
          element: svg.append('circle')
                      .attr('cx', 0)
                      .attr('cy', 0)
                      .attr('r', 10)
                      .attr('fill', 'forestgreen')
                      .attr('transform', `translate(0,-20)`)
        };
        break;
      case 1: // Triangle
        shape = {
          cx: Math.random() * svgWidth, // Random X position within the SVG width
          cy: -20, // Start above the SVG
          size: 20,
          element: svg.append('polygon')
                      .attr('points', `0,${-Math.sqrt(3) * 10} 10,${Math.sqrt(3) * 10} -10,${Math.sqrt(3) * 10}`)
                      .attr('fill', 'forestgreen')
                      .attr('transform', `translate(0,-20)`)
        };
        break;
      case 2: // Rectangle
        shape = {
          cx: Math.random() * svgWidth, // Random X position within the SVG width
          cy: -20, // Start above the SVG
          size: 20,
          element: svg.append('rect')
                      .attr('x', -10)
                      .attr('y', -10)
                      .attr('width', 20)
                      .attr('height', 20)
                      .attr('fill', 'forestgreen')
                      .attr('transform', `translate(0,-20)`)
        };
        break;
    }

    const interval = setInterval(() => fall(shape), 30);
    shape.interval = interval;

    shapes.push(shape); // Add shape to the array
  };

  const startAnimation = () => {
    // Create a new shape every second
    setInterval(() => createShape(), 1000);
  };
</script>


<style>
  .header-container {
    position: relative;
    display: flex;
    align-items: center; /* Align items vertically */
    margin-left: auto; /* Push to the right */
    background-color: #E2E5DE; /* Background color for the entire page */
  }

  .titleBar {
    font-family: "Playfair Display", bold;
    font-size: 55px;
    display: flex;
    justify-content: right;
    align-items: center;
    height: 10vh;
    margin: 0px;
    padding: 60px 30px;
    background-color: #E2E5DE;
  }

  #animation-container {
    width: 200px;
    border: 1px solid black; /* Add border for visualization */
    justify-content: right;
    background-color: #E2E5DE;    
    margin: 5px;
  }

  h1 {
    background-color: #E2E5DE;
  }
</style>
<div class="header-container">
  <h1 class='titleBar'>What a waste!
    <br>
    a visual commentary
  </h1>
  <div id="animation-container"></div>
</div>
