import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { VELOX_EMBLEM } from '@/shared/constants';

const NavbarLogo = () => {
  const { t } = useTranslation('navbar');

  return (
    <Link to={'/velox/home'}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src={VELOX_EMBLEM}
          alt={t('logoAlt', { defaultValue: 'Velox Logo' })}
          style={{ display: 'block', height: 26 }}
        />
      </div>
    </Link>
  );
};

export default NavbarLogo;
