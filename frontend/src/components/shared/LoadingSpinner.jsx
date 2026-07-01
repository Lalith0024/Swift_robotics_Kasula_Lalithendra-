import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 24, className = '' }) {
  return (
    <div className={`flex justify-center items-center ${className}`} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Loader2 size={size} className="animate-spin" color="var(--color-primary)" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
