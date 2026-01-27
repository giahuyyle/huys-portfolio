const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Nov 24, 2025",
    title:
      "Promoted to Secretary of External Affairs at Information Technology Club of Rouf College (ITCRC)",
    image: "/images/blog1.png",
    link: "https://www.linkedin.com/posts/talha-shahid-khan_im-happy-to-share-that-ive-been-promoted-activity-7398707924333903872-9oYX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEsGpv0BnBQrr7885jnk3iyj2t36Bxea4M8",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "My first SaaS project",
    image: "/images/blog2.png",
    link: "https://www.linkedin.com/posts/talha-shahid-khan_indiehacker-saas-ai-activity-7319459701761441793-8RZj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEsGpv0BnBQrr7885jnk3iyj2t36Bxea4M8",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "My detailed Portfolio",
    image: "/images/blog3.png",
    link: "https://www.facebook.com/share/p/177mffUPwc/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

export {
  blogPosts,
  dockApps,
  navIcons,
  navLinks,
  photosLinks,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
