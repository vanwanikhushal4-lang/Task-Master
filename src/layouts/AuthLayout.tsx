import { Outlet, useLocation } from 'react-router-dom';

import { Layout } from '@/shared/antd-imports';
import { useTranslation } from 'react-i18next';
import { VELOX_EMBLEM } from '@/shared/constants';

// These pages already show their own centered VeloxLogoLoader while they
// redirect, so the layout's fixed top-left logo would double up with it.
const ROUTES_WITHOUT_FIXED_LOGO = ['/auth/authenticating', '/auth/logging-out'];

const AuthLayout = () => {
  const { t } = useTranslation('navbar');
  const location = useLocation();
  const showFixedLogo = !ROUTES_WITHOUT_FIXED_LOGO.includes(location.pathname);

  return (
    <Layout
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '56px 20px',
        position: 'relative',
      }}
    >
      {showFixedLogo && (
        <img
          src={VELOX_EMBLEM}
          alt={t('logoAlt', { defaultValue: 'Velox Logo' })}
          style={{
            position: 'fixed',
            top: 24,
            left: 28,
            height: 28,
            width: 'auto',
            zIndex: 2,
          }}
        />
      )}
      <div style={{ maxWidth: 400, width: '100%' }}>
        <Outlet />
      </div>
    </Layout>
  );
};

export default AuthLayout;
