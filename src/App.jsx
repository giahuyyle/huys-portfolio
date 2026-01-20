import { Dock, Navbar, Welcome } from "#components"
import { Resume, Safari, Terminal, Finder, Text, Image } from "#windows";

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
    </main>
  )
}

export default App
