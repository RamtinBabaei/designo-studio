export type ServiceSlug = 'web-design' | 'app-design' | 'graphic-design';
export interface Project { name: string; description: string; image: string; tags: string[]; detail: string; }
export interface Service { slug: ServiceSlug; name: string; description: string; tile: string; projects: Project[]; }
export const services: Service[] = [
  { slug: 'web-design', name: 'Web Design', description: 'We build websites that serve as powerful marketing tools and bring memorable brand experiences to life.', tile: 'home/desktop/image-web-design-large.webp', projects: [
    { name: 'Express', description: 'A multi-carrier shipping website for ecommerce businesses.', image: 'express', tags: ['Strategy', 'Ecommerce', 'Web experience'], detail: 'A clear, confident shipping platform that puts complex logistics within reach. A restrained palette and purposeful interface help growing businesses move from comparison to shipment.' },
    { name: 'Transfer', description: 'A fresh way to send money, built around trust and simplicity.', image: 'transfer', tags: ['Fintech', 'UI design', 'Responsive'], detail: 'A welcoming digital experience for a money transfer service. Strong hierarchy, a considered conversion flow, and concise content make each next step feel effortless.' },
    { name: 'Photon', description: 'A photography platform that brings exceptional images into focus.', image: 'photon', tags: ['Photography', 'Art direction', 'Web design'], detail: 'An image-led portfolio concept that gives photography room to breathe. Confident typography and a minimal interface keep the work at the center of the experience.' },
    { name: 'Builder', description: 'Connecting ambitious businesses with the contractors they need.', image: 'builder', tags: ['Marketplace', 'Brand strategy', 'UX design'], detail: 'A practical, approachable platform for discovering construction expertise. Clear service categories and a strong visual system turn a broad directory into an intuitive experience.' },
    { name: 'Blogr', description: 'A publishing platform made for big ideas and great stories.', image: 'blogr', tags: ['Publishing', 'Product design', 'Web experience'], detail: 'An editorial platform concept with a bold identity and an approachable onboarding experience. Designed to help writers focus on what they have to say.' },
    { name: 'Camp', description: 'A place to discover beautiful destinations and reconnect outdoors.', image: 'camp', tags: ['Travel', 'Art direction', 'Responsive'], detail: 'An immersive travel concept that pairs evocative photography with simple discovery. Thoughtful browsing and clear destination content make planning an escape a pleasure.' },
  ]},
  { slug: 'app-design', name: 'App Design', description: 'Our mobile experiences meet people where they are, with intuitive interfaces made for everyday life.', tile: 'home/desktop/image-app-design.webp', projects: [
    { name: 'Airfilter', description: 'A calmer way to keep an eye on the air around you.', image: 'airfilter', tags: ['Mobile UI', 'Data visualization', 'Wellbeing'], detail: 'An air-quality companion that transforms environmental data into a clear daily overview. A focused interface makes complex information easy to understand at a glance.' },
    { name: 'Eyecam', description: 'Keeping you connected to the spaces that matter most.', image: 'eyecam', tags: ['Connected devices', 'Mobile UX', 'Product design'], detail: 'A connected camera app concept built around a simple overview, clear device states, and quick access to the moments that matter.' },
    { name: 'Faceit', description: 'A more expressive way to meet your next favorite person.', image: 'faceit', tags: ['Social', 'Interaction design', 'Mobile UI'], detail: 'A friendly social experience with a lively visual language. Accessible controls and thoughtful interactions make it easy to discover and connect.' },
    { name: 'Todo', description: 'A little more clarity for everything on your list.', image: 'todo', tags: ['Productivity', 'UX design', 'Mobile UI'], detail: 'A distraction-free task management concept. Simple grouping and considered interaction patterns help people organize their day without adding more work.' },
    { name: 'Loopstudios', description: 'An immersive home for extraordinary digital experiences.', image: 'loopstudios', tags: ['Entertainment', 'Art direction', 'Mobile experience'], detail: 'A vivid digital showcase for immersive experiences, combining expressive art direction with straightforward navigation and discovery.' },
  ]},
  { slug: 'graphic-design', name: 'Graphic Design', description: 'We create distinctive identities and visual stories that give brands a voice of their own.', tile: 'home/desktop/image-graphic-design.webp', projects: [
    { name: 'Tim Brown', description: 'A bold book cover that makes a compelling first impression.', image: 'change', tags: ['Editorial', 'Typography', 'Print'], detail: 'An expressive editorial concept that uses confident typography and an unexpected composition to turn a book cover into a conversation starter.' },
    { name: 'Boxed Water', description: 'A thoughtful identity for a refreshing everyday essential.', image: 'boxed-water', tags: ['Packaging', 'Brand identity', 'Art direction'], detail: 'A packaging study centered on clarity and simplicity. A minimal visual language gives an everyday object a distinctive, recognizable presence.' },
    { name: 'Science!', description: 'Making complex ideas feel bright, curious, and accessible.', image: 'science', tags: ['Editorial', 'Illustration', 'Print'], detail: 'A playful science publication concept. An energetic graphic system invites exploration while a structured layout keeps the content easy to follow.' },
  ]},
];
export const values = [
  { name: 'Passionate', image: 'passionate', text: 'Good design begins with curiosity. We get to know your business, ask thoughtful questions, and turn what makes you different into a digital experience with purpose.' },
  { name: 'Resourceful', image: 'resourceful', text: 'Every decision has a reason. We bring strategy, craft, and technology together, working closely with you to find the right solution for your goals.' },
  { name: 'Friendly', image: 'friendly', text: 'The best work comes from a great relationship. We keep things collaborative, communicate clearly, and make the process as enjoyable as the end result.' },
];
export const offices = [
  { id: 'canada', country: 'Canada', office: 'Designo Central Office', address: ['3886 Wellington Street', 'Toronto, Ontario M9C 3J5'], phone: '+1 253-863-8967', email: 'contact@designo.co', lat: 43.6441, lng: -79.3944, bbox: '-79.415,43.634,-79.374,43.654' },
  { id: 'australia', country: 'Australia', office: 'Designo AU Office', address: ['19 Balonne Street', 'New South Wales 2443'], phone: '(02) 6720 9092', email: 'contact@designo.au', lat: -30.329, lng: 149.788, bbox: '149.768,-30.339,149.808,-30.319' },
  { id: 'united-kingdom', country: 'United Kingdom', office: 'Designo UK Office', address: ['13 Colorado Way', 'Rhyd-y-fro SA8 9GA'], phone: '078 3115 1400', email: 'contact@designo.uk', lat: 51.732, lng: -3.8636, bbox: '-3.884,51.722,-3.844,51.742' },
];
export const asset = (path: string) => `/assets/${path}`;
export function getService(slug: string) { return services.find(service => service.slug === slug); }
