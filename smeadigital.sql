# Converted with pg2mysql-1.9
# Converted on Tue, 21 May 2024 02:25:20 -0400
# Lightbox Technologies Inc. http://www.lightbox.ca

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone="+00:00";

CREATE TABLE rplsma09_smeadigital.buku (
    `bukuID` int(11) NOT NULL,
    judul varchar(255),
    penulis varchar(255),
    penerbit varchar(255),
    perpus_id int(11),
    tahun_terbit date,
    kategori_id int(11),
    created_date timestamp DEFAULT CURRENT_TIMESTAMP,
    img varchar(255),
    sinopsis varchar(255),
    slug varchar(255),
    stok int(11),
    isi_buku varchar(255),
    durasi_buku int(11),
    soft_delete int(11)
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.kategoribuku (
    `kategoriID` int(11) NOT NULL,
    nama_kategori varchar(255),
    created_date timestamp DEFAULT CURRENT_TIMESTAMP,
    img varchar(255)
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.koleksipribadi (
    `koleksiID` int(11) NOT NULL,
    `userID` int(11),
    `bukuID` int(11),
    created_date timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.message (
    message_id int(11) NOT NULL,
    text varchar(255),
    created_date timestamp DEFAULT CURRENT_TIMESTAMP,
    title varchar(255)
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.peminjaman (
    `peminjamanID` int(11) NOT NULL,
    `userID` int(11),
    `bukuID` int(11),
    tanggal_peminjaman date,
    tanggal_pengembalian date,
    perpus_id int(11),
    created_date timestamp DEFAULT CURRENT_TIMESTAMP,
    status_peminjaman int(11)
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.perpus (
    perpus_id int(11) NOT NULL,
    nama_perpus varchar(255),
    alamat varchar(255),
    no_hp varchar(255),
    created_date timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_date timestamp
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.ulasanbuku (
    `ulasanID` int(11) NOT NULL,
    `userID` int(11),
    `bukuID` int(11),
    ulasan text,
    rating int(11),
    created_date timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.`user` (
    `userID` int(11) NOT NULL,
    username varchar(255),
    password varchar(255),
    email varchar(255),
    nama_lengkap varchar(255),
    alamat text,
    perpus_id int(11),
    no_hp varchar(255),
    created_date timestamp DEFAULT CURRENT_TIMESTAMP,
    access_level int(11),
    img varchar(255)
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.ref_peminjaman (
    ref_peminjaman_id int(11) NOT NULL,
    nama varchar(255),
    create_date timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;

CREATE TABLE rplsma09_smeadigital.ref_user (
    nama varchar(255) NOT NULL,
    create_date timestamp DEFAULT CURRENT_TIMESTAMP,
    user_ref_id int(11)
) ENGINE=MyISAM;

ALTER TABLE rplsma09_smeadigital.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY ("bukuID");
ALTER TABLE rplsma09_smeadigital.kategoribuku
    ADD CONSTRAINT kategoribuku_pkey PRIMARY KEY ("kategoriID");
ALTER TABLE rplsma09_smeadigital.koleksipribadi
    ADD CONSTRAINT koleksipribadi_pkey PRIMARY KEY ("koleksiID");
ALTER TABLE rplsma09_smeadigital.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);
ALTER TABLE rplsma09_smeadigital.peminjaman
    ADD CONSTRAINT peminjaman_pkey PRIMARY KEY ("peminjamanID");
ALTER TABLE rplsma09_smeadigital.perpus
    ADD CONSTRAINT perpus_pkey PRIMARY KEY (perpus_id);
ALTER TABLE rplsma09_smeadigital.ulasanbuku
    ADD CONSTRAINT ulasanbuku_pkey PRIMARY KEY ("ulasanID");
ALTER TABLE rplsma09_smeadigital.`user`
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userID");
ALTER TABLE rplsma09_smeadigitalf.ref_peminjaman
    ADD CONSTRAINT ref_peminjaman_pkey PRIMARY KEY (ref_peminjaman_id);
ALTER TABLE rplsma09_smeadigital.ref_user
    ADD CONSTRAINT ref_user_pkey PRIMARY KEY (nama);
