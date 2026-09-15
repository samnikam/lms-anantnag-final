/**
 * Every photograph on the public site, in one place.
 *
 * Two kinds sit here. The DISTRICT set are real, identifiable photographs of
 * Anantnag — Amarnath, Pahalgam, the Lidder, Betaab, Aru, Chandanwari,
 * Kokernag — taken from Wikimedia Commons under Creative Commons licences.
 * Those licences require the photographer to be credited, which is why each
 * one carries a `credit` and why the Gallery page prints the list.
 *
 * The CLASSROOM set are licence-free stock photographs standing in until the
 * division supplies its own. REPLACE THEM: a picture of an actual Anantnag
 * classroom, a real studio session, the panels as installed, will do more for
 * this site than any stock image can. Drop the files into `public/images/`
 * and change the value here — nothing else in the site needs touching.
 */

export interface Credit {
  author: string;
  license: string;
  /** The Commons file page, so the credit can be followed back to source. */
  page: string;
}

export interface Photo {
  src: string;
  alt: string;
  /** Present on the Creative Commons photographs; absent on stock. */
  credit?: Credit;
}

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Commons serves its renditions from this host; the width is fixed at 1920. */
const commons = (path: string) => `https://thumb.wikimedia.org/wikipedia/commons/thumb/${path}`;

const cc = (author: string, license: string, file: string): Credit => ({
  author,
  license,
  page: `https://commons.wikimedia.org/wiki/File:${file}`,
});

/* ── Anantnag district: real places, really photographed ───────────────── */

export const DISTRICT: Record<string, Photo> = {
  amarnathCave: {
    src: commons('0/0f/Shri_Amarnath_Ji_Holy_Cave%28GUFA%29.jpg/1920px-Shri_Amarnath_Ji_Holy_Cave%28GUFA%29.jpg'),
    alt: 'The Amarnath cave shrine high in the mountains of Anantnag district',
    credit: cc('Itzseoprasoon', 'CC BY-SA 4.0', 'Shri_Amarnath_Ji_Holy_Cave(GUFA).jpg'),
  },
  amarnathApproach: {
    src: commons('e/eb/Amarnath_cave_view.jpg/1920px-Amarnath_cave_view.jpg'),
    alt: 'The approach to the Amarnath cave across snow-covered ground',
    credit: cc('Kasisripada17', 'CC BY-SA 4.0', 'Amarnath_cave_view.jpg'),
  },
  pahalgamValley: {
    src: commons('f/f6/Pahalgam_Valley.jpg/1920px-Pahalgam_Valley.jpg'),
    alt: 'The Pahalgam valley, ringed by forested mountains',
    credit: cc('KennyOMG', 'CC BY-SA 3.0', 'Pahalgam_Valley.jpg'),
  },
  pahalgamMeadow: {
    src: commons('4/4b/Pahalgam_meadow.jpg/1920px-Pahalgam_meadow.jpg'),
    alt: 'An open meadow at Pahalgam below the mountains',
    credit: cc('Tipofan', 'CC BY-SA 4.0', 'Pahalgam_meadow.jpg'),
  },
  lidder: {
    src: commons('3/37/Lidder_at_Pahalgam.jpg/1920px-Lidder_at_Pahalgam.jpg'),
    alt: 'The Lidder river running through Pahalgam',
    credit: cc('Slyronit', 'CC BY-SA 4.0', 'Lidder_at_Pahalgam.jpg'),
  },
  lidderRiver: {
    src: commons('4/40/The_river_Lidder_flows_through_the_Pahalgam_valley.jpg/1920px-The_river_Lidder_flows_through_the_Pahalgam_valley.jpg'),
    alt: 'The Lidder flowing through the Pahalgam valley',
    credit: cc('Mr. Debapriya Hore', 'CC BY 4.0', 'The_river_Lidder_flows_through_the_Pahalgam_valley.jpg'),
  },
  betaab: {
    src: commons('9/98/Betaab_Valley_Pahalgam_Anantnag.jpg/1920px-Betaab_Valley_Pahalgam_Anantnag.jpg'),
    alt: 'Betaab Valley at Pahalgam in Anantnag district',
    credit: cc('Sauood07', 'CC BY-SA 4.0', 'Betaab_Valley_Pahalgam_Anantnag.jpg'),
  },
  aru: {
    src: commons('b/b5/Aru_Valley_Kashmir.jpg/1920px-Aru_Valley_Kashmir.jpg'),
    alt: 'Aru Valley above Pahalgam',
    credit: cc('Irfanaru', 'CC0', 'Aru_Valley_Kashmir.jpg'),
  },
  chandanwari: {
    src: commons('0/07/Chandanwari%2C_Jammu_and_Kashmir%2C_India_after_snowfall.jpg/1920px-Chandanwari%2C_Jammu_and_Kashmir%2C_India_after_snowfall.jpg'),
    alt: 'Chandanwari after snowfall — the first stage of the route beyond Pahalgam',
    credit: cc('Akigupta131', 'CC BY-SA 4.0', 'Chandanwari,_Jammu_and_Kashmir,_India_after_snowfall.jpg'),
  },
  anantnagTown: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Anantnag_J%26K.jpg',
    alt: 'Anantnag town, Jammu & Kashmir',
    credit: cc('Sauood07', 'CC BY-SA 4.0', 'Anantnag_J&K.jpg'),
  },
  polytechnic: {
    src: commons('3/3c/Government_Polytechnic_College_Anantnag.jpg/1920px-Government_Polytechnic_College_Anantnag.jpg'),
    alt: 'Government Polytechnic College, Anantnag',
    credit: cc('Sauood07', 'CC BY 4.0', 'Government_Polytechnic_College_Anantnag.jpg'),
  },
  kokernag: {
    src: commons('3/38/Chinar_in_Botanical_garden%2C_Kokernag%2C_Anantnag%2C_J%26K.jpg/1920px-Chinar_in_Botanical_garden%2C_Kokernag%2C_Anantnag%2C_J%26K.jpg'),
    alt: 'A chinar in the botanical garden at Kokernag, Anantnag',
    credit: cc('TheAutumnal', 'CC BY-SA 4.0', 'Chinar_in_Botanical_garden,_Kokernag,_Anantnag,_J&K.jpg'),
  },
};

