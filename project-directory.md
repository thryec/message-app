defi-messenger/
│
├── src/                          # Source directory (Next.js v15 structure)
│   ├── app/                      # Next.js App Router pages
│   │   ├── providers/            # Context providers
│   │   │   ├── WagmiProvider.tsx # Ethereum wallet provider
│   │   │   └── XmtpProvider.tsx  # XMTP client provider
│   │   ├── chat/                 # Chat routes
│   │   │   ├── page.tsx          # Main chat list page
│   │   │   └── [address]/        # Dynamic route for individual chats
│   │   │       └── page.tsx      # Single conversation page
│   │   ├── new-chat/             # New conversation route
│   │   │   └── page.tsx          # Start new chat page
│   │   ├── profile/              # Profile management
│   │   │   └── page.tsx          # User profile page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout with providers
│   │   └── page.tsx              # Home/landing page
│   │
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components
│   │   │   ├── ConnectButton.tsx # Wallet connect button
│   │   │   └── ProfileSetup.tsx  # Profile setup component
│   │   │
│   │   ├── chat/                 # Chat UI components
│   │   │   ├── ChatHeader.tsx    # Conversation header
│   │   │   ├── ChatInput.tsx     # Message input component
│   │   │   ├── ChatList.tsx      # List of conversations
│   │   │   ├── ConversationView.tsx # Full conversation view
│   │   │   └── MessageBubble.tsx # Individual message component
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── MainLayout.tsx    # Main application layout
│   │   │   ├── Sidebar.tsx       # Chat sidebar with conversations
│   │   │   └── TopBar.tsx        # Top application bar
│   │   │
│   │   └── ui/                   # Base UI components
│   │       ├── Avatar.tsx        # User avatar component
│   │       ├── Button.tsx        # Reusable button component
│   │       └── Input.tsx         # Form input component
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useConversations.ts   # Manage conversations
│   │   ├── useMessages.ts        # Handle message sending/receiving
│   │   └── useProfile.ts         # Profile management hook
│   │
│   ├── lib/                      # Utility functions
│   │   └── utils.ts              # Common utilities
│   │
│   └── types/                    # TypeScript type definitions
│       ├── chat.ts               # Chat and message types
│       └── profile.ts            # User profile types
│
├── public/                       # Static files
│
├── .env.local                    # Environment variables (local)
├── .env.example                  # Example environment variables
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore file
├── next.config.mjs               # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.js             # PostCSS configuration
├── README.md                     # Project documentation
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration