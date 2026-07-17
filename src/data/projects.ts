import loopWithSubtitle from "../assets/loopwsubtitle.mp4";
import placeholderImage from "../assets/icon.png";
import tipcImage1 from "../assets/tipc/1.png";
import tipcVideo1 from "../assets/tipc/1.mov";
import tipcVideo2 from "../assets/tipc/2.mov";
import ptplVideo1 from "../assets/ptpl/1.mov";
import ptplVideo2 from "../assets/ptpl/2.mov";
import ptplVideo3 from "../assets/ptpl/3.mov";
import distancesVideo1 from "../assets/distances/1.mp4";
import distancesVideo2 from "../assets/distances/2.mp4";
import distancesImage1 from "../assets/distances/3.png";
import distancesImage2 from "../assets/distances/4.png";
import distancesVideo3 from "../assets/distances/5.mp4";
import distancesVideo4 from "../assets/distances/6.mp4";
import distancesVideo5 from "../assets/distances/7.mp4";
import distancesImage3 from "../assets/distances/8.png";
import distancesImage4 from "../assets/distances/9.png";

export type ProjectContentBlock =
  | {
      type: "text";
      text: string;
      link?: {
        text: string;
        href: string;
      };
    }
  | {
      type: "image";
      src?: string;
      alt?: string;
      size?: "wide" | "half";
    }
  | {
      type: "video";
      src: string;
      size?: "wide" | "half";
    };

export type Project = {
  id: string;
  slug: string;
  label: string;
  indexImageSrc?: string;
  content: ProjectContentBlock[];
};

export const homeBackgroundVideoSrc = loopWithSubtitle;

export const projects: Project[] = [
  {
    id: "tipc",
    slug: "tipc",
    label: "Texts In Perennial Circulation",
    indexImageSrc: tipcImage1,
    content: [
      {
        type: "text",
        text: `Texts In Perennial Circulation is an NYC-based, friends-owned library.
        I designed & coded this site to facilitate in-person book-borrowing, one of those
        special human exchanges which I hope never become obsolete. This site was crafted
        using HTML/CSS/React, and MongoDB. Find the live site here.`,
        link: {
          text: "Find the live site here.",
          href: "https://www.tipc-library.org/",
        },
      },
      {
        type: "image",
        src: tipcImage1,
        alt: "Texts In Perennial Circulation",
        size: "wide",
      },
      {
        type: "video",
        src: tipcVideo1,
        size: "wide",
      },
      {
        type: "video",
        src: tipcVideo2,
        size: "wide",
      }
    ],
  },
  {
    id: "project-03",
    slug: "distances",
    label: "distances",
    indexImageSrc: placeholderImage,
    content: [
      {
        type: "text",
        text: `distances is a weather app for humans who don't share space.`
      },
      {
        type: "text",
        text: `digital applications shouldn't solely be designed for optimization
        and pragmatism, but for reflecting humanity. missing another, that longing
        to be with someone currently not by your side, is one of the most human emotions.
        this is an experiment on how a practical app meant to display the weather can be imbued
        with this sentiment of longing.`,
      },
      {
        type: "text",
        text: `currently not live because i don't have the budget
        for google's geolocation API if many people were to use this site.`,
      },
        
      {
        type: "video",
        src: distancesVideo1,
        size: "wide",
      },
      {
        type: "video",
        src: distancesVideo2,
        size: "wide",
      },
      {
        type: "video",
        src: distancesVideo3,
        size: "wide",
      },
      {
        type: "image",
        src: distancesImage1,
        size: "half",
      },
      {
        type: "image",
        src: distancesImage2,
        size: "half",
      },
      {
        type: "video",
        src: distancesVideo4,
        size: "wide",
      },
      {
        type: "video",
        src: distancesVideo5,
        size: "wide",
      },
      {
        type: "image",
        src: distancesImage3,
        size: "half",
      },
      {
        type: "image",
        src: distancesImage4,
        size: "half",
      }
    ],
  },
  {
    id: "project-04",
    slug: "ptpl",
    label: "portals to past lives",
    indexImageSrc: placeholderImage,
    content: [
      {
        type: "text",
        text: "portals to past lives is  is an ongoing collection of moments lived and recorded. It is an exploration of the way digital documentation allows access to our former selves and sentiments in the form of limited glimpses, familiar sounds, and floating memories. find the live project here.",
        link: {
          text: "find the live project here.",
          href: "https://euniceyeeun.github.io/portalstopastlives/",
        },
      },
      {
        type: "video",
        src: ptplVideo1,
        size: "half",
      },
      {
        type: "video",
        src: ptplVideo2,
        size: "half",
      },
      {
        type: "video",
        src: ptplVideo3,
        size: "wide",
      },
    ],
  },
];
