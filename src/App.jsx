import { Dock, Navbar, Welcome } from "#components"
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
    </main>
  )
}

export default App
