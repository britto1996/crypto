# Nexus DEX - High-Performance Crypto Exchange Showcase

Nexus DEX is a state-of-the-art cryptocurrency exchange demonstration built with **Next.js 14**, **TypeScript**, and **Zustand**. Designed for maximum performance and institutional-grade aesthetics, it showcases advanced frontend engineering patterns required for real-time trading environments.

## 🚀 Key Features

- **Real-Time Data Engine**: Custom mock engine simulating live order books, price feeds, and trade executions via a centralized state management system.
- **High-Performance Charting**: Integration with `lightweight-charts` (TradingView) for buttery-smooth candlestick rendering and technical analysis.
- **Premium UI/UX**: 
  - Glassmorphic design system using Vanilla CSS.
  - Interactive trade forms with dynamic fee calculation and balance shortcuts.
  - Responsive layout optimized for data-dense environments.
- **State Architecture**: Scalable store design using Zustand, ensuring minimal re-renders even under heavy data loads.
- **Testing Rigor**: Unit testing suite with Vitest demonstrating a commitment to code quality and reliability.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charting**: Lightweight Charts
- **Icons**: Lucide React
- **Testing**: Vitest

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Run Tests**:
   ```bash
   npm test
   ```

## 🏗 Architecture Highlights

### Real-Time Update Strategy
The application utilizes a `useMockRealtime` hook that pushes updates directly to the store. In a production environment, this would be swapped with a WebSocket provider (e.g., Binance API or custom DeX backend).

### Design System
The design system is defined in `globals.css` using CSS variables, allowing for consistent branding and easy theme switching (e.g., Light Mode, though Dark Mode is the institutional standard).

### Component Design
Components are highly decoupled. The `OrderBook` and `TradingChart` are optimized for high-frequency updates using memoization and targeted store subscriptions.

---

*This project was created as a recruitment showcase for Career Renew.*
