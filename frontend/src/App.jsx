import { Dock, Home, Navbar, Welcome } from "#components"
import { Resume, Safari, Terminal, Finder, Text, Image, Contact } from "#windows";

import Draggable from "gsap/Draggable"
import gsap from "gsap"

import { useEffect } from "react";
import useLocationStore from "#store/location";

gsap.registerPlugin(Draggable);

function App() {
  const fetchLocations = useLocationStore((s) => s.fetchLocations);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      {/* windows */}
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />

      {/* home screen folder */}
      <Home />
    </main>
  )
}

export default App
