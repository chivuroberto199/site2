# Unde Seismice — Educational Website PRD

## Problem Statement
Multi-page educational website about Seismic Waves for a high school physics project (11th grade, Romanian language). Professional, interactive, with animations, virtual applications, and dynamic elements.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + shadcn/ui + framer-motion + recharts
- **Backend**: FastAPI + MongoDB (quiz scores storage)
- **Hosting**: Kubernetes with ingress routing

## User Personas
- **Primary**: High school students (11th grade physics class)
- **Secondary**: Physics teacher evaluating project
- **Tertiary**: Peer students during class presentation

## Core Requirements
- 6-page educational site about seismic waves
- Dark/Light theme toggle
- Interactive wave simulator (Canvas)
- Virtual seismograph (recharts)
- Interactive seismic zone map
- Quiz with 10 questions + Kahoot integration
- Sound effects for earthquake simulation
- YouTube video embeds
- Bibliography with academic formatting
- Romanian language throughout

## What's Been Implemented (March 2026)
- [x] Homepage with animated hero, team section, intro, stats
- [x] Theory page with comprehensive physics content
- [x] Wave Types page with P/S/Love/Rayleigh animations & comparison
- [x] Applications page: Wave simulator, Seismograph, Seismic map, Videos
- [x] Quiz page with 10 questions, instant feedback, Kahoot link
- [x] Bibliography page with main + additional sources
- [x] Dark/Light mode toggle with localStorage persistence
- [x] Sound effects (Web Audio API)
- [x] Responsive design (desktop + mobile)
- [x] Backend API for quiz score submission
- [x] Navbar with active state, Footer with team info

## Testing Results
- Backend: 100% (6/6 endpoints passing)
- Frontend: 95% (35/37 features verified)

## Prioritized Backlog
### P1
- Add Romanian diacritics throughout (ă, â, î, ș, ț)

### P2
- Animated loading screen
- Page transition animations (framer-motion AnimatePresence)
- More detailed particle animations for each wave type

### P3
- PWA support for offline access
- Print-friendly stylesheet
- Accessibility improvements (ARIA labels, keyboard navigation)
