import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "video-editing",
    number: "01",
    title: "VIDEO EDITING",
    shortDescription:
      "Turn raw footage into polished, engaging videos with professional pacing, transitions, sound design and color treatment.",
    description:
      "Turn raw footage into polished, engaging videos with professional pacing, transitions, sound design and color treatment. We shape the story first, then refine every cut, so the finished video holds attention from the first frame to the last.",
    includes: [
      "YouTube videos",
      "Long-form content",
      "Corporate videos",
      "Promotional videos",
      "Event videos",
    ],
    deliverables: [
      "Final edited video in your delivery format",
      "Color-treated and sound-mixed master",
      "Revision rounds on the edit",
      "Captions and export variants on request",
    ],
    useCases: [
      "Weekly YouTube channel uploads",
      "Brand and product videos",
      "Company updates and internal communication",
      "Event recaps and highlight films",
    ],
    image: "/placeholders/service-video-editing.svg",
  },
  {
    slug: "short-form",
    number: "02",
    title: "REELS & SHORT-FORM",
    shortDescription:
      "Short-form content designed to capture attention quickly and keep viewers watching.",
    description:
      "Short-form content designed to capture attention quickly and keep viewers watching. We build vertical edits around a strong opening, tight pacing and clear captions, formatted for each platform.",
    includes: [
      "Instagram Reels",
      "YouTube Shorts",
      "Vertical videos",
      "Social clips",
      "Repurposed content",
    ],
    deliverables: [
      "Vertical 9:16 edits ready to post",
      "Captions and on-screen text",
      "Platform-specific exports",
      "Multiple clips from a single source video",
    ],
    useCases: [
      "Turning long videos into social clips",
      "Consistent Reels and Shorts for creators",
      "Product and promo teasers",
      "Repurposing existing footage for new platforms",
    ],
    image: "/placeholders/service-short-form.svg",
  },
  {
    slug: "podcast-editing",
    number: "03",
    title: "PODCAST EDITING",
    shortDescription:
      "Turn long conversations into polished episodes and engaging short-form clips.",
    description:
      "Turn long conversations into polished episodes and engaging short-form clips. We clean the audio, cut for flow and pull out the moments worth sharing, so each recording works as a full episode and as a set of clips.",
    includes: [
      "Video podcast editing",
      "Audio cleanup",
      "Multi-camera editing",
      "Captions",
      "Social clips",
    ],
    deliverables: [
      "Full-length edited episode",
      "Cleaned and balanced audio",
      "Short clips for social platforms",
      "Captioned versions of clips",
    ],
    useCases: [
      "Weekly video podcast production",
      "Multi-camera interview shows",
      "Clip packages to promote each episode",
      "Repurposing an audio-only archive for video platforms",
    ],
    image: "/placeholders/service-podcast-editing.svg",
  },
  {
    slug: "creative-motion",
    number: "04",
    title: "CREATIVE & MOTION",
    shortDescription:
      "The visual details that make your content feel professional and memorable.",
    description:
      "The visual details that make your content feel professional and memorable. From motion graphics to color and sound, we add the finishing layer that separates a rough cut from a finished piece.",
    includes: [
      "Motion graphics",
      "Text animation",
      "Captions",
      "Color correction",
      "Sound design",
      "Intros and outros",
      "Thumbnail design",
    ],
    deliverables: [
      "Animated titles, lower thirds and graphics",
      "Color-corrected footage",
      "Sound design and mix",
      "Intro, outro and thumbnail files",
    ],
    useCases: [
      "Giving a channel a consistent visual identity",
      "Adding graphics to explainers and promos",
      "Polishing footage shot in mixed conditions",
      "Packaging a series with a shared intro and outro",
    ],
    image: "/placeholders/service-creative-motion.svg",
  },
];
