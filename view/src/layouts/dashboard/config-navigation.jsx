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
  },
  {
    title: 'anggota',
    path: '/anggota',
    icon: icon('ic_user'),
  },
  {
    title: 'buku',
    path: '/buku',
    icon: icon('ic_cart'),
  },
  {
    title: 'penerbit',
    path: '/penerbit',
    icon: icon('ic_blog'),
  },
  {
    title: 'peminjaman',
    path: '/peminjaman',
    icon: icon('ic_blog'),
  },
  {
    title: 'ulasan',
    path: '/ulasan',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
