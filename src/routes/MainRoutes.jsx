import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import StockOpenClose from 'pages/price';
import StockScreener from 'pages/dashboard/screener';
import StockPerformanceComparison from 'pages/dashboard/stockPerformance';
import IntradayCrypto from 'pages/dashboard/crypto';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
//const StockScreener = Loadable(lazy(() => import('pages/dashboard/price/index')))
//const StockPerformanceComparison = Loadable(lazy(() => import('pages/dashboard/stockPerformance/index')))

// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: 'price',
          element: <StockOpenClose />
        },
        {
          path: 'screener',
          element: <StockScreener />
        },
        {
          path: 'stock-performance',
          element: <StockPerformanceComparison />
        },
        {
          path: 'crypto',
          element: <IntradayCrypto />
        }
      ]
    },
    // {
    //   path: 'sample-page',
    //   element: <SamplePage />
    // },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
