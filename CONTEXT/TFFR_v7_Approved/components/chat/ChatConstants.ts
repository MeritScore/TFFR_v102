import { Message, MessageType, User } from '../../types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'NeoDrifter',
  meritScore: 245,
  avatarUrl: 'https://picsum.photos/200/200',
  isVerified: true,
  role: 'LOGISTICS SPECIALIST',
  about: 'Expert in navigating high-density crowds. I know every shortcut in the stadium. Fast, reliable, and I never drop a delivery.',
  skills: ['CROWD NAV', 'HEAVY LIFTING', 'VIP ESCORT'],
  behavioralStats: { consistency: 98, complexity: 'HIGH', velocity: 85, collateral: 2500 }
};
export const SYSTEM_ALERTS = ["⚠️ NETWORK FLUX DETECTED. SWITCHING TO LIQUID MODE.", "🏆 SOCIAL LOTTERY: 2 Front Row Tickets! Comment to win!", "💰 New High-Value Gig Available: Line Holding at Gate B."];
export const MOCK_USERS: User[] = [
  {
    id: 'u3', username: 'CyberPunk99', meritScore: 50, avatarUrl: 'https://picsum.photos/203/203',
    role: 'STREET SCOUT', about: 'Just here for the music and the vibes. Low score but high energy.',
    skills: ['VENDOR LOCATOR', 'CROWD DANCING'],
    behavioralStats: { consistency: 40, complexity: 'LOW', velocity: 90, collateral: 150 }
  },
  {
    id: 'u4', username: 'VenueStaff_Sarah', meritScore: 300, avatarUrl: 'https://picsum.photos/204/204', isVerified: true,
    role: 'VENUE COORDINATOR', about: 'Official venue staff. Here to ensure a safe and smooth experience for all fans.',
    skills: ['ACCESS CONTROL', 'CRISIS MGMT', 'STAFF COMM'],
    behavioralStats: { consistency: 100, complexity: 'HIGH', velocity: 95, collateral: 10000 }
  },
  { id: 'u5', username: 'CryptoKing', meritScore: 120, avatarUrl: 'https://picsum.photos/205/205' },
  { id: 'u1', username: 'TrafficWatcher', meritScore: 180, avatarUrl: 'https://picsum.photos/201/201', isVerified: true },
  { id: 'u2', username: 'FastValet', meritScore: 290, avatarUrl: 'https://picsum.photos/202/202', isVerified: true },
  {
    id: 'u6',
    username: 'Benito Martínez',
    meritScore: 26,
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Bad_Bunny_2019_by_Glenn_Francis.jpg/200px-Bad_Bunny_2019_by_Glenn_Francis.jpg',
    scoreColor: '#ff0000',
    role: 'UNVERIFIED ATTENDEE',
    about: 'I pay my way. Looking for entry. High risk, high reward.',
    skills: ['LIQUID TRADING', 'CROWD NAV'],
    behavioralStats: { consistency: 15, complexity: 'LOW', velocity: 60, collateral: 50 }
  },
  {
    id: 'u7',
    username: 'Marilyn Alvarado',
    meritScore: 299,
    avatarUrl: '/marilyn_v2.jpg',
    scoreColor: '#39ff14',
    isVerified: true,
    role: 'ELITE & VERIFIED MEMBER',
    about: 'Top-tier reputation and verified identity. I facilitate high-value trades and VIP transitions.',
    skills: ['VIP LOGISTICS', 'SECURE TRADING', 'HIVE MIND SYNC'],
    behavioralStats: { consistency: 99, complexity: 'HIGH', velocity: 98, collateral: 8500 }
  },
];
export const INITIAL_MESSAGES: Message[] = [
  { id: 'msg-1', text: 'Welcome to THE FUN FAN REPORTER Hub. Connectivity is currently stable. The Fun Fan Reporter sync active.', sender: 'SYSTEM', timestamp: new Date(Date.now() - 1000 * 60 * 5), type: MessageType.SYSTEM },
  { id: 'msg-2', text: 'Road 101 is closed due to VIP motorcade! Avoid the north entrance.', sender: MOCK_USERS[3], timestamp: new Date(Date.now() - 1000 * 60 * 4), type: MessageType.ALERT, metadata: { location: 'North Gate', amount: 5 } },
  { id: 'msg-3', text: 'I can offer Valet Parking services. I have a secure spot 2 blocks away.', sender: MOCK_USERS[4], timestamp: new Date(Date.now() - 1000 * 60 * 2), type: MessageType.GIG_OFFER, metadata: { gigTitle: 'Valet Parking', amount: 100 } },
  { id: 'msg-4', text: 'Does anyone have a spare entry pass? I\'m blocked from the VIP zone.', sender: MOCK_USERS[5], timestamp: new Date(Date.now() - 1000 * 60 * 1), type: MessageType.CHAT },
  { id: 'msg-5', text: 'Just processed a high-value trade at the North Gate. Everything is moving smoothly!', sender: MOCK_USERS[6], timestamp: new Date(Date.now()), type: MessageType.CHAT }
];
export const TOPICS = [{ name: "NORTH GATE", keywords: ["gate", "north", "blocked", "line", "entry"] }, { name: "SOUND SYSTEM", keywords: ["sound", "bass", "cant hear", "loud", "mic"] }, { name: "SURPRISE GUEST", keywords: ["guest", "who is it", "stage", "omg", "look"] }];
export const SPAM_PHRASES = ["OPEN THE DOORS!", "QR CODE NOT WORKING", "WE WANT WATER", "LFG!!!!"];
export const UNIQUE_MESSAGES = ["Anyone know if the merch stand at Section 100 still has jerseys?", "Traffic outside is crazy, stick to the shuttle.", "Just won 5 coins for reporting the broken tap!", "The halftime show prep looks insane from here.", "Need a charger, offering 10 MC for 15 mins!", "Who's going to the afterparty at The District?", "Security is taking water bottles at Gate C, heads up.", "Found a set of keys near the pretzel stand. Turned them in.", "Is the VIP lounge open to TFFR Level 5+ yet?", "My network keeps dropping, anyone else?", "This bass is literally shaking my nachos.", "Looking for 2 people to share a ride back to downtown.", "The line for the ladies' room is shorter on the 2nd floor.", "Just saw the lead singer warming up backstage!", "Selling a fast pass for the photo booth, 20 MC.", "Does anyone have a spare poncho? It looks like rain.", "Pizza slice prices are actually decent today.", "Can someone explain the rules for the Social Lottery?", "I think I just spotted a celebrity in the box seats.", "My TFFR level just went up for helping that lost kid.", "Charging station A is full, try station B near the exit.", "The visual effects on the main screen are mind-blowing.", "Leaving early, have a parking pass if anyone needs it.", "Don't forget to hydrate, it's getting hot in the pit.", "Is there an ATM that actually works near Section 200?", "The acoustics in the upper deck are surprisingly good.", "Anyone want to trade a size L shirt for an XL?", "The drummer is absolutely killing it right now.", "Crowd control is doing a great job moving people out.", "Where is the best spot for a group photo?", "Lost my sunglasses, aviators, reward 15 MC.", "The specialized cocktails at the Blue Bar are sold out.", "Check your pockets, pickpockets reported in the mosh pit.", "WiFi password for the guest network changed to 'LIVE2025'.", "Can we get a wave going in the south stands?", "The pyrotechnics setup looks dangerous but cool.", "My ears are ringing, anyone have spare plugs?", "That guitar solo was longer than my last relationship.", "Gate A is strictly for staff now, go to Gate D.", "Just got a notification for a flash gig cleaning confetti.", "The projection mapping on the ceiling is trippy.", "Anyone else stuck in the elevator at the west tower?", "Best vegan food is at the green truck outside.", "They just announced a surprise encore!", "My phone is at 4%, going dark soon.", "The energy in here is absolutely electric tonight."];