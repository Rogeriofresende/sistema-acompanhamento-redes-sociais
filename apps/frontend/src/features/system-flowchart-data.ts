// System flowchart data for the Lancei Essa application
// This represents the complete flow of the application including user authentication,
// navigation paths, data flow, and key interactions

export const SYSTEM_FLOWCHART = {
  // Authentication flow
  authentication: {
    entryPoint: "login",
    steps: [
      {
        id: "login",
        name: "Login Page",
        description: "User authentication with email/password or Google",
        nextSteps: ["youtube-connect"],
        actions: [
          { name: "Login with Email", target: "youtube-connect" },
          { name: "Login with Google", target: "youtube-connect" },
        ],
      },
      {
        id: "youtube-connect",
        name: "YouTube Connection",
        description: "Connect YouTube account to access analytics data",
        nextSteps: ["dashboard"],
        actions: [{ name: "Connect YouTube Account", target: "dashboard" }],
        requiredBefore: ["dashboard", "videos", "newsletter"],
      },
    ],
  },

  // Main application flow
  mainFlow: {
    entryPoint: "dashboard",
    pages: [
      {
        id: "dashboard",
        name: "Dashboard",
        description:
          "Main analytics overview with engagement funnel and metrics",
        components: [
          {
            id: "overview-stats",
            name: "Overview Statistics",
            dataSource: "OVERVIEW_STATS",
          },
          {
            id: "engagement-funnel",
            name: "Engagement Funnel",
            dataSource: "FUNNEL_DATA",
          },
          {
            id: "recurring-viewers",
            name: "Recurring Viewers",
            dataSource: "RECURRING_VIEWERS_DATA",
          },
          {
            id: "metrics-table",
            name: "Metrics Table",
            dataSource: "METRICS_DATA",
          },
        ],

        actions: [
          { name: "Navigate to Videos", target: "videos" },
          { name: "Change Time Range", target: "dashboard", affectsData: true },
        ],
      },
      {
        id: "videos",
        name: "Videos Page",
        description: "List and management of YouTube videos with analytics",
        components: [
          { id: "video-list", name: "Video List", dataSource: "API" },
          { id: "video-filters", name: "Video Filters" },
          { id: "video-analytics", name: "Video Analytics", dataSource: "API" },
        ],

        actions: [
          { name: "Filter Videos", target: "videos", affectsData: true },
          { name: "View Video Details", target: "video-details" },
          { name: "Back to Dashboard", target: "dashboard" },
        ],
      },
      {
        id: "newsletter",
        name: "Newsletter Page",
        description: "Newsletter management and subscriber analytics",
        components: [
          {
            id: "subscriber-stats",
            name: "Subscriber Statistics",
            dataSource: "API",
          },
          { id: "newsletter-editor", name: "Newsletter Editor" },
          { id: "subscriber-list", name: "Subscriber List", dataSource: "API" },
        ],

        actions: [
          { name: "Create Newsletter", target: "newsletter-editor" },
          { name: "Send Newsletter", target: "newsletter-confirmation" },
          { name: "Back to Dashboard", target: "dashboard" },
        ],
      },
      {
        id: "settings",
        name: "Settings Page",
        description: "User preferences and application settings",
        components: [
          { id: "notification-settings", name: "Notification Settings" },
          { id: "account-security", name: "Account & Security" },
          { id: "access-control", name: "Access Control" },
          { id: "preferences", name: "Preferences" },
        ],

        actions: [
          { name: "Save Settings", target: "settings", affectsData: true },
          { name: "Delete Account", target: "delete-confirmation" },
          { name: "Back to Dashboard", target: "dashboard" },
        ],
      },
      {
        id: "profile",
        name: "Profile Page",
        description: "User profile information and connected accounts",
        components: [
          { id: "profile-info", name: "Profile Information" },
          { id: "connected-accounts", name: "Connected Accounts" },
          { id: "social-links", name: "Social Media Links" },
        ],

        actions: [
          { name: "Edit Profile", target: "profile", affectsData: true },
          { name: "Back to Dashboard", target: "dashboard" },
        ],
      },
    ],
  },

  // Data flow between components and API
  dataFlow: {
    sources: [
      {
        id: "youtube-api",
        name: "YouTube API",
        provides: [
          "channel-statistics",
          "video-analytics",
          "audience-demographics",
          "engagement-metrics",
        ],
      },
      {
        id: "beehiiv-api",
        name: "Beehiiv API",
        provides: ["subscriber-count", "email-metrics", "newsletter-templates"],
      },
      {
        id: "local-storage",
        name: "Local Storage",
        provides: [
          "user-preferences",
          "theme-settings",
          "authentication-tokens",
        ],
      },
    ],

    destinations: [
      {
        id: "dashboard-components",
        name: "Dashboard Components",
        consumes: [
          "channel-statistics",
          "video-analytics",
          "engagement-metrics",
        ],
      },
      {
        id: "videos-components",
        name: "Videos Components",
        consumes: ["video-analytics", "audience-demographics"],
      },
      {
        id: "newsletter-components",
        name: "Newsletter Components",
        consumes: ["subscriber-count", "email-metrics", "newsletter-templates"],
      },
    ],
  },

  // User journey paths
  userJourneys: [
    {
      id: "new-user",
      name: "New User Onboarding",
      steps: [
        { page: "login", action: "Login with Google" },
        { page: "youtube-connect", action: "Connect YouTube Account" },
        { page: "dashboard", action: "View Analytics" },
        { page: "videos", action: "View Video Performance" },
        { page: "settings", action: "Configure Notifications" },
      ],
    },
    {
      id: "content-creator",
      name: "Content Creator Workflow",
      steps: [
        { page: "login", action: "Login with Email" },
        { page: "dashboard", action: "Check Performance" },
        { page: "videos", action: "Analyze Top Videos" },
        { page: "newsletter", action: "Create Newsletter" },
        { page: "newsletter", action: "Send Newsletter" },
      ],
    },
    {
      id: "analytics-review",
      name: "Analytics Review",
      steps: [
        { page: "login", action: "Login with Email" },
        { page: "dashboard", action: "View Engagement Funnel" },
        { page: "dashboard", action: "Check Recurring Viewers" },
        { page: "dashboard", action: "Change Time Range" },
        { page: "videos", action: "Filter Videos by Performance" },
      ],
    },
  ],

  // System states
  systemStates: {
    authentication: [
      { id: "logged-out", name: "Logged Out" },
      { id: "logged-in", name: "Logged In" },
      { id: "youtube-disconnected", name: "YouTube Disconnected" },
      { id: "youtube-connected", name: "YouTube Connected" },
    ],

    dataLoading: [
      { id: "initial-load", name: "Initial Load" },
      { id: "loading", name: "Loading Data" },
      { id: "loaded", name: "Data Loaded" },
      { id: "error", name: "Error Loading Data" },
    ],

    timeRanges: [
      { id: "7d", name: "7 dias", description: "Last 7 days of data" },
      { id: "28d", name: "28 dias", description: "Last 28 days of data" },
      { id: "90d", name: "90 dias", description: "Last 90 days of data" },
    ],
  },
};

