export const APP_VERSION = 'MSv1';

export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum Screen {
  LOGIN = 'LOGIN',
  ADMIN_GATEWAY = 'ADMIN_GATEWAY',
  ADMIN_PERSONNEL_SELECT = 'ADMIN_PERSONNEL_SELECT',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ONBOARDING = 'ONBOARDING',
  LOGIN_FLOW = 'LOGIN_FLOW',
  RECOVER_PASSWORD = 'RECOVER_PASSWORD',
  SELECT_SPECIALTY = 'SELECT_SPECIALTY',
  FEED = 'FEED',
  MARKET = 'MARKET',
  WALLET = 'WALLET',
  ADMIN_TEAM_CHAT = 'ADMIN_TEAM_CHAT',
  ADMIN_DASH = 'ADMIN_DASH',

  // INDIVIDUAL DASHBOARDS (CLONES)
  DASH_GOD_MODE = 'DASH_GOD_MODE',
  DASH_ARCHY = 'DASH_ARCHY',
  DASH_SPONSOR = 'DASH_SPONSOR',
  DASH_OWNER = 'DASH_OWNER',
  DASH_MANAGER = 'DASH_MANAGER',
  DASH_PROMOTER = 'DASH_PROMOTER',
  DASH_ASSISTANT = 'DASH_ASSISTANT',
  DASH_MODERATOR = 'DASH_MODERATOR',

  // THE 8 AGENTS
  DASH_DATIN = 'DASH_DATIN',
  DASH_SIRENA = 'DASH_SIRENA',
  DASH_VIPPY = 'DASH_VIPPY',
  DASH_GUIDE = 'DASH_GUIDE', // Also AI_SUPPORT
  DASH_ASSI = 'DASH_ASSI',
  DASH_DESY = 'DASH_DESY',
  DASH_MARK = 'DASH_MARK',
  DASH_HACKY = 'DASH_HACKY',
  DASH_FLOR = 'DASH_FLOR',

  // NEW SCREENS FROM HIVE MIND
  MY_NETWORK = 'MY_NETWORK',
  DEALS = 'DEALS',
  NOTIFICATIONS = 'NOTIFICATIONS'
}

export enum MessageType {
  CHAT = 'CHAT',
  SYSTEM = 'SYSTEM',
  GIG_OFFER = 'GIG_OFFER',
  ALERT = 'ALERT',
  SOCIAL_LOTTERY = 'SOCIAL_LOTTERY',
  TIPPING = 'TIPPING',
  SPOT_RELEASE = 'SPOT_RELEASE',
  FLASH_PROMO = 'FLASH_PROMO'
}

export interface User {
  id: string;
  username: string;
  meritScore: number;
  avatarUrl: string;
  isVerified?: boolean;
  scoreColor?: string;
  role?: string;
  about?: string;
  skills?: string[];
  behavioralStats?: {
    consistency: number;
    complexity: string; // "HIGH", "MED", "LOW"
    velocity: number;
    collateral: number;
  };
}

export interface Message {
  id: string;
  text: string;
  sender: User | 'SYSTEM';
  timestamp: Date;
  type: MessageType;
  repeatCount?: number;
  topicTag?: string;
  replies?: Message[];
  metadata?: {
    location?: string;
    amount?: number;
    gigTitle?: string;
    lotteryId?: string;
    participants?: number;
    status?: string;
    venue?: string;
    target?: string;
    timeLeft?: string;
  };
}

export enum ConnectionState {
  ONLINE = 'ONLINE',
  LIQUID = 'LIQUID',
  DISCONNECTED = 'DISCONNECTED'
}