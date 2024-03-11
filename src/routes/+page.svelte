<script>
  import App from '/src/components/App.svelte';
  import Animation from '/src/components/Animation.svelte';
  import Line from 'src/components/Line.svelte';


  const datasetUrl = "static/world.csv";
  const maxBars = 6;

</script>


<style>


  h2 {
    
      display: flex;
      justify-content: left;
      align-items: center;
      height: 5vh;
      margin: 0px;
      padding: 10px 100px;
      
  }
  h3 {
    background-color: #E2E5DE;
      font-family: "Playfair Display", bold;
      display: flex;
      justify-content: left;
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


<Line></Line>
<h3> Joseph Guzman and Daniel Park </h3>



<p>  For our final project, we embarked on an exploration of the world of second-hand clothing 
  and its profound implications in today's environmental landscape. In recent times, the alarming 
  surge in textile waste has emerged as a pivotal threat to our ecosystem, prompting a pressing need 
  for alternative solutions. Motivated by this urgency, we delved into the realm of sustainable fashion, 
  aiming to discern the efficacy of adopting second-hand apparel as a means to mitigate the environmental repercussions
  of textile disposal.Recognizing a common trend among younger individuals who choose second-hand clothing or vintage/thrifted items 
  to conserve resources, we set out to examine the real impact of this practice.Thus, wesought to unravel the question: Does the act of second-hand 
  clothing acquisition significantly alter the environmental crisis induced by textile waste? Through meticulous research and analysis, 
  we endeavored to shed light on this pertinent issue and offer insights into sustainable consumption practices in the realm of fashion.
</p>
<h2> Textile and Apparel Imports by Country </h2>

<Animation />

<p>
  info about the graph
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


