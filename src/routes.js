import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import HomeView from 'src/views/home/HomeView';
import AboutUsView from 'src/views/about/AboutUsView';
import DashboardView from 'src/views/dashboard/DashboardView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <HomeView /> },
      { path: 'about', element: <AboutUsView /> },
      { path: 'dashboard', element: <DashboardView />}
    ]
  }
];

export default routes;
