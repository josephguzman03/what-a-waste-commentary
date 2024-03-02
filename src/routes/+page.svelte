<script>
  import App from '/src/components/App.svelte';
  import Globe from '/src/components/Globe.svelte';
  import Animation from '/src/components/Animation.svelte';
</script>
<style>
  .body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
  }
</style>

<h1>What a waste!</h1>
<h3>Created by Joseph Guzman and Daniel Park</h3>
<p> --- </p>
<h4> Write Up</h4>
<p> For the write-up, we were quite fair in the work we undertook for this project. 

  Daniel was responsible for collecting and scraping Depop sold listing data, whereas Joseph 
  was responsible for cleaning and wrangling the Zara listing data. Daniel also handled the 
  visuals and structure of the website, while Joseph set up the website and wrote the sections.
   So far, we have been able to present visuals of the Depop and Zara data and finalize the
    structure of the website. Additionally, we managed to collect data from the US Department
     of Agriculture, where we will be utilizing the data of textile imports around the world 
     for geospatial visualization. We initially aimed to implement a scrollyteller, but 
     scrapped the idea due to difficulties in debugging caused by the structure of our folders.
      However, we will explore the possibility of incorporating it in the future.
  <br> <br>

  The challenging part of the project is curating our designs to be unique and presentable,
   as well as maintaining the structure of our website. As mentioned earlier, we encountered 
   difficulty in developing a scrollyteller for our project, so if we were to continue with 
   that idea, strategies would need to be put in place. Another issue we foresee is crafting 
   a story that is worth publishing and leaving a message for our readers. The datasets can 
   be very limiting for our abilities, so navigating through that will definitely require time.
    Additionally, translating the data onto d3 and incorporating different functions that we 
    may not be familiar with presents another challenge. Especially since we aim to create 
    visuals to be interactive and have animations that seem tangible, we are still interested 
    in developing those tools. Moving forward, we will aim to be creative with our wording, 
    visuals, and website design. </p>

<p> --- </p>





<p> For our final project, we embarked on an exploration of the world of second-hand clothing 
  and its profound implications in today's environmental landscape. In recent times, the alarming 
  surge in textile waste has emerged as a pivotal threat to our ecosystem, prompting a pressing need 
  for alternative solutions. Motivated by this urgency, we delved into the realm of sustainable fashion, 
  aiming to discern the efficacy of adopting second-hand apparel as a means to mitigate the environmental repercussions
  of textile disposal.Recognizing a common trend among younger individuals who choose second-hand clothing or vintage/thrifted items 
  to conserve resources, we set out to examine the real impact of this practice.Thus, wesought to unravel the question: Does the act of second-hand 
  clothing acquisition significantly alter the environmental crisis induced by textile waste? Through meticulous research and analysis, 
  we endeavored to shed light on this pertinent issue and offer insights into sustainable consumption practices in the realm of fashion.
</p>
<Globe />

<App />

<Animation />

<h2> Conclusion Section </h2>
<p> In this section, we hope to conclude our findings, wrap up our website, and provide resources that hopefully, inspire others to make a difference. </p>


