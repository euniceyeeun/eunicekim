import loopWithSubtitle from "../assets/loopwsubtitle.mp4";
import placeholderImage from "../assets/icon.png";
import tipcImage from "../assets/project-icons/2.png";
import distancesImage from "../assets/project-icons/3.png";
import ptplImage from "../assets/project-icons/4.png";

export type Project = {
  id: string;
  label: string;
  href: string;
  indexImageSrc?: string;
  usePausedVideoPreview?: boolean;
  backgroundVideoSrc?: string;
};

export const projects: Project[] = [
  {
    id: "home",
    label: "This Website",
    href: "/",
    usePausedVideoPreview: true,
    backgroundVideoSrc: loopWithSubtitle,
  },
  {
    id: "tipc",
    label: "Texts In Perennial Circulation",
    href: "/tipc",
    indexImageSrc: tipcImage,
  },
  {
    id: "project-03",
    label: "distances",
    href: "/distances",
    indexImageSrc: distancesImage,
  },
  {
    id: "project-04",
    label: "portals to past lives",
    href: "/ptpl",
    indexImageSrc: ptplImage,
  },
  {
    id: "project-05",
    label: "Project 05",
    href: "/project-05",
    indexImageSrc: placeholderImage,
  },
  {
    id: "project-06",
    label: "Project 06",
    href: "/project-06",
    indexImageSrc: placeholderImage,
  },
  {
    id: "project-07",
    label: "Project 07",
    href: "/project-07",
    indexImageSrc: placeholderImage,
  },
  {
    id: "project-08",
    label: "Project 08",
    href: "/project-08",
    indexImageSrc: placeholderImage,
  },
  {
    id: "project-09",
    label: "Project 09",
    href: "/project-09",
    indexImageSrc: placeholderImage,
  },
  {
    id: "project-10",
    label: "Project 10",
    href: "/project-10",
    indexImageSrc: placeholderImage,
  },
];
