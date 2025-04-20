import Landing from './pages/Landing';
import NotFound from './pages/Notfound';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Chat from './pages/Chat';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const AppLayout = () => (
  <div className="App">
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Landing /> }, // Landing Page
      { path: "/signup", element: <Signup /> }, // Sign up page
      { path: "/signin", element: <Signin /> }, // Sign in page
      { path: "/chat", element: <Chat /> }, // Chat page
      { path: "*", element: <NotFound /> },   // 404 page
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
