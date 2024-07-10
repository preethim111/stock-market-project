// assets
import { DashboardOutlined } from '@ant-design/icons';
import { AttachMoney, FilterAlt } from '@mui/icons-material';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'price',
      title: 'Open/Close Stock Prices',
      type: 'item',
      url: '/dashboard/price',
      icon: AttachMoney,
      breadcrumbs: false
    },
    {
      id: 'screener',
      title: 'Stock Screener',
      type: 'item',
      url: '/dashboard/screener',
      icon: FilterAlt,
      breadcrumbs: false
    }

  ]
};

export default dashboard;
