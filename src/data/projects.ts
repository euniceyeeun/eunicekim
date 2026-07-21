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
import experimentsVideo1 from "../assets/experiments/contiguousworlds1.mov";
import experimentsVideo2 from "../assets/experiments/contiguousworlds2.mov";
import experimentsVideo3 from "../assets/experiments/contiguousworlds3.mov";
import experimentsVideo4 from "../assets/experiments/contiguousworlds4.mov";
import experimentsVideo5 from "../assets/experiments/symposium.mov";
import experimentsVideo6 from "../assets/experiments/super81.mp4";
import experimentsVideo7 from "../assets/experiments/super82.mp4";
import experimentsVideo8 from "../assets/experiments/super83.mp4";
import experimentsVideo9 from "../assets/experiments/pigeons1.mp4";
import experimentsVideo10 from "../assets/experiments/ball2.mp4";
import epcVideo1 from "../assets/epc/epc1.mp4";
import epcVideo2 from "../assets/epc/epc2.mp4";
import epcVideo3 from "../assets/epc/epc3.mp4";
import epcVideo4 from "../assets/epc/epc4.mp4";

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
        text: `Texts In Perennial Circulation is an NYC-based, friends-owned library project.
        This is a site I designed & coded to facilitate in-person book-borrowing, one of those
        special human exchanges which I hope don't become obsolete. This site was crafted
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
    id: "distances",
    slug: "distances",
    label: "distances",
    indexImageSrc: distancesVideo1,
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
        text: `i used Google's Geolocation API & Reverse Geocoding API along with  OpenWeather's Weather API for data, and used p5.js for
        the animation components. this project was entirely hand-coded using HTML/CSS/Javascript.`,
      },
      {
        type: "text",
        text: `currently not live (until i have budget for google's geolocation API + large traffic).`,
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
    id: "ptpl",
    slug: "ptpl",
    label: "portals to past lives",
    indexImageSrc: ptplVideo1,
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
  {
    id: "epc",
    slug: "everypagecreases",
    label: "Every Page Creases",
    content: [
      {
        type: "text",
        text: "A meditation on the losses, ailments, and pasts that define us; of pages which crease and memories which crumple. (An experimental animation). The film can be viewed here.",
        link: {
          text: "The film can be viewed here.",
          href: "https://vimeo.com/825662916",
        },
      },
      {
        type: "video",
        src: epcVideo1,
        size: "wide",
      },
      {
        type: "video",
        src: epcVideo2,
        size: "wide",
      },
      {
        type: "video",
        src: epcVideo3,
        size: "wide",
      },
      {
        type: "video",
        src: epcVideo4,
        size: "wide",
      },
    ],
  },
  {
    id: "experiments",
    slug: "experiments",
    label: "Experiments",
    content: [
      {
        type: "text",
        text: "other things i've made, both digital & analog...",
      },
      {
        type: "video",
        src: experimentsVideo2,
        size: "wide",
      },
      {
        type: "video",
        src: experimentsVideo3,
        size: "half",
      },
      {
        type: "video",
        src: experimentsVideo4,
        size: "half",
      },
      {
        type: "video",
        src: experimentsVideo5,
        size: "wide",
      },
      {
        type: "video",
        src: experimentsVideo6,
        size: "half",
      },
      {
        type: "video",
        src: experimentsVideo7,
        size: "half",
      },
      {
        type: "video",
        src: experimentsVideo9,
        size: "half",
      },
      {
        type: "video",
        src: experimentsVideo10,
        size: "half",
      },
      {
        type: "video",
        src: experimentsVideo8,
        size: "wide",
      },
    ],
  },
];
