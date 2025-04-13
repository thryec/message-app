## To-Dos


## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/defi-messenger.git
   cd defi-messenger
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your API keys.

4. Start the development server
   ```bash
   npm run dev
   ```

## Project Structure

- **src/app**: Next.js app router pages and layouts
- **src/components**: Reusable React components
  - **auth**: Authentication-related components
  - **chat**: Chat and messaging components
  - **layout**: Layout components (sidebar, header, etc.)
  - **ui**: Base UI components (buttons, inputs, etc.)
- **src/hooks**: Custom React hooks
- **src/lib**: Utility functions and shared code
- **src/types**: TypeScript type definitions
- **public**: Static assets

## Key Features

1. **Authentication**: Connect with Ethereum wallet (MetaMask, WalletConnect, etc.)
2. **Messaging**: End-to-end encrypted messaging using XMTP protocol
3. **Profiles**: Simple profile creation and management
4. **Conversations**: Start new conversations with any Ethereum address

## Architecture Overview

```
User Interface (Next.js)
       ↑ ↓
React Components/Hooks
       ↑ ↓
XMTP Client <---> XMTP Network
       ↑
Wallet Connection (viem/wagmi)
```

- User connects wallet using viem/wagmi
- XMTP client initializes using the connected wallet
- All messages are end-to-end encrypted via XMTP
- UI built with React components following Signal's design patterns

## Development Workflow

1. Connect wallet (required before messaging)
2. Initialize XMTP client (requires a signature)
3. View existing conversations or start new ones
4. Send/receive encrypted messages
5. Update profile information

## Future Enhancements

- Implement fully decentralized profile storage with IPFS
- Add group chat functionality
- Integrate crypto transfer capabilities
- Implement zkDID for verifiable identity
- Enhanced metadata protection
- Mobile app development