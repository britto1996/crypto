"use client";

import React, { useState } from 'react';
import { useExchangeStore } from '@/store/useExchangeStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast } from '@/components/ui/Toast';

export const TradeForm = () => {
    const { selectedAsset, balance, walletConnected, placeOrder } = useExchangeStore();
    const [side, setSide] = useState<'buy' | 'sell'>('buy');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState(selectedAsset.price.toString());
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const baseSymbol = selectedAsset.symbol.split('/')[0];
    const quoteSymbol = selectedAsset.symbol.split('/')[1];

    return (
        <div className="glass-pane" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '4px' }}>
                <button
                    onClick={() => setSide('buy')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        background: side === 'buy' ? 'rgba(0, 255, 189, 0.15)' : 'transparent',
                        color: side === 'buy' ? 'var(--success)' : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '14px',
                        transition: 'var(--transition)'
                    }}
                >
                    Buy
                </button>
                <button
                    onClick={() => setSide('sell')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        background: side === 'sell' ? 'rgba(255, 77, 77, 0.15)' : 'transparent',
                        color: side === 'sell' ? 'var(--danger)' : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '14px',
                        transition: 'var(--transition)'
                    }}
                >
                    Sell
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <span>Available</span>
                    <span className="mono">{side === 'buy' ? `${balance.usdt.toLocaleString()} ${quoteSymbol}` : `${balance.btc.toLocaleString()} ${baseSymbol}`}</span>
                </div>

                <div className="glass-pane" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Price</span>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mono"
                            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '16px', fontWeight: 500 }}
                        />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{quoteSymbol}</span>
                </div>

                <div className="glass-pane" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Amount</span>
                        <input
                            type="text"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mono"
                            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '16px', fontWeight: 500 }}
                        />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{baseSymbol}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    {['25%', '50%', '75%', '100%'].map((pct) => (
                        <button key={pct} style={{
                            flex: 1,
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '6px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)'
                        }}>
                            {pct}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total</span>
                    <span className="mono">{(Number(amount) * Number(price) || 0).toLocaleString()} {quoteSymbol}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Fee (0.1%)</span>
                    <span className="mono">{(Number(amount) * Number(price) * 0.001 || 0).toFixed(4)} {quoteSymbol}</span>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                    if (!amount || !price) return;
                    setStatus('loading');
                    setTimeout(() => {
                        placeOrder(side, Number(price), Number(amount));
                        setStatus('success');
                        setTimeout(() => setStatus('idle'), 3000);
                        setAmount('');
                    }, 600);
                }}
                disabled={status === 'loading'}
                style={{
                    background: status === 'success' ? 'var(--success)' : (side === 'buy' ? 'var(--success)' : 'var(--danger)'),
                    color: 'black',
                    padding: '14px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '16px',
                    marginTop: '8px',
                    boxShadow: side === 'buy' ? '0 0 20px rgba(0, 255, 189, 0.2)' : '0 0 20px rgba(255, 77, 77, 0.2)',
                    opacity: status === 'loading' ? 0.7 : 1,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'var(--transition)'
                }}
            >
                {status === 'loading' ? 'Processing...' : (status === 'success' ? 'Order Placed!' : (side === 'buy' ? `Buy ${baseSymbol}` : `Sell ${baseSymbol}`))}
            </motion.button>

            <AnimatePresence>
                {status === 'success' && (
                    <Toast
                        message={`Order placed for ${amount} ${baseSymbol}`}
                        onClose={() => setStatus('idle')}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
