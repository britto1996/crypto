import { describe, it, expect, vi } from 'vitest';
import { useExchangeStore } from '../store/useExchangeStore';

// Mocking Zustand for simple unit tests
describe('Exchange Store', () => {
    it('should initialize with default asset BTC/USDT', () => {
        const state = useExchangeStore.getState();
        expect(state.selectedAsset.symbol).toBe('BTC/USDT');
    });

    it('should update price correctly', () => {
        const { updatePrice } = useExchangeStore.getState();
        updatePrice('BTC/USDT', 65000);

        const state = useExchangeStore.getState();
        expect(state.selectedAsset.price).toBe(65000);
    });

    it('should add trades to the history', () => {
        const { addTrade } = useExchangeStore.getState();
        const mockTrade = {
            id: '1',
            price: 64000,
            amount: 0.1,
            time: '12:00:00',
            side: 'buy' as const
        };

        addTrade(mockTrade);
        const state = useExchangeStore.getState();
        expect(state.trades[0]).toEqual(mockTrade);
    });
});
