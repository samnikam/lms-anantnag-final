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

/** The landmark strip — the district the programme serves, named. */
export const LANDMARKS: Array<Photo & { name: string; note: string }> = [
  {
    ...DISTRICT.amarnathCave,
    name: 'Amarnath',
    note: 'The cave shrine at the head of the valley, reached from Pahalgam each summer.',
  },
  {
    ...DISTRICT.pahalgamValley,
    name: 'Pahalgam',
    note: 'Seat of the R&B Division that delivers this programme, and the base for the yatra.',
  },
  {
    ...DISTRICT.betaab,
    name: 'Betaab Valley',
    note: 'Between Pahalgam and Chandanwari, on the road up the Lidder.',
  },
  {
    ...DISTRICT.aru,
    name: 'Aru',
    note: 'A high village above Pahalgam, and among the furthest schools have to reach.',
  },
  {
    ...DISTRICT.chandanwari,
    name: 'Chandanwari',
    note: 'Under snow for much of the year — the conditions the programme is built around.',
  },
  {
    ...DISTRICT.kokernag,
    name: 'Kokernag',
    note: 'Chinar and spring gardens in the south of the district.',
  },
];

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
    src: unsplash('photo-1524178232363-1fb2b075b655', 2000),
    alt: 'A teacher working with students at a classroom table',
    focus: 'object-[72%_center]',
    kicker: 'Anantnag Smart Classrooms',
    lead: 'We carry every lesson',
    word: 'FURTHER',
    tail: 'so no classroom in the district goes without.',
  },
  {
    ...DISTRICT.pahalgamValley,
    focus: 'object-[65%_center]',
    kicker: 'Anantnag District, Jammu & Kashmir',
    lead: 'We close the distance',
    word: 'TOGETHER',
    tail: 'from Pahalgam to the furthest school on the Lidder.',
  },
  {
    src: unsplash('photo-1522202176988-66273c2fd55f', 2000),
    alt: 'Students working together around a table',
    focus: 'object-[70%_center]',
    kicker: 'Government of Jammu & Kashmir',
    lead: 'We give every subject',
    word: 'A TEACHER',
    tail: 'even where a school could not staff one alone.',
  },
];

export const ABOUT: Record<string, Photo> = {
  welcome: {
    src: unsplash('photo-1580582932707-520aed937b7b'),
    alt: 'School children seated at their desks during a lesson',
  },
  valley: DISTRICT.lidder,
  campus: DISTRICT.polytechnic,
};

/** The equipment installed across the district, one photograph each. */
export const FACILITIES: Array<
  Photo & { title: string; body: string; /** Omitted where a count is meaningless. */ count?: string }
> = [
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
    body: 'Two production studios with PTZ cameras, green screen, softbox lighting and acoustic treatment — where the lessons the whole district receives are taught from.',
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
    body: 'Video, PDF, presentation and document resources prepared and reviewed once, then drawn on by every school rather than rebuilt at each of them.',
  },
];

/** Classrooms first, then the district around them. */
export const GALLERY: Photo[] = [
  { src: unsplash('photo-1509062522246-3755977927d7', 900), alt: 'A classroom set up for a lesson' },
  { src: unsplash('photo-1522202176988-66273c2fd55f', 900), alt: 'Students working together' },
  DISTRICT.pahalgamValley,
  { src: unsplash('photo-1580582932707-520aed937b7b', 900), alt: 'Children at their desks' },
  DISTRICT.amarnathCave,
  { src: unsplash('photo-1427504494785-3a9ca7044f45', 900), alt: 'A hall set for a large class' },
  DISTRICT.lidder,
  { src: unsplash('photo-1516321318423-f06f85e504b3', 900), alt: 'Students at computers' },
  DISTRICT.betaab,
  { src: unsplash('photo-1588072432836-e10032774350', 900), alt: 'A library reading space' },
  DISTRICT.aru,
  { src: unsplash('photo-1571260899304-425eee4c7efc', 900), alt: 'A lesson underway in class' },
  DISTRICT.chandanwari,
  { src: unsplash('photo-1546410531-bb4caa6b424d', 900), alt: 'A classroom from the back' },
  DISTRICT.kokernag,
  { src: unsplash('photo-1524995997946-a1c2e315a42f', 900), alt: 'Studying with a laptop' },
  DISTRICT.polytechnic,
  DISTRICT.amarnathApproach,
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

/** Every Creative Commons photograph used, for the credits list. */
export const CREDITED: Photo[] = Object.values(DISTRICT).filter((p) => p.credit);
