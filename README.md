# NEXUS — Video.js v10 Skin

NEXUS is a cinematic, black-and-red video player skin built with **React 19**, **Video.js v10** (`@videojs/react`), **Mux Video**, **Tailwind CSS**, and **Vite**.

Its visual direction is a premium, low-light viewing experience: a near-black interface, vivid red accents, glass-like control surfaces, compact typography, and subtle motion. The controls are designed to stay visually quiet until the viewer interacts with the player.

## Design concept

NEXUS takes inspiration from cinematic editing suites and modern streaming interfaces. The dark surfaces help the video remain the focus, while the red accent color gives playback actions and active states a clear visual hierarchy. Translucent panels and restrained shadows add depth without turning the controls into the main event.

## Features

- Custom play/pause, 10-second rewind/forward, elapsed time, and seek controls.
- Volume and mute control with a volume slider.
- Playback speed menu (0.5× to 2×).
- Video quality selection when renditions are available from the stream.
- Fullscreen and Picture-in-Picture controls (subject to browser support).
- Previous/next video navigation across the included Mux playback IDs.
- Chapter navigation using the included `public/chapters.vtt` WebVTT file.
- Automatically hiding controls during playback, with controls revealed by pointer/touch interaction.
- Keyboard shortcuts for playback, mute, volume, seeking, fullscreen, and Picture-in-Picture.
- Responsive player layout for desktop and mobile viewports.
- Reduced-motion CSS rules are included in the project styles.

## Tech stack

- React 19
- `@videojs/react` 10.x
- `@videojs/mux-video` 10.x
- Tailwind CSS 4
- Vite 8

## Getting started

### Requirements

- Node.js (use a current LTS release)
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Create a production build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `M` | Mute / unmute |
| `↑` / `↓` | Increase / decrease volume |
| `←` / `→` | Seek backward / forward by 10 seconds |
| `F` | Enter / exit fullscreen |
| `P` | Enter / exit Picture-in-Picture |

Keyboard handling can vary by browser and focus location. Test the shortcuts with the player focused, and ensure all visible controls can also be reached using `Tab` and operated using `Enter` or `Space`.

## Mux video assets

The demo player currently uses these public Mux playback IDs, configured in `src/components/NexusPlayer.jsx`:

- `YZJkPyAC01idtK5HuPp02sXMGWERdZ8q2Ii5ELXQMcQYA` — Cinematic
- `UhHqlIT8pmJD6RTrES3VzzcVTuPJmoj02WuiN4cjSHm8` — Abstract
- `MK3ZtvMhy3R3xSG15BbK4W01BfzRjD01f01kAdnpQv4jIk` — Nature

For the Video.js Skins Design Challenge Mux bonus, submit the playback ID for the asset you are using as the challenge demo and make sure that asset remains live through judging. Confirm that you own or are authorized to use each video asset and that its playback access is public. Do not assume that listing a playback ID in this repository proves ownership or continued availability.

## Project structure

```text
nexus-skin/
├── public/
│   ├── chapters.vtt
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── ChapterPanel.jsx
│   │   ├── NexusPlayer.jsx
│   │   ├── PlayerControls.jsx
│   │   ├── PlayerHeader.jsx
│   │   ├── SettingsPanel.jsx
│   │   ├── ThumbnailStrip.jsx
│   │   └── VolumeControl.jsx
│   │
│   ├── hooks/
│   │   └── usePlayerControls.js
│   │
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── README.md
└── LICENSE-APACHE-2.0
```

## Before submitting

The challenge requires a publicly accessible URL that loads a working Video.js v10 player and plays video. This repository contains the application source; deploy the production build to a public host (for example, Vercel or Netlify) and test the deployed URL.

Use the following final QA checklist:

- [ ] The public URL loads without login or local setup.
- [ ] The player is using Video.js v10 and plays the submitted Mux asset.
- [ ] Play/pause, seeking, time display, volume/mute, and fullscreen all work.
- [ ] Playback speed and quality menus work where supported by the stream.
- [ ] The layout remains usable at desktop and mobile player sizes.
- [ ] Every control can be reached and operated with a keyboard.
- [ ] Menus can be closed with the keyboard and focus remains visible.
- [ ] Text and icons remain legible over both bright and dark footage.
- [ ] Touch targets are comfortable on a phone.
- [ ] Reduced-motion preferences are respected.
- [ ] The Mux asset remains live through judging.
- [ ] The submission includes a short visual/design description and, if claiming the live-site bonus, a URL to a real website using the skin.

## Challenge submission description

**NEXUS** is a cinematic Video.js v10 skin built around a premium black-and-red visual system. Its glass-like control surface, compact playback tools, chapter navigation, quality and speed menus, and subtle auto-hide behavior are designed to keep the viewer immersed in the video while keeping essential controls close at hand.

## License

This project is licensed under the Apache License, Version 2.0. See [`LICENSE`](./LICENSE) for the full license text.

The Video.js, React, Mux, Tailwind CSS, Vite, and other third-party packages remain subject to their respective licenses. Their names and trademarks belong to their respective owners.
