/** Authored discovery prompts; no generated dialogue or canonical spatial stages.
 * The first view is a voluntary reflection. Lesson detail/source opens only on request.
 */
export type LearningStation = {
  id: string;
  zoneId: 'Z01' | 'Z02' | 'Z03' | 'Z04' | 'Z05' | 'Z06' | 'Z07';
  kind: 'sign' | 'book' | 'helper';
  position: { x: number; z: number };
  propPosition: { x: number; z: number };
  radius: number;
  title: string;
  signText: string;
  cta: string;
  introduction: string;
  reflection: string;
  detailCta: string;
  sourceCta: string;
  closeCta: string;
  lessonIds: readonly string[];
  isAdaptation: true;
  activation: 'explicit';
  helperLabel?: string;
};
export const SCRIPTED_HELPER_LABEL = 'ผู้ช่วย AI แบบบทสนทนาที่เขียนไว้ล่วงหน้า · ไม่ได้เชื่อมต่อ LLM';
export const STATION_NOTICE = 'ข้อความชวนคิดและการจัดวางในวัดเป็นการประยุกต์ ไม่ใช่พระพุทธพจน์ เลือกอ่านต่อหรือเดินผ่านได้ ไม่มีลำดับบังคับ';
export const QUIET_BOUNDARY_ZONE = 'Z08' as const;
const common = {
  radius: 1.05,
  detailCta: 'อ่านเรื่องที่เกี่ยวข้อง',
  sourceCta: 'เปิดพระสูตรต้นทาง',
  closeCta: 'กลับไปอยู่เงียบ ๆ',
  isAdaptation: true,
  activation: 'explicit',
} as const;
export const LEARNING_STATIONS: readonly LearningStation[] = [
  {
    ...common, id: 'entrance-welcome', zoneId: 'Z01', kind: 'helper', position: { x: -1.1, z: 5.25 }, propPosition: { x: -1.8, z: 5.25 },
    title: 'แวะทักทาย', signText: 'อยากรู้จักที่นี่ไหม', cta: 'ทักทายผู้ช่วย',
    introduction: 'ยินดีต้อนรับ หากอยากเตรียมใจก่อนฝึก เราชวนเริ่มจากความหมายของศีลหรือทบทวนศีลห้าได้ จะเดินเล่นหรือพักก่อนก็ได้เช่นกัน',
    reflection: 'หากต้องการ ลองนึกถึงคำถามหนึ่งเรื่องที่อยากค่อย ๆ ทำความเข้าใจ โดยไม่ต้องบอกคำตอบกับเรา',
    lessonIds: ['mn56', 'an5-159'], helperLabel: SCRIPTED_HELPER_LABEL,
  },
  {
    ...common, id: 'path-small-step', zoneId: 'Z02', kind: 'sign', position: { x: 1.35, z: 3.5 }, propPosition: { x: 2.1, z: 3.55 },
    title: 'หนึ่งก้าวที่รู้ตัว', signText: 'แวะอ่านระหว่างทาง', cta: 'อ่านป้ายริมทาง',
    introduction: 'ทางเดินนี้ไม่มีเส้นชัย เดินต่อหรือหยุดพักตามจังหวะที่สะดวกได้',
    reflection: 'หากต้องการ ลองสังเกตการขยับมือหนึ่งครั้ง หรือการก้าวหนึ่งก้าวเมื่ออยู่ในที่ปลอดภัย ไม่ต้องช้ากว่าปกติ',
    lessonIds: ['mn107-awareness', 'mn107-wakefulness'],
  },
  {
    ...common, id: 'pavilion-open-book', zoneId: 'Z03', kind: 'book', position: { x: .95, z: .85 }, propPosition: { x: 1.6, z: .6 },
    title: 'หนังสือหน้าศาลา', signText: 'เปิดอ่านเมื่อพร้อม', cta: 'เปิดหนังสือ',
    introduction: 'หนังสือเล่มนี้ชวนทำความรู้จักคำศัพท์เกี่ยวกับการฝึก อ่านได้โดยไม่ต้องเริ่มนั่งสมาธิ',
    reflection: 'หากต้องการ เลือกคำหนึ่งคำที่อยากเข้าใจเพิ่ม หรือวางหนังสือไว้แล้วพักก็ได้',
    lessonIds: ['mn107-jhana', 'mn118'],
  },
  {
    ...common, id: 'tree-gentle-pause', zoneId: 'Z04', kind: 'sign', position: { x: -4.55, z: .7 }, propPosition: { x: -5.3, z: .5 },
    title: 'พักใต้ร่มไม้', signText: 'มีเรื่องสั้นให้อ่าน', cta: 'อ่านป้ายใต้ต้นไม้',
    introduction: 'จะพักเฉย ๆ ก็ได้ ป้ายนี้เป็นเพียงคำชวนสังเกต ไม่มีคำตอบที่ต้องส่ง',
    reflection: 'หากต้องการ ลองมองสิ่งรอบตัวสักครู่ แล้วเลือกว่าจะอ่านต่อหรือพักในแบบที่สบาย',
    lessonIds: ['sn47-4', 'mn107-hindrances', 'an9-3'],
  },
  {
    ...common, id: 'pond-looking', zoneId: 'Z05', kind: 'sign', position: { x: 4.55, z: .95 }, propPosition: { x: 5.25, z: .55 },
    title: 'มองจากริมสระ', signText: 'หยุดมองได้ ไม่ต้องค้นหา', cta: 'อ่านป้ายริมสระ',
    introduction: 'สีและรูปทรงในสระเป็นส่วนหนึ่งของฉาก จะมองเพลิน ๆ หรือเดินต่อก็ได้',
    reflection: 'หากต้องการ เลือกมองสีหรือรูปทรงหนึ่งอย่าง โดยไม่ต้องทำให้เกิดความรู้สึกพิเศษ',
    lessonIds: ['mn107-senses', 'mn62'],
  },
  {
    ...common, id: 'garden-kind-action', zoneId: 'Z06', kind: 'sign', position: { x: -3.75, z: 4.7 }, propPosition: { x: -3.9, z: 5.35 },
    title: 'การดูแลเล็ก ๆ', signText: 'คิดก่อนลงมือ', cta: 'อ่านป้ายในสวน',
    introduction: 'สวนเป็นที่ชวนคิดถึงการดูแล ไม่จำเป็นต้องทำงานในสวนเพื่อเปิดอ่านเรื่องนี้',
    reflection: 'หากต้องการ ลองนึกถึงเหตุการณ์สมมติที่คนสองคนใช้พื้นที่ร่วมกัน จะทำอย่างไรให้รบกวนกันน้อยลง',
    lessonIds: ['mn107-ethics', 'mn61'],
  },
  {
    ...common, id: 'bench-everyday-book', zoneId: 'Z07', kind: 'book', position: { x: -4.45, z: 3.7 }, propPosition: { x: -5.15, z: 3.55 },
    title: 'หนังสือข้างม้านั่ง', signText: 'เรื่องอ่านในวันธรรมดา', cta: 'เปิดเรื่องสั้น',
    introduction: 'ตรงนี้มีเรื่องการอยู่ร่วมกัน ความพอดี และการพิจารณาคำสอน เลือกอ่านเฉพาะเรื่องที่สนใจได้',
    reflection: 'หากต้องการ ลองคิดถึงลักษณะของการดูแลที่เคารพความต้องการของกันและกัน โดยไม่ต้องระบุชื่อใคร',
    lessonIds: ['dn31', 'mn107-food', 'an3-kalama', 'an11-1'],
  },
];
/** A lookup never opens UI; callers require an explicit tap/click to show content. */
export function stationById(id: string): LearningStation | undefined {
  return LEARNING_STATIONS.find(station => station.id === id);
}

