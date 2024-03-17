<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { csv } from "d3-fetch";
  import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
  import { schemeSet3 } from "d3-scale-chromatic";
  import { timeFormat, timeParse } from "d3-time-format";
  import { bisector } from "d3-array";

  let countriesData = [];
  let yearColumns = [];
  let keyframes = [];
  let ticker = "";
  let keyframeItems = [];
  let xScale; 
  let yScale; 
  let animationPaused = true; 

  const datasetUrl = 'world.csv';

  // Usage example:
  const colorScale = scaleOrdinal(schemeSet3);

  const dimensions = {
      width: 940,
      height: 600,
      margin: {
          top: 24,
          right: 0,
          bottom: 0,
          left: 0
      }
  };

  const barSize = 50;
  const duration = 750;

  let current = 0;
  const formatTicker = timeFormat("%Y");

  let intervalId; 

  onMount(async () => {
      const rawData = await csv(datasetUrl, ({ Country, ...row }) => ({
          Country,
          ...Object.fromEntries(
              Object.entries(row).map(([key, value]) => [
                  key,
                  isNaN(value) ? value : +value / 1000000,
              ])
          ),
      }));

      // Extract year columns
      yearColumns = rawData.columns.slice(2, -1).map(year => +year);

      const parseYear = timeParse('%Y');

      // Group data by country
      rawData.forEach(row => {
          const countryName = row.Country;
          const countryData = yearColumns.map(year => ({
              year: parseYear(String(year)),
              value: +row[year]
          }));
          const category = row['Cont.'];
          countriesData.push({
              country: countryName,
              values: countryData,
              category: category
          });
          const uniqueCategories = new Set(countriesData.map(d => d.category));
          colorScale.domain([...uniqueCategories]);
      });

      // Create keyframes
      keyframes = yearColumns.map(year => {
          const frameData = countriesData.map(country => {
              return {
                  country: country.country,
                  value: country.values.find(entry => entry.year.getFullYear() === year)?.value || 0,
                  category: country.category 
              };
          });
          // Sort frameData by value
          frameData.sort((a, b) => b.value - a.value);

          return {
              year: parseYear(String(year)),
              data: frameData.slice(0, 10)
          };
      });

      // Initialize scales
      const maxValue = Math.max(...keyframes.flatMap(frame => frame.data.map(d => d.value)));
      xScale = scaleLinear()
          .domain([0, maxValue])
          .range([0, dimensions.width - dimensions.margin.left - dimensions.margin.right]);

      yScale = scaleBand()
          .domain(keyframes[0].data.map(d => d.country))
          .range([0, dimensions.height - dimensions.margin.top - dimensions.margin.bottom])
          .padding(0.1);

      const totalKeyframes = keyframes.length;

      intervalId = setInterval(animate, duration);
  });

  onDestroy(() => {
      clearInterval(intervalId);
  });

  // Function to control animation
  function animate() {
      if (!animationPaused) {
          if (current >= keyframes.length) {
              clearInterval(intervalId);
              return;
          }

          ticker = formatTicker(keyframes[current].year);
          keyframeItems = keyframes[current].data;

          xScale.domain([0, keyframeItems[0].value]);

          current++;
      }
  }

  const interpolateValue = (data, date) => {
      const bisectDate = bisector((d) => d.year).left;
      const i = bisectDate(data, date);

      if (i === 0) {
          return data[0].value;
      }

      if (i === data.length) {
          return data[data.length - 1].value;
      }

      const d0 = data[i - 1];
      const d1 = data[i];
      const t = (date.valueOf() - d0.year.valueOf()) / (d1.year.valueOf() - d0.year.valueOf());

      return Math.floor(d0.value + t * (d1.value - d0.value));
  };

  const rank = (data) => {
      const sortedData = data.slice().sort((a, b) => b.value - a.value); 
      const rankedData = sortedData.map((item, index) => ({
          ...item,
          rank: index + 1 
      }));
      return rankedData;
  };

  function barExit(node) {
      return {
          duration: duration * 2,
          css: (t) => {
              return `
                  opacity: ${1 - t}; // Fade out by reducing opacity as t goes from 1 to 0
              `;
          },
          tick: (t) => {
              if (t === 1) node.remove();
          }
      };
  }

  // Transition function for bar enter
  function barEnter(node) {
      return {
          duration: duration * 2,
          css: (t) => {
              return `
                  opacity: ${t}; // Fade in by increasing opacity as t goes from 0 to 1
              `;
          }
      };
  }
</script>

<style>
    h2 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10vh;
        margin: 20px;
        padding: 8px 10px;
        background-color: #F5F5F5;
    }
  svg {
    display: flex;
    max-width: 100%;
    margin: auto;
    margin-left:-100px; 
    background-color: #F5F5F5;
    
  }
  p {
  font-family: "Times New Roman", serif;
  font-size: large;
  background-color: #F5F5F5;
      display: flex;

      margin: 0;
      padding: 0px 100px;
  }
  ol {
    font-family: "Times New Roman", serif;
  font-size: large;
  background-color: #F5F5F5;
      margin: 5;
      padding: 0px 100px;

  }

