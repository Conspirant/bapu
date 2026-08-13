# Bapu's Voice

Build a polished, production-quality responsive website called “Bapu Speaks” for an interactive school notice board.

CORE CONCEPT:

A physical school notice board contains a portrait of Mahatma Gandhi and a QR code. Students scan the QR code and land on this website. The website should feel like an extension of the physical notice board: educational, historical, elegant, interactive, and memorable.

IMPORTANT:

Do NOT make this look like a generic school website, a basic patriotic template, or an AI-generated landing page.

The visual quality should feel closer to a small museum exhibition / premium editorial website.

DESIGN DIRECTION:

- Premium editorial + museum exhibition aesthetic

- Warm ivory / aged-paper background

- Charcoal/near-black typography

- Subtle muted saffron and green accents only

- Monochrome Gandhi imagery

- Subtle paper grain/noise texture

- Elegant serif display typography combined with a clean modern sans-serif

- Lots of whitespace

- Strong visual hierarchy

- No excessive gradients

- No glassmorphism

- No neon colors

- No childish school graphics

- No excessive rounded cards

- Avoid the typical orange/green/white “Indian patriotic website” look

PAGE STRUCTURE:

1. HERO / QR LANDING EXPERIENCE

The first screen should immediately communicate:

“Bapu Speaks”

Small eyebrow:

“AN INTERACTIVE SCHOOL NOTICE BOARD”

Main heading:

“Some lessons never grow old.”

Supporting text:

“Scan. Listen. Discover.”

Place a large, elegant monochrome portrait/illustration of Mahatma Gandhi on one side.

Add a prominent circular audio interaction button:

“▶ Listen”

Under it:

“Tap to hear today’s message”

The hero should have subtle entrance animations:

- Gandhi portrait slowly fades/slides in

- Typography appears sequentially

- Very subtle floating/paper movement

- Audio button has a restrained pulse when idle

Do NOT autoplay audio on page load because browsers may block it.

2. “TODAY’S MESSAGE”

Create a beautiful editorial section.

Heading:

“Today’s Message”

Show a short educational Gandhi-inspired message.

Example:

“Be the change you wish to see in the world.”

IMPORTANT:

Do not falsely imply this is an exact recording or authentic voice of Mahatma Gandhi.

Add:

- Play button

- Progress bar

- Duration

- Audio waveform-style visual animation while playing

Create the audio player so that an actual audio file can easily be inserted later.

For now, use a placeholder audio implementation and clearly structure the code so I can replace it with an MP3 file.

3. INTERACTIVE “DISCOVER GANDHI” SECTION

Create 4 visually interesting interactive items:

EARLY LIFE

“1869 — Porbandar”

THE STRUGGLE

“South Africa → India”

THE MOVEMENT

“Non-violence & Civil Disobedience”

THE LEGACY

“Truth. Peace. Simplicity.”

When clicked, each opens a smooth expandable panel/modal with concise educational information.

Use subtle timeline animations.

4. TIMELINE

Create a horizontal/vertical responsive timeline with important dates:

1869 — Born in Porbandar

1893 — Went to South Africa

1915 — Returned to India

1930 — Salt March

1942 — Quit India Movement

1948 — Passed away

Make this feel like a museum timeline, not a school textbook.

5. “THE NOTICE BOARD”

This is where the physical school notice board connects with the website.

Heading:

“What’s happening at school?”

Display realistic school notices such as:

“Independence Day Programme”

15 August

Main Auditorium

“Inter-House Quiz”

20 August

Registration closes soon

“Essay Competition”

Theme: Truth, Peace & India

Each notice should look like a pinned paper/card rather than a generic web card.

Include small labels such as:

EVENT

COMPETITION

ANNOUNCEMENT

Make these easy to edit later from a single data structure.

6. QR CONNECTION SECTION

Create a dedicated section explaining the physical installation.

Heading:

“See the board. Scan the code. Hear the story.”

Show a stylized QR-code placeholder.

Beside it explain:

“Find the QR code on the school notice board.

Scan it with your phone.

Listen to the message.

Explore Gandhi’s story.”

Make this visually clever, with a small illustrated connection between a physical notice board and the website.

7. FINAL SECTION

Large closing statement:

“Truth is timeless.”

Small text:

“Learn something. Share something. Make something better.”

Include:

“Bapu Speaks”

“An interactive school learning experience”

TECHNICAL REQUIREMENTS:

- React + TypeScript

- Tailwind CSS

- shadcn/ui where appropriate

- Fully responsive

- Mobile-first because most QR scans will happen on phones

- Excellent desktop presentation too

- Smooth but restrained animations

- Use Framer Motion if available

- Accessible semantic HTML

- Keyboard accessible controls

- Good contrast

- Fast loading

- Do not add authentication

- Do not add a backend/database yet

- Keep the architecture simple and easy to modify

AUDIO:

Create a reusable AudioPlayer component.

It should support:

- play/pause

- progress

- duration

- seek

- volume

- animated waveform/equalizer while playing

Put the audio source in an obvious configuration/data file so I can later replace:

"/audio/gandhi-message.mp3"

Do not use copyrighted audio without permission.

IMPORTANT CONTENT ACCURACY:

Do not fabricate Gandhi quotes or historical facts.

Where attribution is uncertain, do not present a quote as definitely Gandhi’s.

The website should clearly distinguish historical information from inspirational interpretation.

MICRO-INTERACTIONS:

- Buttons should have subtle hover/press states

- Timeline elements reveal themselves as the user scrolls

- Notice papers have tiny realistic movement/shadow

- Audio player becomes visually active when playing

- Gandhi portrait can have a very subtle parallax effect

- QR section should have a subtle scanning-line animation

- Keep animations elegant and fast

NAVIGATION:

Minimal top navigation:

Bapu Speaks

Today

His Story

Notice Board

On mobile use a clean compact navigation.

IMPORTANT VISUAL DETAIL:

Use a large Gandhi portrait as the visual anchor, but do not let the portrait dominate every section.

The overall experience should feel like:

“a premium museum exhibit that happens to be connected to a school notice board.”

Before finishing, inspect the entire site at mobile and desktop sizes and fix:

- awkward spacing

- overflowing elements

- weak typography hierarchy

- excessive rounded cards

- generic-looking sections

- animation glitches

- poor mobile layout

Do not stop at a basic functional implementation. Spend effort on the visual polish and coherence of the entire experience.

This project is Bapu Speaks — An Interactive School Notice Board for General Thimayya Public School.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