export type WelcomeDialogueBranch = {
  id: string; label: string; introduction: string; reflection: string;
  lessonIds: readonly string[]; sourceNote: string;
  sources: readonly { label: string; url: string; kind: 'sutta' | 'ceremonial-guide' }[];
  isAdaptation: true;
};
/** Sources checked 2026-10-15. Branches are authored educational copy, not an AI conferral of precepts. */
export const WELCOME_DIALOGUE_BRANCHES: readonly WelcomeDialogueBranch[] = [
  {
    id: 'why-sila', label: 'ทำไมเริ่มจากศีล',
    introduction: 'AN 11.1 อธิบายว่าศีลที่เป็นกุศลเกื้อกูลความไม่เดือดร้อนใจ และธรรมที่ต่อเนื่องไปสู่สมาธิ ส่วน AN 8.39 กล่าวถึงการเว้นการเบียดเบียนห้าประการในฐานะการมอบความปลอดภัยแก่ผู้อื่น',
    reflection: 'หากต้องการ ลองคิดถึงการกระทำเล็ก ๆ ที่ช่วยให้การอยู่ร่วมกันปลอดภัยขึ้น ไม่ต้องเล่าประสบการณ์ส่วนตัว',
    lessonIds: ['an11-1', 'mn107-ethics'],
    sourceNote: 'สรุปใหม่จากพระสูตร ไม่รับรองว่าอ่านหรือทำกิจกรรมแล้วจะเกิดความสงบหรือสมาธิทันที',
    sources: [
      { label: 'AN 11.1 · Kimattha Sutta', url: 'https://www.dhammatalks.org/suttas/AN/AN11_1.html', kind: 'sutta' },
      { label: 'AN 8.39 · Abhisanda Sutta', url: 'https://www.dhammatalks.org/suttas/AN/AN8_39.html', kind: 'sutta' },
    ], isAdaptation: true,
  },
  {
    id: 'review-five-precepts', label: 'ทบทวนศีลห้า',
    introduction: 'AN 8.39 กล่าวถึงการเว้นห้าประการ ได้แก่ การฆ่าสัตว์ การถือเอาของที่ไม่ได้ให้ การประพฤติผิดในกาม การพูดเท็จ และการเสพของมึนเมา เราเปิดอ่านเพื่อทำความเข้าใจได้โดยไม่ต้องแจ้งว่าตนรักษาได้ข้อใด',
    reflection: 'หากต้องการ เลือกหนึ่งข้อเพื่ออ่านความหมายเพิ่มเติม หรือทบทวนเงียบ ๆ กับตนเอง ไม่มีปุ่มให้คำปฏิญาณหรือแบบตรวจศีล',
    lessonIds: ['mn61', 'mn107-ethics'],
    sourceNote: 'นี่คือคำสรุปเพื่อศึกษา ไม่ใช่พิธีรับศีล ผู้ช่วยไม่ได้เป็นพระสงฆ์หรือผู้ให้ศีล',
    sources: [{ label: 'AN 8.39 · Abhisanda Sutta', url: 'https://www.dhammatalks.org/suttas/AN/AN8_39.html', kind: 'sutta' }], isAdaptation: true,
  },
  {
    id: 'requesting-precepts', label: 'อาราธนาศีลคืออะไร',
    introduction: 'คู่มือ A Chanting Guide แสดงแบบแผนการขอไตรสรณคมน์และศีลห้าจากพระภิกษุ ตามด้วยการกล่าวรับทีละบท หากสนใจ สามารถเปิดดูแบบแผนในคู่มือก่อนเข้าร่วมพิธีจริงได้',
    reflection: 'หากต้องการ เปิดคู่มือเพื่อรู้จักลำดับพิธี หรือกลับไปอ่านความหมายของศีลห้าก่อนก็ได้',
    lessonIds: ['mn107-ethics'],
    sourceNote: 'แหล่งนี้เป็นคู่มือพิธีกรรมตามประเพณี ไม่ใช่ข้อความอาราธนาที่อ้างจาก MN 107 หรือ AN 11.1 แอปไม่ได้ประกอบพิธีหรือให้ศีล และไม่บังคับพิธีก่อนเข้าพื้นที่ฝึก',
    sources: [{ label: 'A Chanting Guide · Taking the Five Precepts · คู่มือพิธีกรรม', url: 'https://www.dhammatalks.org/books/ChantingGuide/Section0064.html', kind: 'ceremonial-guide' }], isAdaptation: true,
  },
];
