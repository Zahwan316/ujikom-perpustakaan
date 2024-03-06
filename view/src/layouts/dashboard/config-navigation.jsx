import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    level:[1],
  },
  /* {
    title: 'home',
    path: '/home',
    icon: icon('house-solid'),
    level:[3]
  }, */
  {
    title: 'pengguna',
    path: '/admin/anggota',
    icon: icon('ic_user'),
    level:[1],
  },
  {
    title: 'Perpustakaan',
    path: '/admin/perpus',
    icon: icon('perpus'),
    level:[1]
  },
  {
    title: 'buku',
    path: '/buku',
    icon: icon('book-solid'),
    level:[1,2]
  },
  {
    title: 'kategori',
    path: '/admin/kategori',
    icon: icon('list-solid'),
    level:[1]
  },
  {
    title: 'peminjaman',
    path: '/peminjaman',
    icon: icon('exchange'),
    level:[1,2,3]
  },
  {
    title: 'ulasan',
    path: '/admin/ulasan',
    icon: icon('comment-solid'),
    level:[1]
  },
  
  {
    title: 'Favorit',
    path: '/koleksi',
    icon: icon('star-solid'),
    level:[3]
  },
  {
    title: 'Laporan',
    path: '/laporan',
    icon: icon('file-solid'),
    level:[1,2]
  },
  
];

export default navConfig;
