import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

const formatDate = (dateString) => {
  const date = new Date(dateString); // Ubah string tanggal menjadi objek Date
  const year = date.getFullYear(); // Ambil tahun
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ambil bulan
  const day = date.getDate().toString().padStart(2, '0'); // Ambil tanggal
  const hours = date.getHours().toString().padStart(2, '0'); // Ambil jam
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Ambil menit
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Ambil detik

  // Bentuk kembali string dengan format yang diinginkan
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        includeSeconds: true
      })
    : '';
}
