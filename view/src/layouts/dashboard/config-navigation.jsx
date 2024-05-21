import SvgColor from 'src/components/svg-color';
import React from "react"
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    level:[0,1],
  },
 
  {
    title: 'pengguna',
    path: '/admin/anggota',
    icon: icon('ic_user'),
    level:[0,1],
  },
  {
    title: 'Perpustakaan',
    path: '/admin/perpus',
    icon: icon('perpus'),
    level:[0]
  },
  {
    title: 'buku',
    path: '/buku',
    icon: icon('book-solid'),
    level:[0,1,2]
  },
  {
    title: 'kategori',
    path: '/admin/kategori',
    icon: icon('list-solid'),
    level:[0,1]
  },
  {
    title: 'peminjaman',
    path: '/peminjaman',
    icon: icon('exchange'),
    level:[0,1,2,3]
  },
  {
    title: 'ulasan',
    path: '/admin/ulasan',
    icon: icon('comment-solid'),
    level:[0,1]
  },
  
  {
    title: 'Favorit',
    path: '/koleksi',
    icon: icon('star-solid'),
    level:[0,3]
  },
  {
    title: 'Laporan',
    path: '/laporan',
    icon: icon('file-solid'),
    level:[0,1,2]
  },
  
];

export default navConfig;
