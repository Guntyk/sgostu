import NearestEvents from "./NearestEvents/NearestEvents";
import Advantages from "./Advantages/Advantages";
import Feedback from "./Feedback/Feedback";
import LastNews from "./LastNews/LastNews";
import About from "./About/About";
import Hero from "./Hero/Hero";

export default function Main() {
  return (
    <main className="main">
      <Hero />
      <About />
      <Advantages />
      <NearestEvents />
      <LastNews />
      <Feedback />
    </main>
  );
}
