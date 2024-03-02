<main>
  <h2>Zara v Depop - Average Price by Category</h2>
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
  <div bind:this={chart}></div>

  <h4> Vis explaination goes here </h4>

</main>

<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let zaraData = [];
  let depopData = [];
  let chart;

  onMount(async () => {
    // Fetch Zara data
    const zaraRes = await fetch('zara_price.csv');
    const zaraCsv = await zaraRes.text();
    zaraData = d3.csvParse(zaraCsv, d3.autoType);

    // Fetch Depop data
    const depopRes = await fetch('final_depop.csv');
    const depopCsv = await depopRes.text();
    depopData = d3.csvParse(depopCsv, d3.autoType);

    // Merge data for stacking
    const mergedData = [...zaraData, ...depopData];

    // Prepare the scales for positional and color encodings.
    const categories = ['accessories', 'footwear', 'outerwear', 'bottoms', 'shirts'];

    // Group data by category and calculate average price for Zara and Depop
    const aggregatedData = categories.map(category => {
      const zaraPrices = zaraData.filter(d => d.Category === category).map(d => d.Price);
      const depopPrices = depopData.filter(d => d.Category === category).map(d => d.Price);
      return {
        Category: category,
        ZaraAvgPrice: d3.mean(zaraPrices),
        DepopAvgPrice: d3.mean(depopPrices)
      };
    });

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select(chart)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(categories)
      .range([0, width])
      .padding(0.1);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(aggregatedData, d => Math.max(d.ZaraAvgPrice, d.DepopAvgPrice))])
      .nice()
      .range([height, 0]);

    // Draw Zara bars
    svg.selectAll('.bar.zara')
      .data(aggregatedData)
      .enter()
      .append('rect')
      .attr('class', 'bar zara')
      .attr('x', d => x(d.Category))
      .attr('width', x.bandwidth() / 2)
      .attr('y', d => y(d.ZaraAvgPrice))
      .attr('height', d => height - y(d.ZaraAvgPrice))
      .attr('fill', 'steelblue')
      .on('mouseover', function(d) {
        d3.select(this)
          .attr('fill', 'lightsteelblue');
        tooltip.style('opacity', 1)
          .html(`<strong>${d.Category}</strong><br>Average Price (Zara): $${d.ZaraAvgPrice.toFixed(2)}<br>Average Price (Depop): $${d.DepopAvgPrice.toFixed(2)}`)
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY}px`);
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .attr('fill', 'steelblue');
        tooltip.style('opacity', 0);
      });

    // Draw Depop bars
    svg.selectAll('.bar.depop')
      .data(aggregatedData)
      .enter()
      .append('rect')
      .attr('class', 'bar depop')
      .attr('x', d => x(d.Category) + x.bandwidth() / 2)
      .attr('width', x.bandwidth() / 2)
      .attr('y', d => y(d.DepopAvgPrice))
      .attr('height', d => height - y(d.DepopAvgPrice))
      .attr('fill', 'orange')
      .on('mouseover', function(d) {
        d3.select(this)
          .attr('fill', 'lightsalmon');
        tooltip.style('opacity', 1)
          .html(`<strong>${d.Category}</strong><br>Average Price (Depop): $${d.DepopAvgPrice.toFixed(2)}<br>Average Price (Zara): $${d.ZaraAvgPrice.toFixed(2)}`)
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY}px`);
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .attr('fill', 'orange');
        tooltip.style('opacity', 0);
      });

    // Add the X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add legend
    svg.append('rect')
      .attr('x', width - 80)
      .attr('y', -10)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'steelblue');

    svg.append('text')
      .attr('x', width - 65)
      .attr('y', -5)
      .text('Zara');

    svg.append('rect')
      .attr('x', width - 80)
      .attr('y', 10)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'orange');

    svg.append('text')
      .attr('x', width - 65)
      .attr('y', 15)
      .text('Depop');

    // Add tooltip
    const tooltip = d3.select(chart)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip');
  });
</script>

<style>
  /* Write your CSS here */
  .tooltip {
    position: absolute;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    pointer-events: none;
    font-size: 12px;
    border: 1px solid #ccc;
  }
        body {
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
</style>