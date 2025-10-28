import { redirect } from 'next/navigation';

import LoginForm from './LoginForm';

const LoginPage = async () => {
  const { cookies } = await import('next/headers');
  const isAuthenticated = (await cookies()).get('isAuthenticated')?.value;
  if (isAuthenticated) redirect('/');
  return <LoginForm />;
};

export default LoginPage;
