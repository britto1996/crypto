"use client";

import React, { useState } from 'react';
import { useExchangeStore } from '@/store/useExchangeStore';
import { X } from 'lucide-react';

export const UserOrders = () => {
    const { openOrders, positions, cancelOrder } = useExchangeStore();
    const [activeTab, setActiveTab] = useState<'orders' | 'positions'>('orders');

    return (
        <div className="glass-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border)', padding: '0 24px' }}>
                <button
                    onClick={() => setActiveTab('orders')}
                    style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        padding: '16px 0',
                        borderBottom: activeTab === 'orders' ? '2px solid var(--primary)' : '2px solid transparent',
                        color: activeTab === 'orders' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        transition: 'var(--transition)'
                    }}
                >
                    Open Orders ({openOrders.length})
                </button>
                <button
                    onClick={() => setActiveTab('positions')}
                    style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        padding: '16px 0',
                        borderBottom: activeTab === 'positions' ? '2px solid var(--primary)' : '2px solid transparent',
                        color: activeTab === 'positions' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        transition: 'var(--transition)'
                    }}
                >
                    Positions ({positions.length})
                </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {activeTab === 'orders' ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ color: 'var(--text-secondary)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Time</th>
                                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Asset</th>
                                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Side</th>
                                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Price</th>
                                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Amount</th>
                                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Filled</th>
                                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                                        No open orders
                                    </td>
                                </tr>
                            ) : (
                                openOrders.map((order) => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}>
                                        <td style={{ padding: '12px 24px' }} className="mono">{order.time}</td>
                                        <td style={{ padding: '12px 24px', fontWeight: 600 }}>{order.symbol}</td>
                                        <td style={{ padding: '12px 24px' }} className={order.side === 'buy' ? 'price-up' : 'price-down'}>
                                            {order.side.toUpperCase()}
                                        </td>
                                        <td style={{ padding: '12px 24px' }} className="mono">{order.price.toLocaleString()}</td>
                                        <td style={{ padding: '12px 24px' }} className="mono">{order.amount.toFixed(4)}</td>
                                        <td style={{ padding: '12px 24px' }} className="mono">{((order.filled / order.amount) * 100).toFixed(0)}%</td>
                                        <td style={{ padding: '12px 24px' }}>
                                            <button
                                                onClick={() => cancelOrder(order.id)}
                                                style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px' }}
                                            >
                                                <X size={14} /> Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                        No active positions
                    </div>
                )}
            </div>
        </div>
    );
};
