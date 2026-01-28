import { create } from 'zustand';

interface Trade {
    id: string;
    price: number;
    amount: number;
    time: string;
    side: 'buy' | 'sell';
}

interface OrderBookEntry {
    price: number;
    amount: number;
    total: number;
}

interface Asset {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    volume24h: string;
}

interface Order {
    id: string;
    symbol: string;
    side: 'buy' | 'sell';
    price: number;
    amount: number;
    filled: number;
    status: 'open' | 'filled' | 'cancelled';
    time: string;
}

interface Position {
    symbol: string;
    side: 'long' | 'short';
    entryPrice: number;
    amount: number;
    pnl: number;
}

interface ExchangeState {
    selectedAsset: Asset;
    assets: Asset[];
    orderBook: {
        bids: OrderBookEntry[];
        asks: OrderBookEntry[];
    };
    trades: Trade[];
    openOrders: Order[];
    positions: Position[];
    walletConnected: boolean;
    balance: {
        usdt: number;
        btc: number;
        eth: number;
        sol: number;
    };

    // Actions
    setSelectedAsset: (asset: Asset) => void;
    updatePrice: (symbol: string, price: number) => void;
    setOrderBook: (bids: OrderBookEntry[], asks: OrderBookEntry[]) => void;
    addTrade: (trade: Trade) => void;
    connectWallet: () => void;
    placeOrder: (side: 'buy' | 'sell', price: number, amount: number) => void;
    cancelOrder: (id: string) => void;
    updatePNL: () => void;
}

export const useExchangeStore = create<ExchangeState>((set) => ({
    selectedAsset: {
        symbol: 'BTC/USDT',
        name: 'Bitcoin',
        price: 64230.50,
        change24h: 2.45,
        volume24h: '1.2B'
    },
    assets: [
        { symbol: 'BTC/USDT', name: 'Bitcoin', price: 64230.50, change24h: 2.45, volume24h: '1.2B' },
        { symbol: 'ETH/USDT', name: 'Ethereum', price: 3450.20, change24h: -1.2, volume24h: '800M' },
        { symbol: 'SOL/USDT', name: 'Solana', price: 145.60, change24h: 5.67, volume24h: '300M' },
        { symbol: 'ARB/USDT', name: 'Arbitrum', price: 1.15, change24h: -3.4, volume24h: '50M' },
    ],
    orderBook: {
        bids: [],
        asks: []
    },
    trades: [],
    openOrders: [],
    positions: [],
    walletConnected: false,
    balance: {
        usdt: 15420.50,
        btc: 0.12,
        eth: 1.45,
        sol: 10.5
    },

    setSelectedAsset: (asset) => set({ selectedAsset: asset }),
    updatePrice: (symbol, price) => set((state) => {
        const updatedAssets = state.assets.map(a => a.symbol === symbol ? { ...a, price } : a);
        const updatedSelected = state.selectedAsset.symbol === symbol ? { ...state.selectedAsset, price } : state.selectedAsset;

        // Simulate order matching
        const openOrders = [...state.openOrders];
        const positions = [...state.positions];
        const trades = [...state.trades];
        const balance = { ...state.balance };

        openOrders.forEach((order, idx) => {
            if (order.status === 'open' && order.symbol === symbol) {
                const isMatch = order.side === 'buy' ? price <= order.price : price >= order.price;
                if (isMatch) {
                    order.status = 'filled';
                    order.filled = order.amount;

                    // Add to trades
                    trades.unshift({
                        id: Math.random().toString(36),
                        price: order.price,
                        amount: order.amount,
                        time: new Date().toLocaleTimeString(),
                        side: order.side
                    });

                    // update balance/positions
                    if (order.side === 'buy') {
                        const base = symbol.split('/')[0].toLowerCase() as keyof typeof balance;
                        balance[base] = (Number(balance[base]) || 0) + order.amount;
                    } else {
                        balance.usdt += order.amount * order.price;
                    }
                }
            }
        });

        return {
            assets: updatedAssets,
            selectedAsset: updatedSelected,
            openOrders,
            trades: trades.slice(0, 50),
            balance
        };
    }),
    setOrderBook: (bids, asks) => set({ orderBook: { bids, asks } }),
    addTrade: (trade) => set((state) => ({
        trades: [trade, ...state.trades].slice(0, 50)
    })),
    connectWallet: () => set({ walletConnected: true }),
    placeOrder: (side, price, amount) => set((state) => {
        const newOrder: Order = {
            id: Math.random().toString(36).substring(7),
            symbol: state.selectedAsset.symbol,
            side,
            price,
            amount,
            filled: 0,
            status: 'open',
            time: new Date().toLocaleTimeString()
        };

        const balance = { ...state.balance };
        if (side === 'buy') {
            balance.usdt -= price * amount;
        } else {
            const base = state.selectedAsset.symbol.split('/')[0].toLowerCase() as keyof typeof balance;
            balance[base] = (Number(balance[base]) || 0) - amount;
        }

        return {
            openOrders: [newOrder, ...state.openOrders],
            balance
        };
    }),
    cancelOrder: (id) => set((state) => ({
        openOrders: state.openOrders.filter(o => o.id !== id)
    })),
    updatePNL: () => set((state) => ({
        // Mock PNL calculation
        positions: state.positions.map(p => ({
            ...p,
            pnl: (state.assets.find(a => a.symbol === p.symbol)?.price || 0) - p.entryPrice
        }))
    }))
}));
