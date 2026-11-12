import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

import { VELOX_EMBLEM } from '@/shared/constants';

const NavbarLogo = () => {
  const { t } = useTranslation('navbar');
  const organization = useSelector((state: RootState) => state.adminCenterReducer.organization);
  const loadingOrganization = useSelector(
    (state: RootState) => state.adminCenterReducer.loadingOrganization
  );

  const logoSrc = useMemo(() => {
    // If API logo is available, save to localStorage and use it
    if (organization?.logo_url) {
      localStorage.setItem('organizationLogo', organization.logo_url);
      return organization.logo_url;
    }

    // Organization has loaded but has no logo — clear cache and use default
    if (organization !== null && !loadingOrganization) {
      localStorage.removeItem('organizationLogo');
      return VELOX_EMBLEM;
    }

    // Organization not yet loaded — use cached logo to avoid flash
    const cachedLogo = localStorage.getItem('organizationLogo');
    if (cachedLogo) return cachedLogo;

    return VELOX_EMBLEM;
  }, [organization, loadingOrganization]);

  return (
    <Link to={'/velox/home'}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: 44 }}>
        <img
          src={logoSrc}
          alt={t('logoAlt', { defaultValue: 'Velox Logo' })}
          style={{
            height: 26,
            maxHeight: 44,
            maxWidth: 140,
            display: 'block',
            objectFit: 'contain',
          }}
          onError={e => {
            // Fallback to default logo on error
            const target = e.target as HTMLImageElement;
            if (target.getAttribute('src') !== VELOX_EMBLEM) target.src = VELOX_EMBLEM;
          }}
        />
      </div>
    </Link>
  );
};

export default NavbarLogo;
