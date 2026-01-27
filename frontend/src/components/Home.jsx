import { useRef } from "react";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Home = () => {
  const sectionRef = useRef(null);
  const draggablesRef = useRef([]); // store created instances

  const { openWindow } = useWindowStore();
  const locations = useLocationStore((s) => s.locations);
  const setActiveLocation = useLocationStore((s) => s.setActiveLocation);

  const projects = locations?.work?.children ?? [];

  const handleOpenProject = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(
    () => {
      // kill previous instances created by this component
      draggablesRef.current.forEach((d) => d.kill());
      draggablesRef.current = [];

      // only select folders inside this component
      const folders = sectionRef.current?.querySelectorAll(".folder");
      if (!folders || folders.length === 0) return;

      // Draggable.create returns an array of instances
      draggablesRef.current = Draggable.create(folders);
    },
    { dependencies: [projects.length] }
  );

  return (
    <section id="home" ref={sectionRef}>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProject(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
