import { Dock, Home, Navbar, Welcome } from "#components"
import { Resume, Safari, Terminal, Finder, Text, Image, Contact } from "#windows";

import Draggable from "gsap/Draggable"
import gsap from "gsap"

gsap.registerPlugin(Draggable);

function App() {
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
