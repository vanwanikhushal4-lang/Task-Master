import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AuthPageHeader from '@components/AuthPageHeader';
import { login, verifyAuthentication } from '@/features/auth/authSlice';
import { setUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useDocumentTitle } from '@/hooks/useDoumentTItle';
import { Alert, Button, Form, Input } from '@/shared/antd-imports';
import { getDefaultAuthenticatedPath } from '@/utils/guest-session';
import { setSession } from '@/utils/session-helper';

import './employee-login.css';

interface EmployeeLoginValues {
  employeeId: string;
  password: string;
}

const EmployeeLoginPage: FC = () => {
  const { t } = useTranslation('auth/login');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const title = t('employeeId.signIn', { defaultValue: 'Sign in' });
  useDocumentTitle(title);

  useEffect(() => {
    let cancelled = false;
    void dispatch(verifyAuthentication()).unwrap().then(session => {
      if (!cancelled && !hasSubmitted.current && session.authenticated) {
        setSession(session.user);
        dispatch(setUser(session.user));
        navigate(getDefaultAuthenticatedPath(session.user), { replace: true });
      }
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [dispatch, navigate]);

  const submit = async (values: EmployeeLoginValues) => {
    if (pending) return;
    hasSubmitted.current = true;
    setPending(true);
    setError(false);
    try {
      const result = await dispatch(login(values)).unwrap();
      dispatch(setUser(result.user));
      navigate(getDefaultAuthenticatedPath(result.user), { replace: true });
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="employee-login">
      <AuthPageHeader title={title} description={t('headerDescription', { defaultValue: 'Log in to your Velox workspace.' })} />
      <Form<EmployeeLoginValues> layout="vertical" requiredMark={false} onFinish={submit}>
        <Form.Item
          className="employee-login__field"
          name="employeeId"
          label={t('employeeId.label', { defaultValue: 'Employee ID' })}
          rules={[{ required: true, whitespace: true, message: t('employeeId.required', { defaultValue: 'Enter your Employee ID.' }) }]}
        >
          <Input size="large" autoComplete="username" inputMode="numeric" maxLength={32} />
        </Form.Item>
        <Form.Item
          className="employee-login__field"
          name="password"
          label={t('passwordLabel', { defaultValue: 'Password' })}
          rules={[{ required: true, message: t('passwordRequired', { defaultValue: 'Enter your password.' }) }]}
        >
          <Input.Password size="large" autoComplete="current-password" maxLength={72} />
        </Form.Item>
        {error && (
          <Alert
            className="employee-login__error"
            type="error"
            showIcon
            message={t('employeeId.invalid', { defaultValue: 'Sign-in failed. Check your Employee ID and password.' })}
          />
        )}
        <Button className="employee-login__submit" type="primary" htmlType="submit" size="large" block loading={pending}>
          {title}
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeLoginPage;
