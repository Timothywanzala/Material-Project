import { lazy, Suspense } from 'react';
import { Outlet,  useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const NotificationPage = lazy(() => import('src/pages/notifications'));
export const RegisterPage = lazy(() => import('src/pages/registration'));
export const ReportPage = lazy(() => import('src/pages/report'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'notification', element: <NotificationPage /> },
        { path: 'registration', element: <RegisterPage /> },
        { path: 'report', element: <ReportPage /> },
      ]
    },
    {
      path: 'login',
      element: <LoginPage />,
    }
    
  ]);

  return routes;
}
