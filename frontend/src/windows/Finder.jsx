import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import clsx from "clsx";
import { Search } from "lucide-react";

const Finder = () => {
  const locations = useLocationStore((s) => s.locations);
  const activeLocation = useLocationStore((s) => s.activeLocation);
  const setActiveLocation = useLocationStore((s) => s.setActiveLocation);

  const { openWindow } = useWindowStore();

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);

    if (["fig", "url"].includes(item.fileType) && item.href) {
      return window.open(item.href, "_blank");
    }

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(item.id === activeLocation?.id ? "active" : "not-active")}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  // no status: just handle empty initial state safely
  const favorites = Object.values(locations || {});
  const myWork = locations?.work?.children ?? [];
  const contentItems = activeLocation?.children ?? [];

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorites", favorites)}
          {renderList("My Work", myWork)}
        </div>

        <ul className="content">
          {contentItems.map((item) => (
            <li
              id={item.id}
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;