/* ── Real school interiors, verified on Commons ────────────────────────── */

/**
 * Photographs of actual Indian school facilities. Unlike the stock set
 * below, the subject of each of these is confirmed by its source record —
 * which matters for a page that names what it is showing. They are not
 * Anantnag schools, and nothing on the site claims they are.
 */
export const SCHOOL: Record<string, Photo> = {
  scienceLab: {
    src: commons('d/d4/Kodaikanal_International_School-04684.jpg/1920px-Kodaikanal_International_School-04684.jpg'),
    alt: 'A school chemistry laboratory set up for practical work',
    credit: cc('Rainer Halama', 'CC BY-SA 4.0', 'Kodaikanal_International_School-04684.jpg'),
  },
  playground: {
    src: commons('2/2b/DNHS_School_Playground_2.jpg/1920px-DNHS_School_Playground_2.jpg'),
    alt: 'An open school playing field',
    credit: cc('Azharul Islam Barlaskar', 'CC BY-SA 4.0', 'DNHS_School_Playground_2.jpg'),
  },
  library: {
    src: commons('f/f5/Library_of_Govt._Senior_Secondary_School_Doda_%28Sri_Muktsar_Sahib%29.jpg/1920px-Library_of_Govt._Senior_Secondary_School_Doda_%28Sri_Muktsar_Sahib%29.jpg'),
    alt: 'The library of a government senior secondary school',
    credit: cc('Stalinjeet Brar', 'CC BY-SA 4.0', 'Library_of_Govt._Senior_Secondary_School_Doda_(Sri_Muktsar_Sahib).jpg'),
  },
  computerLab: {
    src: commons('5/56/SRMPS_Computer_Lab.jpg/1920px-SRMPS_Computer_Lab.jpg'),
    alt: 'A school computer laboratory with workstations in rows',
    credit: cc('Sanjaynegi', 'CC BY-SA 4.0', 'SRMPS_Computer_Lab.jpg'),
  },
};

/* ── Classrooms and learners: stock, pending the division's own ────────── */

/**
 * The rotating hero. Three frames, changed on a timer.
 *
 * The heading is held in three parts so the middle can be set large and
 * letter-spaced across the photograph, the way a prospectus cover is. And
 * `focus` moves the crop, so the subject stays clear of the type on the left.
 */
export const HERO_SLIDES: Array<
  Photo & { kicker: string; lead: string; word: string; tail: string; focus?: string }
