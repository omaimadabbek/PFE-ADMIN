import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Categories from './content/pages/Categories';
import Commandes from 'src/content/pages/Commandes/index';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//register
const Register = Loader(
  lazy(() => import('src/content/overview/Login/Register'))
);

// Pages
const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards
const Admin = Loader(lazy(() => import('src/content/pages/Admin/index')));

const Produits = Loader(lazy(() => import('src/content/pages/Produits/index')));

const Historique = Loader(
  lazy(() => import('src/content/pages/Commandes/index'))
);

// Dashboards

const Stats = Loader(lazy(() => import('src/content/dashboards/Stats')));




const routes: RouteObject[] = [
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="Admin" replace />
      },
      {
        path: 'stats',
        element: <Stats />
      },
      {
        path: 'Admin',
        element: <Admin />
      },

      {
        path: 'produits',
        element: <Produits />
      },
      {
        path: 'Categories',
        element: <Categories />
      },
      {
        path: 'commandes',
        element: <Commandes />
      }
    ]
  },
  {
    path: '',
    element: <Navigate to="dashboards/Admin" replace />
  }
];

export default routes;
