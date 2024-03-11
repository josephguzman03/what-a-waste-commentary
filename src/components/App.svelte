<main>
  <p>
    insert paragraphs
  </p>
  <p> For this section of the website, our objective is to create a Bar Chart, 
    preferably a Diverging Stacked Bar Chart. This segment will explore the comparison
     between second-hand clothing and the prevailing fast fashion market. Our intention
      is to utilize Zara as the representative example of fast fashion, given its appeal 
      to both higher and lower socioeconomic demographics. Conversely, Depop serves as an
       online second-hand resale platform catering to a diverse range of customers. Our
        aim is to examine the varied price points across different categories of garments
         to elucidate the relationship between pricing and market segments. Ultimately, 
         we seek to demonstrate that Depop offers a platform conducive to reducing textile 
         waste and fostering environmental stewardship. Initial data analysis suggests
          discernible disparities across multiple facets. Moving forward, we intend to 
          refine and enhance the visual presentation of this data, ensuring an interactive 
          and compelling comparison. </p>
  <style>
    body {
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    
    }

    h2 {
    
    display: flex;
    justify-content: center;
    align-items: left;
    height: 5vh;
    margin: 3px;
    padding: 10px 100px;
    
}
p {
  font-family: "Times New Roman", serif;
  font-size: large;
  background-color: #F5F5F5;
      display: flex;
      justify-content: left;
      align-items: center;
      margin: 0;
      padding: 30px 100px;
  }



  </style>

  <h2>Zara v Depop - Average Price by Category</h2>
  
  <div id="chart">
    <!-- This is where the chart will be rendered -->
  </div>
</main>