// Detailed component relationships
export const COMPONENT_RELATIONSHIPS = {
  "brand-layout": {
    type: "layout",
    contains: ["brand-header", "sidebar-navigation"],
    usedBy: [
      "dashboard-page",
      "videos-page",
      "newsletter-page",
      "settings-page",
      "profile-page",
    ],
  },
  "brand-header": {
    type: "component",
    contains: ["channel-logo", "theme-toggle", "brand-button"],
    usedBy: ["brand-layout"],
  },
  "engagement-funnel": {
    type: "component",
    contains: ["funnel-step"],
    usedBy: ["dashboard-page"],
    dataSource: "FUNNEL_DATA",
  },
  "recurring-viewers-card": {
    type: "component",
    contains: ["recurring-viewers-chart"],
    usedBy: ["dashboard-page"],
    dataSource: "RECURRING_VIEWERS_HISTORY",
  },
  "metrics-table": {
    type: "component",
    contains: [],
    usedBy: ["dashboard-page"],
    dataSource: "METRICS_DATA",
  },
  "time-range-selector": {
    type: "component",
    contains: [],
    usedBy: ["dashboard-page"],
    affects: [
      "overview-stats",
      "engagement-funnel",
      "recurring-viewers-card",
      "metrics-table",
    ],
  },
};

// Application routes
export const APP_ROUTES = [
  { path: "/", component: "LoginPage", requiresAuth: false },
  {
    path: "/dashboard",
    component: "DashboardPage",
    requiresAuth: true,
    requiresYouTube: true,
  },
  {
    path: "/videos",
    component: "VideosPage",
    requiresAuth: true,
    requiresYouTube: true,
  },
  {
    path: "/newsletter",
    component: "NewsletterPage",
    requiresAuth: true,
    requiresYouTube: true,
  },
  {
    path: "/settings",
    component: "SettingsPage",
    requiresAuth: true,
    requiresYouTube: true,
  },
  {
    path: "/profile",
    component: "ProfilePage",
    requiresAuth: true,
    requiresYouTube: true,
  },
];

// Data dependencies between components
export const DATA_DEPENDENCIES = {
  "dashboard-page": [
    { dataKey: "OVERVIEW_STATS", affects: ["stat-card"] },
    { dataKey: "FUNNEL_DATA", affects: ["engagement-funnel"] },
    { dataKey: "RECURRING_VIEWERS_DATA", affects: ["recurring-viewers-card"] },
    { dataKey: "METRICS_DATA", affects: ["metrics-table"] },
  ],

  "videos-page": [
    { dataKey: "VIDEOS_DATA", affects: ["video-list", "video-filters"] },
  ],

  "newsletter-page": [
    {
      dataKey: "NEWSLETTER_DATA",
      affects: ["subscriber-stats", "newsletter-editor"],
    },
  ],
};
