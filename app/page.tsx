"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { TradingChart } from '@/components/exchange/TradingChart';
import { OrderBook } from '@/components/exchange/OrderBook';
import { TradeForm } from '@/components/exchange/TradeForm';
import { MarketHistory } from '@/components/exchange/MarketHistory';
import { AssetList } from '@/components/exchange/AssetList';
import { UserOrders } from '@/components/exchange/UserOrders';
import { useMockRealtime } from '@/hooks/useMockRealtime';
import { LayoutGrid, BarChart3, ArrowUpDown, History, List } from 'lucide-react';

export default function ExchangePage() {
    useMockRealtime();
    const [mobileTab, setMobileTab] = React.useState<'chart' | 'trade' | 'book' | 'history' | 'markets'>('chart');
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: isMobile ? '0' : '12px', paddingBottom: isMobile ? '70px' : '12px' }}>
            <Header />

            {isMobile ? (
                <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {mobileTab === 'chart' && <TradingChart />}
                    {mobileTab === 'trade' && <TradeForm />}
                    {mobileTab === 'book' && <OrderBook />}
                    {mobileTab === 'history' && <MarketHistory />}
                    {mobileTab === 'markets' && <AssetList />}

                    <div style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '64px',
                        background: 'var(--bg-card)',
                        backdropFilter: 'blur(20px)',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        zIndex: 1000,
                        padding: '0 12px'
                    }}>
                        {[
                            { id: 'markets', icon: List, label: 'Markets' },
                            { id: 'chart', icon: BarChart3, label: 'Chart' },
                            { id: 'trade', icon: ArrowUpDown, label: 'Trade' },
                            { id: 'book', icon: LayoutGrid, label: 'Book' },
                            { id: 'history', icon: History, label: 'Recent' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setMobileTab(tab.id as any)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    color: mobileTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <tab.icon size={20} />
                                <span style={{ fontSize: '10px', fontWeight: 500 }}>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(280px, 300px) 1fr minmax(320px, 340px)',
                    gridTemplateRows: 'minmax(400px, 1fr) 300px',
                    gap: '12px',
                    flex: 1,
                    padding: '0 12px'
                }}>
                    {/* Left Sidebar: Assets */}
                    <div style={{ gridRow: '1 / span 2' }}>
                        <AssetList />
                    </div>

                    {/* Center: Chart */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <TradingChart />
                        <UserOrders />
                    </div>

                    {/* Right Sidebar: OrderBook & TradeForm */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', gridRow: '1 / span 2' }}>
                        <TradeForm />
                        <OrderBook />
                        <div style={{ height: '240px' }}>
                            <MarketHistory />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
