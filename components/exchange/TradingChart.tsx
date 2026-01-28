"use client";

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import { useExchangeStore } from '@/store/useExchangeStore';

export const TradingChart = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const { selectedAsset } = useExchangeStore();
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#8b949e',
            },
            grid: {
                vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
                horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 450,
            timeScale: {
                borderColor: 'rgba(197, 203, 206, 0.2)',
                timeVisible: true,
                secondsVisible: false,
            },
        });

        const candleSeries = chart.addCandlestickSeries({
            upColor: '#00ffbd',
            downColor: '#ff4d4d',
            borderVisible: false,
            wickUpColor: '#00ffbd',
            wickDownColor: '#ff4d4d',
        });

        seriesRef.current = candleSeries;

        // Generate some mock historical data
        const data: CandlestickData<Time>[] = [];
        let curPrice = selectedAsset.price;
        const now = Math.floor(Date.now() / 1000);

        for (let i = 0; i < 100; i++) {
            const open = curPrice;
            const close = curPrice + (Math.random() * 20 - 10);
            const high = Math.max(open, close) + Math.random() * 5;
            const low = Math.min(open, close) - Math.random() * 5;

            data.push({
                time: (now - (100 - i) * 60) as Time,
                open,
                high,
                low,
                close
            });
            curPrice = close;
        }

        candleSeries.setData(data);

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [selectedAsset.symbol]); // Re-create on asset change

    // Update last candle with "real-time" price
    useEffect(() => {
        if (seriesRef.current) {
            // In a real app, you'd update the last candle or add a new one
            // For simplicity, we just log that we have a ref
        }
    }, [selectedAsset.price]);

    return (
        <div className="glass-pane" style={{ flex: 1, padding: '12px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['1m', '5m', '15m', '1h', '4h', '1D'].map(t => (
                        <button key={t} style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            borderRadius: '4px',
                            background: t === '15m' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            color: t === '15m' ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}>{t}</button>
                    ))}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    O: <span className="price-up">64,210.5</span> H: <span className="price-up">64,500.0</span> L: <span className="price-down">63,980.2</span> C: <span className="price-up">64,230.5</span>
                </div>
            </div>
            <div ref={chartContainerRef} style={{ flex: 1 }} />
        </div>
    );
};