<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { csv } from 'd3-fetch';
  import { select } from 'd3-selection';
  import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
  import { max, min, mean } from 'd3-array';
  import { format } from 'd3-format';
  import { group } from 'd3-array';
  import { axisLeft, axisBottom } from 'd3-axis';

  let svg;
  let x;
  let y;

  onMount(async () => {
    // Load the CSV data
    const [zaraData, depopData] = await Promise.all([
      csv("zara_price.csv"),
      csv("FINAL_DATA_V0.csv")
    ]);

    // Process the data to calculate the average price for each category for Zara
    const zaraAvgPrices = Array.from(group(zaraData, d => d.Category), ([key, values]) => ({
      Category: key,
      AvgPrice: mean(values, d => +d.Price), // Convert Price to number
      MaxPrice: max(values, d => +d.Price),
      MinPrice: min(values, d => +d.Price),
      Origin: "Zara",
    }));

    // Process the data to calculate the average price for each category for Depop
    const depopAvgPrices = Array.from(group(depopData, d => d.Category), ([key, values]) => ({
      Category: key,
      AvgPrice: mean(values, d => +d.Price), // Convert Price to number
      MaxPrice: max(values, d => +d.Price),
      MinPrice: min(values, d => +d.Price),
      Origin: "Depop",
    }));

    // Merge the average price data for Zara and Depop
    const combinedData = [...zaraAvgPrices, ...depopAvgPrices];

    // Specify the chart dimensions
    const barHeight = 25;
    const marginTop = 60; // Increased to accommodate legend
    const marginRight = 180; // Increased to accommodate legend
    const marginBottom = 80; // Increased for axes
    const marginLeft = 80;
    const width = 800; // Assuming a fixed width
    const height = (combinedData.length + 1) * barHeight + marginTop + marginBottom;



    // Define colors for each category
    const categoryColors = scaleOrdinal()
      .domain(["Outerwear", "Bottoms", "Shirts", "Footwear", "Accessories"]) // Unique keys for legend
      .range(["red", "grey", "green", "blue", "purple"])
      ;

    // Create the SVG container
     svg = select("#chart").append("svg")
      .attr("viewBox", [0, 0, width + marginRight, (combinedData.length + 1) * barHeight + marginTop + marginBottom])
      .attr("style", "max-width: 100%; height: auto; font: 10px Playfair Display;");

    // Create the positional scales
    x = scaleLinear()
    .domain([-max(combinedData, d => Math.abs(d.MaxPrice)), max(combinedData, d => Math.abs(d.MaxPrice))]) // Set the domain centered around 0
    .rangeRound([marginLeft, width]);
      y = scaleBand()
      .domain(combinedData.map(d => d.Category))
      .rangeRound([marginTop, height - marginBottom]) // Adjusted to properly center the y-axis
      .padding(0.1);
      

    // Add Zara bars
    svg.selectAll(null)
      .data(zaraAvgPrices)
      .enter()
      .append("rect")
      .attr("class", "bar-rect") // Add this class
      .attr("fill", d => categoryColors(d.Category))
      .attr("fill-opacity", .5) // Set opacity to 50%
      .attr("x", d => x(Math.min(0, -d.AvgPrice)) - 5) // Adjusted position for Zara
      .attr("y", d => y(d.Category))
      .attr("width", d => Math.abs(x(-d.AvgPrice) - x(0)) + 5) // Adjusted width for Zara
      .attr("height", y.bandwidth())
      .style("display", "none"); // Initially hide the bars

    // Add Depop bars
    svg.selectAll(null)
      .data(depopAvgPrices)
      .enter()
      .append("rect")
      .attr("class", "bar-rect") // Add this class
      .attr("fill", d => categoryColors(d.Category))
      .attr("fill-opacity", 0.5) // Set opacity to 50%
      .attr("x", d => x(0)) // Always start from the center
      .attr("y", d => y(d.Category))
      .attr("width", d => Math.abs(x(d.AvgPrice) - x(0)) + 5) // Adjusted width for Depop
      .attr("height", y.bandwidth())
      .style("display", "none"); // Initially hide the bars

    svg.selectAll(".x-axis text")
       .style("font-family", "Playfair Display",);

    // Select and style the y-axis ticks
    svg.selectAll(".y-axis text")
        .style("font-family", "Playfair Display");

        // Add max lines for Zara
    svg.selectAll(null)
        .data(zaraAvgPrices)
        .enter()
        .append("line")
        .attr("class", "max-line-zara-left")
        .attr("x1", d => x(-d.MaxPrice))
        .attr("y1", d => y(d.Category) + y.bandwidth() / 2)
        .attr("x2", d => x(-d.MinPrice))
        .attr("y2", d => y(d.Category) + y.bandwidth() / 2)
        .attr("stroke", d => categoryColors(d.Category)) // Match the color of the bars
        .style("display", "none");

    // Add min lines for Zara
    svg.selectAll(null)
        .data(zaraAvgPrices)
        .enter()
        .append("line")
        .attr("class", "min-line-zara-left")
        .attr("x1", d => x(-d.MinPrice))
        .attr("y1", d => y(d.Category) + y.bandwidth() / 2)
        .attr("x2", d => x(-d.MaxPrice))
        .attr("y2", d => y(d.Category) + y.bandwidth() / 2)
        .attr("stroke", d => categoryColors(d.Category)) // Match the color of the bars
        .style("display", "none");

    // Add max lines for Depop
    svg.selectAll(null)
        .data(depopAvgPrices)
        .enter()
        .append("line")
        .attr("class", "max-line-depop")
        .attr("x1", d => x(d.MaxPrice))
        .attr("y1", d => y(d.Category) + y.bandwidth() / 2)
        .attr("x2", d => x(d.MinPrice))
        .attr("y2", d => y(d.Category) + y.bandwidth() / 2)
        .attr("stroke", d => categoryColors(d.Category)) // Match the color of the bars
        .style("display", "none");

    // Add min lines for Depop
    svg.selectAll(null)
        .data(depopAvgPrices)
        .enter()
        .append("line")
        .attr("class", "min-line-depop")
        .attr("x1", d => x(d.MinPrice))
        .attr("y1", d => y(d.Category) + y.bandwidth() / 2)
        .attr("x2", d => x(d.MaxPrice))
        .attr("y2", d => y(d.Category) + y.bandwidth() / 2)
        .attr("stroke", d => categoryColors(d.Category)) // Match the color of the bars
        .style("display", "none");

    // Add max dots for Zara
    svg.selectAll(null)
        .data(zaraAvgPrices)
        .enter()
        .append("circle")
        .attr("class", "max-dot-zara-left")
        .attr("cx", d => x(-d.MaxPrice))
        .attr("cy", d => y(d.Category) + y.bandwidth() / 2)
        .attr("r", 3) // Set the radius of the dots
        .attr("fill", d => categoryColors(d.Category)) // Match the color of the bars
        .style("display", "none");

    // Add min dots for Zara
    svg.selectAll(null)
        .data(zaraAvgPrices)
        .enter()
        .append("circle")
        .attr("class", "min-dot-zara-left")
        .attr("cx", d => x(-d.MinPrice))
        .attr("cy", d => y(d.Category) + y.bandwidth() / 2)
        .attr("r", 3) // Set the radius of the dots
        .attr("fill", d => categoryColors(d.Category)) // Match the color of the bars
        .style("display", "none");

    // Add max dots for Depop
    svg.selectAll(null)
        .data(depopAvgPrices)
        .enter()
        .append("circle")
        .attr("class", "max-dot-depop")
        .attr("cx", d => x(d.MaxPrice))
        .attr("cy", d => y(d.Category) + y.bandwidth() / 2)
        .attr("r", 3) // Set the radius of the dots
        .attr("fill", d => categoryColors(d.Category)) // Match the color of the bars
        .style("display", "none");

    // min dots for Depop
    svg.selectAll(null)
        .data(depopAvgPrices)
        .enter()
        .append("circle")
        .attr("class", "min-dot-depop")
        .attr("cx", d => x(d.MinPrice))
        .attr("cy", d => y(d.Category) + y.bandwidth() / 2)
        .attr("r", 3) // Set the radius of the dots
        .attr("fill", d => categoryColors(d.Category)) // Match the color of the bars
        .style("display", "none");


    // Add checkbox for average graph
    const avgCheckbox = document.createElement("input");
    avgCheckbox.setAttribute("type", "checkbox");
    avgCheckbox.setAttribute("id", "avgCheckbox");
    avgCheckbox.addEventListener("change", toggleAverageGraph);
    const avgLabel = document.createElement("label");
    avgLabel.setAttribute("for", "avgCheckbox");
    avgLabel.textContent = "Average Graph";
    document.getElementById("chart").appendChild(avgCheckbox);
    document.getElementById("chart").appendChild(avgLabel);

    // Add checkbox for min max graph
    const minMaxCheckbox = document.createElement("input");
    minMaxCheckbox.setAttribute("type", "checkbox");
    minMaxCheckbox.setAttribute("id", "minMaxCheckbox");
    minMaxCheckbox.addEventListener("change", toggleMinMaxGraph);
    const minMaxLabel = document.createElement("label");
    minMaxLabel.setAttribute("for", "minMaxCheckbox");
    minMaxLabel.textContent = "Min Max Graph";
    document.getElementById("chart").appendChild(minMaxCheckbox);
    document.getElementById("chart").appendChild(minMaxLabel);

    // Function to toggle average graph
    function toggleAverageGraph() {
      const isChecked = this.checked;
      svg.selectAll(".bar-rect").style("display", isChecked ? "block" : "none");
    }

    // Function to toggle min max graph
    function toggleMinMaxGraph() {
      const isChecked = this.checked;
      svg.selectAll(".max-line-zara-left, .max-line-depop, .min-line-zara-left, .min-line-depop").style("display", isChecked ? "block" : "none");
      svg.selectAll(".max-dot-zara-left, .max-dot-depop, .min-dot-zara-left, .min-dot-depop").style("display", isChecked ? "block" : "none");
    }

    
    // Add hover functionality for average values
    svg.selectAll(".bar-rect")
      .on("mouseenter", function (event, d) {
        const xPosition = d.Origin === "Zara" ? parseFloat(select(this).attr("x")) - 5 : parseFloat(select(this).attr("x")) + parseFloat(select(this).attr("width")) + 5;
        const yPosition = parseFloat(select(this).attr("y")) + y.bandwidth() / 2;
        svg.append("text")
          .attr("class", "avg-tooltip")
          .attr("x", xPosition)
          .attr("y", yPosition)
          .attr("dy", "-0.5em")
          .attr("text-anchor", d.Origin === "Zara" ? "end" : "start")
          .text(`Avg: ${format(".2f")(d.AvgPrice)}`);
          
      })
      .on("mouseleave", function () {
        svg.select(".avg-tooltip").remove();
      });
// Add hover functionality for min-max values for Zara
svg.selectAll(".min-line-zara-left, .max-line-zara-left")
    .on("mouseenter", function (event, d) {
        console.log("Mouse entered min-max line for Zara:", d); // Debugging statement

        const x1 = parseFloat(d3.select(this).attr("x1"));
        const x2 = parseFloat(d3.select(this).attr("x2"));
        const y1 = parseFloat(d3.select(this).attr("y1"));
        const y2 = parseFloat(d3.select(this).attr("y2"));

        console.log("Coordinates:", x1, y1, x2, y2); // Debugging statement

        const xPosition = (x1 + x2) / 2;
        const yPosition = (y1 + y2) / 2;

        console.log("Tooltip position:", xPosition, yPosition); // Debugging statement

        const textGroup = svg.append("g")
            .attr("class", "min-max-tooltip")
            .attr("transform", `translate(${xPosition},${yPosition})`);

        textGroup.append("text")
            .text(`Min: ${d3.format(".2f")(Math.min(d.MinPrice, d.MaxPrice))}`)
            .attr("x", d.Origin === "Zara" ? 20 : -20) // Adjusted x position based on origin
            .attr("y", -10)
            .style("font-size", "10px")
            .style("font-family", "Playfair Display")
            .style("fill", "black")
            .attr("text-anchor", d.Origin === "Zara" ? "start" : "end"); // Adjusted text-anchor based on origin

        textGroup.append("text")
            .text(`Max: ${d3.format(".2f")(Math.max(d.MinPrice, d.MaxPrice))}`)
            .attr("x", d.Origin === "Zara" ? -20 : 20) // Adjusted x position based on origin
            .attr("y", -10)
            .style("font-size", "10px")
            .style("fill", "black")
            .attr("text-anchor", d.Origin === "Zara" ? "end" : "start"); // Adjusted text-anchor based on origin
    })
    .on("mouseleave", function () {
        console.log("Mouse left min-max line for Zara"); // Debugging statement

        svg.select(".min-max-tooltip").remove();
    });

    // Add hover functionality for min-max values for Depop
    svg.selectAll(".min-line-depop, .max-line-depop")
        .on("mouseenter", function (event, d) {
            const x1 = parseFloat(d3.select(this).attr("x1"));
            const x2 = parseFloat(d3.select(this).attr("x2"));
            const y1 = parseFloat(d3.select(this).attr("y1"));
            const y2 = parseFloat(d3.select(this).attr("y2"));

            const xPosition = (x1 + x2) / 2;
            const yPosition = (y1 + y2) / 2;

            const textGroup = svg.append("g")
                .attr("class", "min-max-tooltip")
                .attr("transform", `translate(${xPosition},${yPosition})`);

            textGroup.append("text")
                .text(`Min: ${d3.format(".2f")(Math.min(d.MinPrice, d.MaxPrice))}`)
                .attr("x", -20)
                .attr("y", -10)
                .style("font-size", "10px")
                .style("font-family", "Playfair Display")
                .style("fill", "black")
                .attr("text-anchor", "end");

            textGroup.append("text")
                .text(`Max: ${d3.format(".2f")(Math.max(d.MinPrice, d.MaxPrice))}`)
                .attr("x", 20)
                .attr("y", -10)
                .style("font-size", "10px")
                .style("font-family", "Playfair Display")
                .style("fill", "black")
                .attr("text-anchor", "start");
        })
        .on("mouseleave", function () {
            svg.select(".min-max-tooltip").remove();
        });

        
    // legend container
    const legendWidth = 120;
    const legendHeight = 30;
    const legendX = width + marginLeft;
    const legendY = marginTop;

    const legendContainer = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${legendX},${legendY})`);

    // legend items
    legendContainer.selectAll("rect")
        .data(["Outerwear", "Bottoms", "Shirts", "Footwear", "Accessories"])
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (_, i) => i * 30)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", d => categoryColors(d)); // Use the same color scale as the bars
        

    legendContainer.selectAll("text")
        .data(["Outerwear", "Bottoms", "Shirts", "Footwear", "Accessories"])
        .enter()
        .append("text")
        .attr("x", 15)
        .attr("y", (_, i) => i * 30 + 9)
        .text(d => d)
        .style("font-size", "10px")
        .style("font-family", "Playfair Display")
        .attr("alignment-baseline", "middle");

    // axes and grid lines
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${marginTop})`)
        .call(d3.axisTop(x).tickFormat(d => Math.abs(d)).ticks(width / 80));

    // vertical line
    svg.append("line")
        .attr("x1", x(0))
        .attr("y1", marginTop)
        .attr("x2", x(0))
        .attr("y2", marginTop + (combinedData.length + 1) * barHeight + marginBottom)
        .attr("stroke", "black");

    // Append the SVG to the chart div
    document.getElementById("chart").appendChild(svg.node());

    // hover functionality for average values
    svg.selectAll(".bar-rect")
        .on("mouseenter", function (event, d) {
            const xPosition = d.Origin === "Zara" ? parseFloat(d3.select(this).attr("x")) - 5 : parseFloat(d3.select(this).attr("x")) + parseFloat(d3.select(this).attr("width")) + 5;
            const yPosition = parseFloat(d3.select(this).attr("y")) + y.bandwidth() / 2;
            svg.append("text")
                .attr("class", "avg-tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("dy", "-0.5em")
                .attr("text-anchor", d.Origin === "Zara" ? "end" : "start")
                .text(`Avg: ${d3.format(".2f")(d.AvgPrice)}`);
        })
        .on("mouseleave", function () {
            svg.select(".avg-tooltip").remove();
        });
  });

  

</script>
