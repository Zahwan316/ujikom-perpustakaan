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
  {
    title: 'home',
    path: '/home',
    icon: icon('house-solid'),
    level:[3]
  },
  {
    title: 'pengguna',
    path: '/anggota',
    icon: icon('ic_user'),
    level:[1],
  },
  {
    title: 'buku',
    path: '/buku',
    icon: icon('book-solid'),
    level:[1,2]
  },
  {
    title: 'kategori',
    path: '/kategori',
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
    path: '/ulasan',
    icon: icon('comment-solid'),
    level:[1,3]
  },
  {
    title: 'Koleksi',
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
