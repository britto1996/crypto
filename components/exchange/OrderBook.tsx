"use client";

import React from 'react';
import { useExchangeStore } from '@/store/useExchangeStore';
import { motion, AnimatePresence } from 'framer-motion';

export const OrderBook = () => {
    const { orderBook, selectedAsset } = useExchangeStore();

    const maxAmount = Math.max(
        ...orderBook.asks.map(a => a.total),
        ...orderBook.bids.map(b => b.total),
        1
    );

    return (
        <div className="glass-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Order Book</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '2px' }} />
                    <div style={{ width: '12px', height: '12px', background: 'var(--danger)', borderRadius: '2px' }} />
                </div>
            </div>

            <div style={{ padding: '8px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                <span>Price (USDT)</span>
                <span style={{ textAlign: 'right' }}>Amount ({selectedAsset.symbol.split('/')[0]})</span>
                <span style={{ textAlign: 'right' }}>Total</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                {/* Asks (Sells) - we show them on top, but in the list they are higher prices */}
                <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    {orderBook.asks.map((ask, i) => (
                        <div key={`ask-${i}`} style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            padding: '4px 16px',
                            fontSize: '12px',
                            height: '24px',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                height: '100%',
                                width: `${(ask.total / maxAmount) * 100}%`,
                                background: 'rgba(255, 77, 77, 0.1)',
                                zIndex: 0
                            }} />
                            <span className="price-down mono" style={{ zIndex: 1 }}>{ask.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            <span className="mono" style={{ textAlign: 'right', zIndex: 1 }}>{ask.amount.toFixed(4)}</span>
                            <span className="mono" style={{ textAlign: 'right', zIndex: 1 }}>{ask.total.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                {/* Spread */}
                <div style={{
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    margin: '4px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }} className="mono">
                        {selectedAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        Spread: <span className="mono">0.12 (0.02%)</span>
                    </span>
                </div>

                {/* Bids (Buys) */}
                <div>
                    {orderBook.bids.map((bid, i) => (
                        <div key={`bid-${i}`} style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            padding: '4px 16px',
                            fontSize: '12px',
                            height: '24px',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                height: '100%',
                                width: `${(bid.total / maxAmount) * 100}%`,
                                background: 'rgba(0, 255, 189, 0.1)',
                                zIndex: 0
                            }} />
                            <span className="price-up mono" style={{ zIndex: 1 }}>{bid.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            <span className="mono" style={{ textAlign: 'right', zIndex: 1 }}>{bid.amount.toFixed(4)}</span>
                            <span className="mono" style={{ textAlign: 'right', zIndex: 1 }}>{bid.total.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
