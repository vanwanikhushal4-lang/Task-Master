import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { VELOX_EMBLEM } from '@/shared/constants';

import './velox-loader.css';

export const VeloxLogoLoader = memo(() => {
  const { t } = useTranslation('common');
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibility = () => {
      loader.current?.toggleAttribute('data-paused', document.hidden);
    };

    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  return (
    <div
      ref={loader}
      className="velox-loader"
      role="status"
      aria-label={t('loadingData', { defaultValue: 'Loading data...' })}
    >
      <div className="velox-loader__orbit" aria-hidden="true">
        <img className="velox-loader__echo" src={VELOX_EMBLEM} alt="" />
        <img className="velox-loader__emblem" src={VELOX_EMBLEM} alt="" />
      </div>
    </div>
  );
});
