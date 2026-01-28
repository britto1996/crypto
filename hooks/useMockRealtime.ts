import { useEffect } from 'react';
import { useExchangeStore } from '@/store/useExchangeStore';

export const useMockRealtime = () => {
    const { updatePrice, setOrderBook, addTrade, selectedAsset } = useExchangeStore();

    useEffect(() => {
        // Simulate Price Updates
        const priceInterval = setInterval(() => {
            const volatility = 0.0005;
            const change = 1 + (Math.random() * volatility * 2 - volatility);
            const newPrice = selectedAsset.price * change;
            updatePrice(selectedAsset.symbol, newPrice);
        }, 1000);

        // Simulate Order Book
        const orderBookInterval = setInterval(() => {
            const basePrice = selectedAsset.price;
            const bids = Array.from({ length: 15 }, (_, i) => ({
                price: basePrice - (i * 0.5) - Math.random(),
                amount: Math.random() * 2,
                total: 0
            })).sort((a, b) => b.price - a.price);

            const asks = Array.from({ length: 15 }, (_, i) => ({
                price: basePrice + (i * 0.5) + Math.random(),
                amount: Math.random() * 2,
                total: 0
            })).sort((a, b) => a.price - b.price);

            // Calculate cumulative totals
            let bidTotal = 0;
            const bidsWithTotal = bids.map(b => {
                bidTotal += b.amount;
                return { ...b, total: bidTotal };
            });

            let askTotal = 0;
            const asksWithTotal = asks.map(a => {
                askTotal += a.amount;
                return { ...a, total: askTotal };
            });

            setOrderBook(bidsWithTotal, asksWithTotal);
        }, 800);

        // Simulate Recent Trades
        const tradeInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                const side = Math.random() > 0.5 ? 'buy' : 'sell';
                addTrade({
                    id: Math.random().toString(36).substring(7),
                    price: selectedAsset.price + (Math.random() * 2 - 1),
                    amount: Math.random() * 0.5,
                    time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    side: side as 'buy' | 'sell'
                });
            }
        }, 2000);

        return () => {
            clearInterval(priceInterval);
            clearInterval(orderBookInterval);
            clearInterval(tradeInterval);
        };
    }, [selectedAsset, updatePrice, setOrderBook, addTrade]);
};
