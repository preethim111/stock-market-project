// assets
import { DashboardOutlined } from '@ant-design/icons';
import { AttachMoney, FilterAlt } from '@mui/icons-material';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
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
    }, 
    {
      id: 'performance',
      title: 'Performance Comparison',
      type: 'item',
      url: '/dashboard/stock-performance',
      icon: StackedLineChartIcon,
      breadcrumbs: false

    },
    {
      id: 'crypto',
      title: 'Intraday Cryptocurrency',
      type: 'item',
      url: '/dashboard/crypto',
      icon: CurrencyBitcoinIcon,
      breadcrumbs: false
    }

  ]
};

export default dashboard;
