import { memo } from 'react';
import { VeloxLogoLoader } from '@/components/velox-loader/velox-loader';

export const SuspenseFallback = memo(() => (
  <div
    style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      zIndex: 9999,
    }}
  >
    <VeloxLogoLoader />
  </div>
));

export const InlineSuspenseFallback = memo(() => (
  <div
    style={{
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
    }}
  >
    <VeloxLogoLoader />
  </div>
));

SuspenseFallback.displayName = 'SuspenseFallback';
InlineSuspenseFallback.displayName = 'InlineSuspenseFallback';