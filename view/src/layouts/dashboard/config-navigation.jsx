import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
    level:[1],
  },
  {
    title: 'home',
    path: '/home',
    icon: icon('ic_blog'),
    level:[3]
  },
  {
    title: 'anggota',
    path: '/anggota',
    icon: icon('ic_user'),
    level:[1],
  },
  {
    title: 'buku',
    path: '/buku',
    icon: icon('ic_cart'),
    level:[1,2]
  },
  {
    title: 'kategori',
    path: '/kategori',
    icon: icon('ic_blog'),
    level:[1]
  },
  {
    title: 'peminjaman',
    path: '/peminjaman',
    icon: icon('ic_blog'),
    level:[1,2,3]
  },
  {
    title: 'ulasan',
    path: '/ulasan',
    icon: icon('ic_blog'),
    level:[1,3]
  },
  
  {
    title: 'Bookmark',
    path: '/Bookmark',
    icon: icon('ic_blog'),
    level:[3]
  },
  
];

export default navConfig;
