# Perpustakaan Online dengan Peminjaman Offline

Proyek ini adalah sebuah aplikasi perpustakaan online yang memungkinkan pengguna untuk melakukan peminjaman buku secara online dan juga peminjaman buku secara offline di perpustakaan fisik.

## Fitur

- Pendaftaran pengguna baru dan login.
- Penelusuran dan penampilan daftar buku yang tersedia.
- Peminjaman buku secara online.
- Riwayat peminjaman dan pemesanan buku.
- Kelola stok buku dan data anggota perpustakaan.

## Teknologi yang Digunakan

- React Vite untuk front-end.
- Express.js untuk back-end.
- Postgre sebagai database.
- Zustand untuk manajemen state di front-end.
- JWT untuk otentikasi pengguna.

## Instalasi

1. Clone repositori ini ke perangkat lokal Anda.
2. Buka terminal dan navigasikan ke direktori proyek.
3. Untuk front-end (React Vite):
    ```bash
    cd view
    npm install
    ```
4. Untuk back-end (Express.js):
    ```bash
    cd api
    npm install
    ```

## Konfigurasi

- Pastikan untuk mengkonfigurasi variabel lingkungan yang diperlukan di file `.env` di direktori server, seperti URL database Postgre dan kunci JWT.

## Penggunaan

1. Mulai server Express.js:
    ```bash
    cd api
    node app or nodemon app //if using nodemon
    ```
2. Mulai aplikasi React.js:
    ```bash
    cd view
    npm run dev
    ```

Aplikasi akan diakses di `http://localhost:3030` secara default.
Api berjalan `http://localhost:3008`

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan buat *fork* dari repositori ini, lakukan perubahan Anda, dan buat *pull request* ke repositori utama.

