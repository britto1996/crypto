"use client";

import React from 'react';
import { useExchangeStore } from '@/store/useExchangeStore';
import { Wallet, Bell, ChevronDown, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
    const { walletConnected, connectWallet, selectedAsset } = useExchangeStore();

    return (
        <header className="glass-pane" style={{
            margin: '12px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: '12px',
            zIndex: 100,
            borderRadius: '16px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Zap size={20} color="white" fill="white" />
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                        NEXUS<span style={{ color: 'var(--primary)' }}>DEX</span>
                    </span>
                </div>

                <nav style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>
                    <a href="#" style={{ color: 'var(--text-primary)' }}>Exchange</a>
                    <a href="#">Liquidity</a>
                    <a href="#">Governance</a>
                    <a href="#">Bridge</a>
                </nav>

                <div style={{ height: '24px', width: '1px', background: 'var(--border)' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>{selectedAsset.symbol}</span>
                        <span className={selectedAsset.change24h >= 0 ? 'price-up' : 'price-down'} style={{ fontSize: '12px' }}>
                            {selectedAsset.change24h >= 0 ? '+' : ''}{selectedAsset.change24h}%
                        </span>
                    </div>
                    <div style={{ fontSize: '14px', borderLeft: '1px solid var(--border)', paddingLeft: '16px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>24h Vol:</span> <span className="mono">{selectedAsset.volume24h}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 12px',
                    background: 'rgba(0, 255, 189, 0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0, 255, 189, 0.1)'
                }}>
                    <Activity size={14} className="price-up animate-pulse-glow" />
                    <span style={{ fontSize: '12px', color: 'var(--success)' }}>Network Stable: 12ms</span>
                </div>

                <button
                    onClick={connectWallet}
                    className={walletConnected ? '' : 'glow-border'}
                    style={{
                        background: walletConnected ? 'var(--bg-card)' : 'var(--primary)',
                        color: walletConnected ? 'var(--text-primary)' : 'black',
                        padding: '8px 18px',
                        borderRadius: '10px',
                        fontWeight: 600,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'var(--transition)'
                    }}
                >
                    <Wallet size={16} />
                    {walletConnected ? '0x71C...4e2' : 'Connect Wallet'}
                </button>

                <div className="glass-pane" style={{ padding: '8px', borderRadius: '10px' }}>
                    <Bell size={18} color="var(--text-secondary)" />
                </div>
            </div>
        </header >
    );
};
