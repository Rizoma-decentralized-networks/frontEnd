import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">  
        <NavBar />
        <main className="flex-grow overflow-hidden">
          <HeroSection />
        </main>
        <Footer />
      </div>
    </>
  );
}


export default App;
