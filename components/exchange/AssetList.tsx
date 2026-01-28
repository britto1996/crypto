"use client";

import React from 'react';
import { useExchangeStore } from '@/store/useExchangeStore';
import { Search } from 'lucide-react';

export const AssetList = () => {
    const { assets, selectedAsset, setSelectedAsset } = useExchangeStore();

    return (
        <div className="glass-pane" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Markets</h3>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                }}>
                    <Search size={14} color="var(--text-secondary)" />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '13px', width: '100%' }}
                    />
                </div>
            </div>

            <div style={{ padding: '8px 16px', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                <span>Asset</span>
                <span style={{ textAlign: 'right' }}>Price</span>
                <span style={{ textAlign: 'right' }}>Change</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {assets.map((asset) => (
                    <div
                        key={asset.symbol}
                        onClick={() => setSelectedAsset(asset)}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1.5fr 1fr 1fr',
                            padding: '12px 16px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            background: selectedAsset.symbol === asset.symbol ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                            transition: 'var(--transition)'
                        }}
                        className="asset-row"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600 }}>{asset.symbol}</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{asset.name}</span>
                        </div>
                        <span className="mono" style={{ textAlign: 'right', fontWeight: 500 }}>
                            {asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.price < 10 ? 4 : 2 })}
                        </span>
                        <span className={asset.change24h >= 0 ? 'price-up mono' : 'price-down mono'} style={{ textAlign: 'right', fontSize: '12px' }}>
                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
