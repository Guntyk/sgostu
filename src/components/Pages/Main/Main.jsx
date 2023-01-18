import NearestEvents from "./NearestEvents/NearestEvents";
import Advantages from "./Advantages/Advantages";
import Feedback from "./Feedback/Feedback";
import About from "./About/About";
import Hero from "./Hero/Hero";

export default function Main() {
  return (
    <main className="main">
      <Hero />
      <About />
      <Advantages />
      <NearestEvents />
      <Feedback />
    </main>
  );
}
