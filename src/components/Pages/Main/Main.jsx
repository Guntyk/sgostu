import Announcements from "./Announcements/Announcements";
import NearestEvents from "./NearestEvents/NearestEvents";
import Advantages from "./Advantages/Advantages";
import Database from "./Database/Database";
import Feedback from "./Feedback/Feedback";
import LastNews from "./LastNews/LastNews";
import About from "./About/About";
import Hero from "./Hero/Hero";
import ClubsCard from "../ClubsCard/ClubsCard";

export default function Main() {
  return (
    <main className="main">
      <Hero />
      <About />
      <Advantages />
      <NearestEvents />
      <LastNews />
      <Database />
      <Announcements />
      <Feedback />
      <ClubsCard />
    </main>
  );
}
