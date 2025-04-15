# AuctionHub

A modern online auction platform built with React, TypeScript, and Supabase.

## 🚀 Features

- User authentication (Sign up, Sign in, Sign out)
- Role-based access (Buyer/Seller)
- Real-time auction updates
- Secure bidding system
- User profiles and statistics
- Responsive design

## 🛠️ Technologies

- Frontend:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router v6
- Backend:
  - Supabase (Authentication & Database)

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/auction-hub.git
cd auction-hub
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

## 🔧 Configuration

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Set up the following tables:
   - users (integrated with auth)
   - items
   - bids

### Environment Variables

Required environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🏗️ Project Structure

```
auction-hub/
├── src/
│   ├── components/     # Reusable components
│   ├── context/       # React context
│   ├── lib/           # Utilities and configurations
│   ├── pages/         # Page components
│   ├── services/      # API services
│   └── types/         # TypeScript type definitions
├── public/           # Static assets
└── package.json     # Project dependencies
```

## 🚦 Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🧪 Testing

Run tests:
```bash
npm test
```

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ✨ Acknowledgments

- [Supabase](https://supabase.com) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Lucide Icons](https://lucide.dev) - Icons