</style>

<p> To begin with, we decided to delve into the types of
   textile and apparel imports. Our motivation was fueled by responsibly, 
   where do these textiles and apparels come from?
  As the staggering volume of textile waste, often discarded without a second thought, has become an 
   environmental crisis in todays global issues. As we created this chart, our
   logic was simple, if we understood the origins, we can understand the outside factors,
   that may play a part on the affects of textile waste.
  </p>
  <ol>


  <li><b>Global Patterns:</b> Our primary objective 
    was to examine worldwide textile and apparel 
    imports by country from 1989 to 2022. By 
    identifying the origins of these imports, 
    we aimed to pinpoint key countries that may 
    have correlations with social and economic 
    indicators impacting our environment. Through 
    this lens, we sought to unravel global patterns,
     uncovering which nations contribute significantly
      to the textile supply chain and which face 
      challenges in sustainable practices.
    </li> 
    <br>
<li><b> Economic Implications:</b> Expanding on the economic implications of 
  textile and apparel imports, it's crucial to recognize that countries 
  contributing significantly to these imports often experience economic
   benefits and challenges. Understanding these economic aspects is essential 
   for devising strategies that balance economic growth with environmental 
   responsibility in the textile supply chain. By analyzing the economic
    implications of textile imports, we can identify opportunities 
    for sustainable practices and address challenges that arise 
    from economic dependencies on the textile industry.


</li>
    </ol>
    <p>


    Therefore, underneath, we created an animated bar chart race that
     vividly illustrates the evolution of U.S. Textile and Apparel
      Imports by Origin Over Time.
  
    </p>



<h2>U.S. Textile and Apparel Imports by Origin Over Time (in lbs.) </h2>

<svg
  width="100%"
  height="100%"
  viewBox={`2 20 ${dimensions.width * 2} ${dimensions.height}`}
  preserveAspectRatio="xMidYMid meet"
>
  <line
    x1={dimensions.margin.left + 470}
    y1={dimensions.margin.top+20}
    x2={dimensions.margin.left + 470 }
    y2={dimensions.height - dimensions.margin.bottom-40}
    stroke="black"
  />

  <g fill-opacity="0.6" transform={`translate(${dimensions.width / 2}, ${dimensions.height / 2})`}>
    {#each keyframeItems.slice(0, 10) as item, i (item.country)}
      {#if item.value > 0}
        <g in:barEnter out:barExit>
          <rect
            fill={colorScale(item.category)}
            height={yScale.bandwidth()}
            x={xScale(0)}
            style={`transition: width ${duration / 2000}s linear, transform ${duration / 2000}s linear; width: ${1.5 * (xScale(item.value) - xScale(0))}px; transform: translateY(${(i - 5) * barSize}px);`}
          />
          <text
            text-anchor="end"
            font-weight="bold"
            font-size="12"
            y={yScale.bandwidth() / 2}
            x="-6"
            dy="-0.3em"
            style={`transition: transform ${duration / 2000}s linear; transform: translate3d(${1.5 * (xScale(item.value) - xScale(0))}px, ${(i - 5) * barSize}px, 0);`}
          >
            {item.country}
            <tspan fill-opacity="0.7" font-weight="normal" x="-6" dy="1.15em">
              {(item.value).toFixed(2)}M
            </tspan>
          </text>
        </g>
      {/if}
    {/each}
  </g>
  {#if ticker}
    <text
      y={dimensions.height - 1}
      x={dimensions.width / 2}
      text-anchor="middle"
      font-weight="bold"
      font-size={`${barSize}px`}
      dy="0.01em">{ticker}</text
    >
  {/if}

  <!-- Play/Pause button -->
  <g transform={`translate(${dimensions.width - 100}, ${dimensions.height - 40})`}>
    <rect
      width="70"
      height="30"
      fill="white"
      stroke="black"
      rx="5"
      ry="5"
    />
    <text
      x="35"
      y="20"
      text-anchor="middle"
      font-size="14px"
      fill="black"
      style="cursor: pointer;"
      on:click={() => animationPaused = !animationPaused}>
      {animationPaused ? 'Play' : 'Pause'}
    </text>
  </g>

  <!-- Reset button -->
  <g transform={`translate(${dimensions.width - 200}, ${dimensions.height - 40})`}>
    <rect
      width="70"
      height="30"
      fill="white"
      stroke="black"
      rx="5"
      ry="5"
      style="cursor: pointer;"
      on:click={() => {
        current = 0;
        animationPaused = true;
        animate();
      }}
    />
    <text
      x="35"
      y="20"
      text-anchor="middle"
      font-size="14px"
      fill="black"
      style="cursor: pointer;"
      on:click={() => {
        current = 0;
        animationPaused = true;
        animate(); 
      }}>
      Reset
    </text>
  </g>
</svg>
