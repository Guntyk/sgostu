import NearestEvents from "./components/Main/NearestEvents/NearestEvents";
import Advantages from "./components/Main/Advantages/Advantages";
import About from "./components/Main/About/About";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Hero from "./components/Main/Hero/Hero";

export default function App() {
  return (
    <>
      <Loader />
      <Header />
      <main>
        <Hero />
        <About />
        {/* <Advantages /> */}
        {/* <NearestEvents /> */}
      </main>
    </>
  );
}
