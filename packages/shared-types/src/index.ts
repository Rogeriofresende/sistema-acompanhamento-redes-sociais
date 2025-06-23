// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  youtubeChannels?: YouTubeChannel[];
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  avatar?: string;
}

export interface UpdateUserData {
  name?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

// YouTube Types
export interface YouTubeChannel {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  subscriberCount: number;
  videoCount: number;
  connectedAt: string;
  userId: string;
}

export interface YouTubeAnalytics {
  id: string;
  channelId: string;
  date: string;
  views: number;
  subscribers: number;
  watchTime: number;
  revenue?: number;
  demographics?: YouTubeDemographics;
  topVideos?: YouTubeVideo[];
}

export interface YouTubeDemographics {
  ageGroups: Record<string, number>;
  countries: Record<string, number>;
  gender: Record<string, number>;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  duration: string;
  publishedAt: string;
  url: string;
}

export interface YouTubeConnection {
  code: string;
  scope: string;
  redirectUri?: string;
}

// Guest/Podcast Types
export interface Guest {
  id: string;
  name: string;
  email: string;
  status: GuestStatus;
  expertise: string[];
  bio?: string;
  socialMedia?: SocialMediaLinks;
  scheduledDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type GuestStatus = 'pending' | 'contacted' | 'confirmed' | 'declined' | 'recorded' | 'published';

export interface SocialMediaLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  website?: string;
  youtube?: string;
}

export interface CreateGuestData {
  name: string;
  email: string;
  expertise: string[];
  bio?: string;
  socialMedia?: SocialMediaLinks;
  proposedTopics?: string[];
}

export interface UpdateGuestData {
  name?: string;
  email?: string;
  status?: GuestStatus;
  expertise?: string[];
  bio?: string;
  socialMedia?: SocialMediaLinks;
  scheduledDate?: string;
  notes?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  pagination?: PaginationInfo;
  meta?: Record<string, any>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  totalPages?: number;
  currentPage?: number;
}

// Query Types
export interface QueryParams {
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface GuestQueryParams extends QueryParams {
  status?: GuestStatus;
  expertise?: string[];
  scheduledAfter?: string;
  scheduledBefore?: string;
}

export interface AnalyticsQueryParams extends QueryParams {
  channelId: string;
  period?: '7d' | '30d' | '90d' | '1y';
  metrics?: string[];
  startDate?: string;
  endDate?: string;
}

// Authentication Types
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginRequest {
  token: string;
  provider: 'google';
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

// Audit Log Types
export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export type AuditAction = 
  | 'user.login'
  | 'user.logout'
  | 'user.update'
  | 'youtube.connect'
  | 'youtube.disconnect'
  | 'guest.create'
  | 'guest.update'
  | 'guest.delete'
  | 'analytics.view';

// Webhook Types
export interface WebhookPayload {
  type: string;
  data: Record<string, any>;
  timestamp: string;
  source: string;
}

export interface YouTubeWebhook extends WebhookPayload {
  type: 'youtube.analytics.updated' | 'youtube.channel.updated';
  data: {
    channelId: string;
    changes: Record<string, any>;
  };
}

// Configuration Types
export interface AppConfig {
  environment: 'development' | 'staging' | 'production';
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  auth: {
    google: {
      clientId: string;
      scopes: string[];
    };
  };
  youtube: {
    apiKey: string;
    quotaLimit: number;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'multiselect' | 'date' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
  value?: any;
  message: string;
}

// Dashboard/Analytics Types
export interface DashboardStats {
  totalViews: number;
  totalSubscribers: number;
  totalGuests: number;
  publishedEpisodes: number;
  viewsGrowth: number;
  subscribersGrowth: number;
  averageWatchTime: number;
  engagementRate: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }>;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
}

// Export all types as a namespace as well
export namespace SistemaLanceiEssa {
  export type {
    User,
    UserPreferences,
    CreateUserData,
    UpdateUserData,
    YouTubeChannel,
    YouTubeAnalytics,
    YouTubeDemographics,
    YouTubeVideo,
    YouTubeConnection,
    Guest,
    GuestStatus,
    SocialMediaLinks,
    CreateGuestData,
    UpdateGuestData,
    ApiResponse,
    ApiError,
    PaginationInfo,
    QueryParams,
    GuestQueryParams,
    AnalyticsQueryParams,
    AuthTokens,
    LoginRequest,
    LoginResponse,
    AuditLog,
    AuditAction,
    WebhookPayload,
    YouTubeWebhook,
    AppConfig,
    FormField,
    ValidationRule,
    DashboardStats,
    ChartDataPoint,
    ChartData,
    Notification
  };
} 