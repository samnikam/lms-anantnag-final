/**
 * Every photograph on the public site, in one place.
 *
 * These are licence-free stock photographs standing in until the division
 * supplies its own. REPLACE THEM: a picture of an actual Anantnag classroom,
 * a real studio session, the panels as installed, will do more for this site
 * than any stock image can. Drop the files into `public/images/` and change
 * the value here — nothing else in the site needs touching.
 *
 * Each entry keeps an `alt` beside its `src`, so swapping a picture cannot
 * quietly leave a wrong description behind it.
 */

export interface Photo {
  src: string;
  alt: string;
}

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** The rotating hero. Three frames, changed on a timer. */
export const HERO_SLIDES: Array<Photo & { kicker: string; heading: string; sub: string }> = [
  {
    src: unsplash('photo-1509062522246-3755977927d7', 2000),
    alt: 'A classroom of empty desks facing a teaching board',
    kicker: 'Hybrid Learning Programme',
    heading: 'Every classroom in the division, taught together',
    sub: 'Lessons broadcast from two studios to interactive panels in schools across Anantnag.',
  },
  {
    src: unsplash('photo-1522202176988-66273c2fd55f', 2000),
    alt: 'Students working together around a table',
    kicker: 'Government of Jammu & Kashmir',
    heading: 'A specialist teacher for every subject',
    sub: 'One lesson, taught once, received live in classrooms that could not staff it alone.',
  },
  {
    src: unsplash('photo-1585506942812-e72b29cef752', 2000),
    alt: 'Mountains and open valley in Kashmir',
    kicker: 'Anantnag District',
    heading: 'Distance is no longer the limit',
    sub: 'Across the valley, in every season, the timetable stands and the register is taken.',
  },
];

export const ABOUT: Record<string, Photo> = {
  welcome: {
    src: unsplash('photo-1580582932707-520aed937b7b'),
    alt: 'School children seated at their desks during a lesson',
  },
  valley: {
    src: unsplash('photo-1596495578065-6e0763fa1178'),
    alt: 'Kashmir valley landscape with mountains behind',
  },
  campus: {
    src: unsplash('photo-1541339907198-e08756dedf3f'),
    alt: 'An institutional school building',
  },
};

/** The bid's own hardware, one photograph each. */
export const FACILITIES: Array<Photo & { title: string; body: string; count: string }> = [
  {
    src: unsplash('photo-1571260899304-425eee4c7efc', 1200),
    alt: 'A classroom with a large display at the front',
    title: 'Interactive panels',
    count: '42',
    body: 'A wall-mounted touch panel with its own OPS PC in each participating classroom — the screen the broadcast arrives on and the board the teacher writes on.',
  },
  {
    src: unsplash('photo-1523240795612-9a054b0db644', 1200),
    alt: 'A person presenting to a camera setup',
    title: 'Broadcast studios',
    count: '02',
    body: 'Two production studios with PTZ cameras, green screen, softbox lighting and acoustic treatment — where the lessons the whole division receives are taught from.',
  },
  {
    src: unsplash('photo-1516321318423-f06f85e504b3', 1200),
    alt: 'Students working at computers',
    title: 'OPS computing',
    count: '42',
    body: 'An OPS PC behind every panel, able to cache a scheduled lesson in advance so a weak link on the day does not cost the class its period.',
  },
  {
    src: unsplash('photo-1517048676732-d65bc937f952', 1200),
    alt: 'Network and connectivity equipment',
    title: 'Connectivity',
    count: '21',
    body: 'A dedicated internet connection at each site, with adaptive streaming so a classroom on a weaker rural link degrades gracefully instead of dropping out.',
  },
  {
    src: unsplash('photo-1517245386807-bb43f82c33c4', 1200),
    alt: 'Power and backup equipment in a rack',
    title: 'Power backup',
    count: '21',
    body: 'An online UPS with batteries at every site, so a power cut in the middle of a broadcast does not end the lesson for that school.',
  },
  {
    src: unsplash('photo-1588072432836-e10032774350', 1200),
    alt: 'A study space lined with books',
    title: 'Digital library',
    count: '∞',
    body: 'Video, PDF, presentation and document resources prepared and reviewed once, then drawn on by every school rather than rebuilt at each of them.',
  },
];

/** For the photo strip. Kept generic on purpose — swap for real ones. */
export const GALLERY: Photo[] = [
  { src: unsplash('photo-1509062522246-3755977927d7', 900), alt: 'A classroom set up for a lesson' },
  { src: unsplash('photo-1522202176988-66273c2fd55f', 900), alt: 'Students working together' },
  { src: unsplash('photo-1580582932707-520aed937b7b', 900), alt: 'Children at their desks' },
  { src: unsplash('photo-1427504494785-3a9ca7044f45', 900), alt: 'A hall set for a large class' },
  { src: unsplash('photo-1503676260728-1c00da094a0b', 900), alt: 'A learner studying' },
  { src: unsplash('photo-1516321318423-f06f85e504b3', 900), alt: 'Students at computers' },
  { src: unsplash('photo-1588072432836-e10032774350', 900), alt: 'A library reading space' },
  { src: unsplash('photo-1571260899304-425eee4c7efc', 900), alt: 'A lesson underway in class' },
  { src: unsplash('photo-1546410531-bb4caa6b424d', 900), alt: 'A classroom from the back' },
  { src: unsplash('photo-1606761568499-6d2451b23c66', 900), alt: 'Learners in a group activity' },
  { src: unsplash('photo-1524995997946-a1c2e315a42f', 900), alt: 'Studying with a laptop' },
  { src: unsplash('photo-1497486751825-1233686d5d80', 900), alt: 'An open book and notes' },
];

export const ROLE_PHOTOS: Record<string, Photo> = {
  teacher: {
    src: unsplash('photo-1577896851231-70ef18881754', 1000),
    alt: 'A teacher working with a class',
  },
  student: {
    src: unsplash('photo-1503676260728-1c00da094a0b', 1000),
    alt: 'A learner at their studies',
  },
  parent: {
    src: unsplash('photo-1606761568499-6d2451b23c66', 1000),
    alt: 'A family looking at a screen together',
  },
};
