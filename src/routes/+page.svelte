<script>
  import App from '/src/components/App.svelte';
  import Animation from '/src/components/Animation.svelte';
  // import Line from '/src/components/Line.svelte';


  const datasetUrl = "static/world.csv";
  const maxBars = 6;

</script>


<style>

h1 {
    background-color: #E2E5DE;
      font-family: "Playfair Display", bold;
      font-size: xxx-large;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10vh;
      margin: 0;
      padding: 30px 30px;

  }
  h2 {
    
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0vh;
      margin: 20px;
      padding: 0px 10px;
      
  }
  h4 {
    
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    margin: 20px;
    padding: 10px 100px;
    
}
  h3 {
    background-color: #E2E5DE;
      font-family: "Playfair Display", bold;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10vh;
      margin: 0;
      padding: 0px 30px;
      border-bottom: 2px solid #000; /* Add a subtle line underneath */

  }
  .resource-section {
    text-align: center;
    
  }
  .resource-list {
    list-style-position: inside;
    text-align: left;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
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
  li {
    display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 50px;
  }

</style>

<h1>
  What a Waste!
</h1>

<!-- <Line></Line> -->
<h3> Joseph Guzman and Daniel Park </h3>



<p>  For our final project, we explored the world of second-hand clothing 
  and its implications on today's environmental landscape. In recent times,
   the alarming surge in textile waste has emerged as a pivotal threat to 
   our world, prompting a pressing need for alternative solutions. 
   Motivated by this urgency, we delved into the realm of 
   sustainable fashion, aiming to  endorse second-hand apparel
    as a means to mitigate the environmental repercussions of
     textile disposal. Recognizing a common trend among younger 
     individuals who choose second-hand clothing or vintage/thrifted
      items to conserve resources, we set out to examine this practice. 
      We sought to answer: Does second hand clothing offer a better
       value overall ?
  <br> <br>
  Check out our demo video for a deeper understanding of how to navigate our website and the initiative behind it:
</p>

<li><a href="https://youtube.com/watch?v=0u6gV3ZV8H8" target="_blank">Demo Video</a></li>
<br>
<h2> Textile and Apparel Imports by Country </h2>

<Animation />

<p>
  As the bar chart race indicates, the majority of these countries originate in Asia, with countries like China, Pakistan, and India consistently ranking in the top 5 throughout the years. Other countries such as Mexico and Honduras are shown to be the most sourced countries in North America.
  <br><br> 
  What makes this chart particularly interesting is: who is the main source of income?
  <br><br> 
  Given the condition of these third-world countries, it is still possible for the U.S. to conduct trade on such materials. This is evident not only from the types of countries involved but also from the significant amount of imports (in millions of pounds) that are being transported repeatedly. High numbers reaching over 2 billion pounds of material are observed. It's not to say that these materials are solely for waste, but that a significant percentage of it can be hazardous to the environment if not handled with caution.
</p>
<h2>
  Compare and Contrast
</h2>

<App />
<h4> Zara (left), Depop (right) 
</h4>
<p>
  Examining the diverging bar chart, we can categorize the comparison between Depop and Zara in terms of pricing, categories, and environmental impact. Depop’s average graph appears similar to Zara’s average graph overall. However, categories such as shirts, bottoms, and accessories favor Depop, while outerwear and footwear are in favor of Zara. At first glance, it seems like Zara and Depop are priced similarly, but looking at the Min Max graphs with the min-max box checked, why not just remove the Max values that skew?
<br><br> 
Upon closer inspection, it becomes evident that Depop’s Max values in outerwear, shirts, and bottoms significantly skew their average prices. Depop’s max values are over 2.5 times greater than Zara’s max values, yet Depop still maintains lower average prices in many categories. This suggests that despite the presence of high-priced items, Depop offers a majority of its products at cheaper rates compared to Zara.
<br><br>
What does this mean? This likely indicates that Depop hosts a significant amount of inexpensive clothing items, making it an affordable platform with a wide variety of options. Furthermore, Depop’s role in mitigating textile waste through its platform underscores its positive environmental impact compared to traditional retailers like Zara.
</p>


<h2> In Conclusion, </h2>
<p> 
  Our exploration of second-hand clothing and its environmental implications has revealed significant insights. We have highlighted the growing concern of textile waste and the urgent need for sustainable alternatives in the fashion industry. By analyzing textile and apparel imports by country, we have identified key players in the global supply chain and emphasized the economic and environmental benefits of opting for second-hand clothing.
  <br><br>
Moreover, our comparison between Depop and Zara showcases the potential for affordable and sustainable fashion choices. Depop's role as a platform not only provides affordable clothing options but also supports sustainable practices, contributing positively to environmental conservation efforts. This highlights the importance of consumer choices in driving positive change in the fashion industry.
<br><br>
We encourage everyone to consider the environmental impact of their clothing purchases and explore sustainable alternatives like second-hand clothing platforms. Together, we can make a difference in reducing textile waste and promoting a more sustainable future for fashion.
</p>

<h2 class="resource-section"> Resources </h2>

<div class="resource-section">
  <p> If you are interested in learning more and pushing forward with our cause, here are some websites that provide valuable information about reducing textile waste and sustainablilty:</p>

  <ul class="resource-list">
    <li><a href="https://www.projectropa.org/reducing-waste/#:~:text=Project%20Ropa%20is%20your%20one,%2C%20dresses%2C%20sneakers%20and%20bags." target="_blank">Project Ropa</a></li>
    <li><a href="https://www.treehugger.com/textile-recycling-5203438" target="_blank">Treehugger - Textile Recycling</a></li>
    <li><a href="https://www.sandiegocounty.gov/content/sdc/dpw/recycling/Textiles.html" target="_blank">San Diego County - Textile Recycling</a></li>
  </ul>
</div>