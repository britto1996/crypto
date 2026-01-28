"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
}

export const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
                position: 'fixed',
                bottom: '80px',
                right: '24px',
                zIndex: 2000,
                background: 'var(--bg-card)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${type === 'success' ? 'var(--success)' : 'var(--danger)'}`,
                borderRadius: '12px',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${type === 'success' ? 'rgba(0, 255, 189, 0.1)' : 'rgba(255, 77, 77, 0.1)'}`,
            }}
        >
            {type === 'success' ? <CheckCircle2 color="var(--success)" size={20} /> : <AlertCircle color="var(--danger)" size={20} />}
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{message}</span>
        </motion.div>
    );
};
