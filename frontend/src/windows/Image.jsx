import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { title, name, imageUrl } = data;

  const heading = title || name;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{heading}</h2>
      </div>

      <div className="p-5">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={heading || "image"}
            className="w-full h-auto rounded-md"
          />
        )}
      </div>
    </>
  );
};

export default WindowWrapper(Image, "imgfile");