> = [
  {
    // Supplied by the division. Served from the project rather than a stock
    // library, which is where the rest of these should end up too.
    src: '/images/school-campus.jpg',
    alt: 'A school building under snow, with school buses drawn up outside',
    // The building sits centre-right; hold the crop there so the type on the
    // left falls on the sky and trees rather than across the façade.
    focus: 'object-[58%_center]',
    kicker: 'Anantnag Smart Classrooms',
    lead: 'We carry every lesson',
    word: 'FURTHER',
    tail: 'so no classroom in the district goes without.',
  },
  {
    // Supplied by the division: the courtyard as a school day begins.
    src: '/images/school-courtyard.jpg',
    alt: 'Students crossing a school courtyard, seen from above',
    // The crowd fills the frame; keep the crop right of centre so the
    // heading sits over the quieter left edge.
    focus: 'object-[60%_center]',
    kicker: 'Anantnag District, Jammu & Kashmir',
    lead: 'We close the distance',
    word: 'TOGETHER',
    tail: 'from Pahalgam to the furthest school on the Lidder.',
  },
  {
    // Supplied by the division: school blocks around a lawn.
    src: '/images/school-grounds.jpg',
    alt: 'School buildings around a green lawn',
    // The frame is nearly square and the lawn fills its lower half; hold the
    // crop high so the buildings, not the grass, sit behind the heading.
    focus: 'object-[60%_30%]',
    kicker: 'Government of Jammu & Kashmir',
    lead: 'We give every subject',
    word: 'A TEACHER',
    tail: 'even where a school could not staff one alone.',
  },
];

export const ABOUT: Record<string, Photo> = {
  // Supplied by the division: pupils outside a village school in the valley.
  // Portrait, so it crops from the middle — the building and the boys both
  // stay in frame whether it is shown as a circle or a 4:3.
  welcome: {
    src: '/images/village-school.jpg',
    alt: 'Schoolboys in uniform outside a red-roofed village school',
  },
  valley: DISTRICT.lidder,
  campus: DISTRICT.polytechnic,
  // Supplied by the division. Note the file it came from was an AI render,
  // not a photograph of a real classroom — it illustrates the smart
  // classroom rather than documenting one, and should not be captioned as
  // a particular school.
  smartClassroom: {
    src: '/images/smart-classroom.jpg',
    alt: 'A classroom lesson at an interactive panel, mountains beyond the windows',
  },
  // Supplied by the division; an AI render, as the file it came from records.
  // A five-panel collage of the schemes, each panel labelled in the picture.
  schemes: {
    src: '/images/schemes-collage.jpg',
    alt: 'Five scenes: a school meal, a lesson at an interactive panel, a student with a scholarship letter, a teacher helping a pupil in a wheelchair, and students building a model car',
  },
};

/**
 * Classrooms and school interiors first, then the district around them.
 *
 * The entries written as objects are stock and their subject is not
 * verified; those spread from DISTRICT and SCHOOL are real photographs
 * whose subject is confirmed by their source record.
 */
export const GALLERY: Photo[] = [
  { src: unsplash('photo-1509062522246-3755977927d7', 900), alt: 'A classroom set up for a lesson' },
  { src: unsplash('photo-1522202176988-66273c2fd55f', 900), alt: 'Students working together around a table' },
  SCHOOL.scienceLab,
  DISTRICT.pahalgamValley,
  { src: unsplash('photo-1580582932707-520aed937b7b', 900), alt: 'School children seated at their desks during a lesson' },
  SCHOOL.computerLab,
  DISTRICT.amarnathCave,
  { src: unsplash('photo-1427504494785-3a9ca7044f45', 900), alt: 'A hall set for a large class' },
  SCHOOL.library,
  DISTRICT.lidder,
  SCHOOL.playground,
  DISTRICT.betaab,
  { src: unsplash('photo-1571260899304-425eee4c7efc', 900), alt: 'A classroom with a large display at the front' },
  DISTRICT.anantnagTown,
  DISTRICT.aru,
  { src: unsplash('photo-1546410531-bb4caa6b424d', 900), alt: 'A classroom seen from the back' },
  DISTRICT.chandanwari,
  { src: unsplash('photo-1524995997946-a1c2e315a42f', 900), alt: 'A learner studying with a laptop' },
  DISTRICT.lidderRiver,
  DISTRICT.pahalgamMeadow,
  DISTRICT.kokernag,
  DISTRICT.polytechnic,
  DISTRICT.amarnathApproach,
];

/**
 * The portrait beside the head of institution's message. Supplied by the
 * division: a pupil painting on the floor of a school courtyard — the
 * "whole person" the message speaks of, doing something other than sitting
 * an exam. Portrait, and the boy sits in the upper half, so it is cropped
 * from the top rather than the middle.
 */
export const ROLE_PHOTOS: Record<string, Photo> = {
  teacher: {
    src: '/images/student-painting.jpg',
    alt: 'A pupil in uniform painting on paper spread across a courtyard floor',
  },
};

/** Every Creative Commons photograph used, for the credits list. */
export const CREDITED: Photo[] = [
  ...Object.values(DISTRICT),
  ...Object.values(SCHOOL),
].filter((p) => p.credit);
