import axios from 'axios';
import Cookies from 'js-cookie';
import { lazy, Suspense } from 'react';
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

import KoleksiPage from 'src/pages/koleksi';
import SettingPage from 'src/pages/settings';
import SearchPage from 'src/pages/search';
import LaporanPage from 'src/pages/laporan';

import NotifNewsPage from 'src/pages/notif_news';
import IndexUserPage from 'src/pages';
import KategoriIndexPage from 'src/pages/kategoriindex';
import SelectedKategori from 'src/pages/selectedkategori';
import BukuIndexPage from 'src/pages/bukuindex';
import ReadPage from 'src/pages/read';
import useItemStore from '../../state/item';
import {v4 as uuidv4} from "uuid"
import React, { useState, useEffect } from 'react';
import PerpusPage from 'src/pages/perpus';
import SampahBukuPage from 'src/pages/sampahbuku';


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
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState(false)

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    return `${year}-${month}-${day}`;
  };

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
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(peminjaman).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
          setpeminjaman(res.data.data)
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
    if(!token && location.pathname === "/"){
      navigate("/")
    }
    
  },[])

  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);
    const returnBook = async() => {
      try{
        peminjaman.map(async(item) => {
          if(item.tanggal_pengembalian == formattedCurrentDate && item.status_peminjaman === 1) {
            let res = await axios.put(`${import.meta.env.VITE_APP_URL_API}peminjaman/${item.peminjamanID}`,{status_peminjaman:2})
            setupdater(uuidv4())
            setisload(true)
            setTimeout(() => {
              setisload(false)
            }, 500);
          }
        }
        )
      }
      catch(e){
        console.log(e)
      }
    }
    returnBook()
  },[buku])

  useEffect(() => {
    const refetchData = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
        setpeminjaman(res.data.data)
      }
      catch(e){
        console.log(e)
      }
    }
    if(isload){
      refetchData()
    }
  },[updater])

  useEffect(() => {
 
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
        {path:"dashboard",element:<IndexPage />},
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'admin/anggota', element: <AnggotaPage /> },
        { path: 'admin/kategori', element: <KategoriPage /> },
        { path: 'buku', element: <BukuPage /> },
        { path: 'peminjaman', element: <PeminjamanPage /> },
        { path: 'admin/ulasan', element: <UlasanPage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'rekomendasi', element: <RekomendasiPage /> },
        { path: 'admin/perpus', element: <PerpusPage /> },
        { path: 'sampahbuku', element: <SampahBukuPage /> },
        { path: 'koleksi', element: <KoleksiPage /> },
        { path: 'setting', element: <SettingPage /> },
        { path: 'laporan', element: <LaporanPage /> },
        { path: 'news', element: <NotifNewsPage /> },
        
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
      element:<IndexUserPage />,
      index:true
    },
    {
      path:"/kategori",
      element:<KategoriIndexPage />,
    },
    {
      path:"/kategori/:kategoriname",
      element:<SelectedKategori />
    },
    { path: 'buku/:slug', element: <BukuIndexPage /> },
    { path: 'search/:text', element: <SearchPage /> },
    {
      path:"read/:slug",
      element:<ReadPage />
    }
  ]);

  return routes;
}
