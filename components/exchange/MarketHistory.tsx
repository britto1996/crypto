"use client";

import React from 'react';
import { useExchangeStore } from '@/store/useExchangeStore';
import { AnimatePresence, motion } from 'framer-motion';

export const MarketHistory = () => {
    const { trades, selectedAsset } = useExchangeStore();

    return (
        <div className="glass-pane" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Recent Trades</h3>
            </div>

            <div style={{ padding: '8px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                <span>Price</span>
                <span style={{ textAlign: 'right' }}>Size</span>
                <span style={{ textAlign: 'right' }}>Time</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                <AnimatePresence initial={false}>
                    {trades.map((trade) => (
                        <motion.div
                            key={trade.id}
                            initial={{ backgroundColor: trade.side === 'buy' ? 'rgba(0, 255, 189, 0.2)' : 'rgba(255, 77, 77, 0.2)' }}
                            animate={{ backgroundColor: 'transparent' }}
                            exit={{ opacity: 0 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                padding: '4px 16px',
                                fontSize: '12px',
                                alignItems: 'center'
                            }}
                        >
                            <span className={trade.side === 'buy' ? 'price-up mono' : 'price-down mono'}>
                                {trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <span className="mono" style={{ textAlign: 'right' }}>{trade.amount.toFixed(4)}</span>
                            <span style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: '10px' }} className="mono">{trade.time}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
