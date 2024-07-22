import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

import * as dotenv from 'dotenv';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {

  // console.log(process.env.REACT_APP_FINANCIAL_MODELING_PREP);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}
