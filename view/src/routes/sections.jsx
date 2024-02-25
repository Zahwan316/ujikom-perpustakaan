import axios from 'axios';
import Cookies from 'js-cookie';
import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate, useLocation } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import AnggotaPage from 'src/pages/anggota';
import BukuPage from 'src/pages/buku';
import KategoriPage from 'src/pages/kategori';
import PeminjamanPage from 'src/pages/peminjaman';
import UlasanPage from 'src/pages/ulasan';
import useUserStore from '../../state/user';
import HomePage from 'src/pages/home';
import RekomendasiPage from 'src/pages/rekomendasi';
import DetailBukuPage from 'src/pages/detailbuku';
import KoleksiPage from 'src/pages/koleksi';
import SettingPage from 'src/pages/settings';
import SearchPage from 'src/pages/search';
import LaporanPage from 'src/pages/laporan';
import LandingPage from 'src/pages/landing-page';
import NotifNewsPage from 'src/pages/notif_news';

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
  const [refuser,setrefuser] = useUserStore((state) => [state.ref_user,state.setrefuser])
  const redirect = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchakun = async() => {
      try{
        if(Object.keys(refuser).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}refuser`)
          setrefuser(res.data.data)
        }
        if(token){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}auth/user/${token}`)
          setuser(res.data.data)
          const data = res.data.data
          /* if(data.access_level === 1){
            redirect("/")
          }
          else if(data.access_level === 2){
            redirect("/buku")
          }
          else if(data.access_level === 3){
            redirect("/home")
          } */
        }
      }
      catch(e){
        console.log(e)
        if(e.response.status === 400){
          Cookies.remove("token")
          navigate("/login")
        }
      }
    }
    fetchakun()
    if(!token && !location.pathname === "/"){
      navigate("/login")
    }
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
        //{ element: <IndexPage />, index: true },
        {path:"dashboard",element:<IndexPage />},
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'anggota', element: <AnggotaPage /> },
        { path: 'kategori', element: <KategoriPage /> },
        { path: 'buku', element: <BukuPage /> },
        { path: 'peminjaman', element: <PeminjamanPage /> },
        { path: 'ulasan', element: <UlasanPage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'rekomendasi', element: <RekomendasiPage /> },
        { path: 'buku/:slug', element: <DetailBukuPage /> },
        { path: 'koleksi', element: <KoleksiPage /> },
        { path: 'setting', element: <SettingPage /> },
        { path: 'laporan', element: <LaporanPage /> },
        { path: 'news', element: <NotifNewsPage /> },
        { path: 'search/:text', element: <SearchPage /> },
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
    {
      path:"/",
      element:<LandingPage />,
      index:true
    }
  ]);

  return routes;
}
