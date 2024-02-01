import axios from 'axios';
import Cookies from 'js-cookie';
import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import AnggotaPage from 'src/pages/anggota';
import BukuPage from 'src/pages/buku';
import KategoriPage from 'src/pages/kategori';
import PeminjamanPage from 'src/pages/peminjaman';
import UlasanPage from 'src/pages/ulasan';
import useUserStore from '../../state/user';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const token = Cookies.get("token")
  const navigate = useNavigate()
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])

  useEffect(() => {
    const fetchakun = async() => {
      try{
        if(token){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}auth/user/${token}`)
          setuser(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchakun()
    if(!token){
      navigate("/login")
    }
  },[])

  useEffect(() => {
    console.log(user)
  })

  const routes = useRoutes([
    {
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
        { path: 'anggota', element: <AnggotaPage /> },
        { path: 'kategori', element: <KategoriPage /> },
        { path: 'buku', element: <BukuPage /> },
        { path: 'peminjaman', element: <PeminjamanPage /> },
        { path: 'ulasan', element: <UlasanPage /> },
        { path: 'uome', element: <UlasanPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
