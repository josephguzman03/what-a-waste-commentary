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
      font-size: xx-large;
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
</p>
<h2> Textile and Apparel Imports by Country </h2>

<Animation />

<p>
  As the bar chart race indicates, the majority of these countries originate in the Asian continent, with countries like China, Pakistan, and India consistently ranking in the top 5 throughout the years. Other countries such as Mexico and Honduras are shown to be the most sourced countries in North America. 
  <br><br>
  What makes this particularly interesting is: who is the main source of income?
<br><br>
Given the political and economic state of these third-world countries, it is possible for the U.S. to conduct trade on such materials. This is evident not only from the types of countries involved but also from the significant amount of imports in pounds that are being transported repeatedly. High numbers reaching over 2 billion pounds of material are observed. It's not to say that these materials are solely for waste, but a significant percentage of them can be hazardous to the environment if not handled with caution.
</p>
<h2>
  Compare and Contrast
</h2>

<App />

<p>
  info about the graph
</p>


<h2> Conclusion Section </h2>
<p> In this section, we hope to conclude our findings, wrap up our website, and provide resources that hopefully, inspire others to make a difference. </p>


