# Web3 Messenger

A decentralized encrypted messaging application that allows users to communicate securely using their Ethereum wallet addresses. Built with Next.js, TypeScript, viem, and XMTP. 

## 🚀 Features

- **Wallet-Based Authentication**: Connect with any Ethereum wallet
- **End-to-End Encryption**: Secure messaging using XMTP protocol
- **Decentralized**: Messages are stored on the decentralized XMTP network
- **Signal-like UI/UX**: Familiar, clean, and user-friendly interface
- **Profile Management**: Create and manage your profile information
- **Conversations**: Start direct conversations with any Ethereum address

## 💻 Tech Stack

- **Frontend**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4
- **Blockchain Interaction**: viem and wagmi
- **Messaging Protocol**: XMTP
- **Authentication**: Ethereum wallet-based (MetaMask, WalletConnect, etc.)

## 📷 Screenshots

(Screenshots will be added after initial implementation)

## 🛠️ Installation

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

## 📚 Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your Ethereum wallet.
2. **Initialize XMTP**: After connecting, initialize your XMTP client with a one-time signature.
3. **Start Chatting**: Enter an Ethereum address to start a new conversation.
4. **Manage Profile**: Update your display name and bio from the profile page.

## 🔒 Privacy & Security Features

- **End-to-End Encryption**: All messages are encrypted using XMTP's secure protocol
- **No Phone Number Required**: Use your Ethereum address as your identity
- **Decentralized Storage**: Messages are stored on the decentralized XMTP network
- **Open Source**: All code is open for review and verification

## To-dos
- [ ] Add support for multiple wallets
- [ ] ENS directory integration 
- [ ] Integrate with zkDID solution 
- [ ] Integrate metadata storage solution 
- [ ] Group Messaging 
- [ ] p2p payments 

## 🗺️ Roadmap

### MVP (Current)
- Basic wallet connection and XMTP integration
- 1-to-1 encrypted messaging
- Simple profile management
- Web application with responsive design

### Future Enhancements
- **Enhanced Privacy**: Additional metadata protection layers
- **Decentralized Identity**: Integration with zkDID solutions
- **Crypto Transfers**: Send cryptocurrency within conversations
- **Group Messaging**: Create and manage group conversations
- **Mobile Apps**: Native mobile applications
- **Advanced Storage**: Fully decentralized profile storage with IPFS/Ceramic

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [XMTP](https://xmtp.org/) for the messaging protocol
- [Next.js](https://nextjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [viem](https://viem.sh/) and [wagmi](https://wagmi.sh/) for Ethereum interaction
- [Signal](https://signal.org/) for UI/UX inspiration