PGDMP         1                 |            perpustakaan    15.4    15.4     !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    320895    perpustakaan    DATABASE     �   CREATE DATABASE perpustakaan WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE perpustakaan;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            %           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    320915    buku    TABLE     �   CREATE TABLE public.buku (
    "bukuID" integer NOT NULL,
    judul character varying(255),
    penulis character varying(255),
    penerbit character varying(255),
    tahun_terbit integer
);
    DROP TABLE public.buku;
       public         heap    postgres    false    4            �            1259    320927    kategoribuku    TABLE     r   CREATE TABLE public.kategoribuku (
    "kategoriID" integer NOT NULL,
    nama_kategori character varying(255)
);
     DROP TABLE public.kategoribuku;
       public         heap    postgres    false    4            �            1259    320932    kategoribuku_relasi    TABLE     �   CREATE TABLE public.kategoribuku_relasi (
    "kategoribukuID" integer NOT NULL,
    "bukuID" integer,
    "kategoriID" integer
);
 '   DROP TABLE public.kategoribuku_relasi;
       public         heap    postgres    false    4            �            1259    320922    koleksipribadi    TABLE     u   CREATE TABLE public.koleksipribadi (
    "koleksiID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer
);
 "   DROP TABLE public.koleksipribadi;
       public         heap    postgres    false    4            �            1259    320896 
   peminjaman    TABLE     �   CREATE TABLE public.peminjaman (
    "peminjamanID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    "tanggalPeminjaman" date,
    "tanggalPengembalian" date,
    "statusPeminjaman" character varying(50)
);
    DROP TABLE public.peminjaman;
       public         heap    postgres    false    4            �            1259    320908 
   ulasanbuku    TABLE     �   CREATE TABLE public.ulasanbuku (
    "ulasanID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    ulasan text,
    rating integer
);
    DROP TABLE public.ulasanbuku;
       public         heap    postgres    false    4            �            1259    320901    user    TABLE        CREATE TABLE public."user" (
    "userID" integer NOT NULL,
    username character varying(255),
    password character varying(255),
    email character varying(255),
    nama_lengkap character varying(255),
    alamat text,
    role character varying
);
    DROP TABLE public."user";
       public         heap    postgres    false    4                      0    320915    buku 
   TABLE DATA           P   COPY public.buku ("bukuID", judul, penulis, penerbit, tahun_terbit) FROM stdin;
    public          postgres    false    217   �                 0    320927    kategoribuku 
   TABLE DATA           C   COPY public.kategoribuku ("kategoriID", nama_kategori) FROM stdin;
    public          postgres    false    219                    0    320932    kategoribuku_relasi 
   TABLE DATA           W   COPY public.kategoribuku_relasi ("kategoribukuID", "bukuID", "kategoriID") FROM stdin;
    public          postgres    false    220   a                 0    320922    koleksipribadi 
   TABLE DATA           I   COPY public.koleksipribadi ("koleksiID", "userID", "bukuID") FROM stdin;
    public          postgres    false    218   ~                 0    320896 
   peminjaman 
   TABLE DATA           �   COPY public.peminjaman ("peminjamanID", "userID", "bukuID", "tanggalPeminjaman", "tanggalPengembalian", "statusPeminjaman") FROM stdin;
    public          postgres    false    214   �                 0    320908 
   ulasanbuku 
   TABLE DATA           T   COPY public.ulasanbuku ("ulasanID", "userID", "bukuID", ulasan, rating) FROM stdin;
    public          postgres    false    216   �                 0    320901    user 
   TABLE DATA           a   COPY public."user" ("userID", username, password, email, nama_lengkap, alamat, role) FROM stdin;
    public          postgres    false    215   �       �           2606    320921    buku buku_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY ("bukuID");
 8   ALTER TABLE ONLY public.buku DROP CONSTRAINT buku_pkey;
       public            postgres    false    217            �           2606    320931    kategoribuku kategoribuku_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.kategoribuku
    ADD CONSTRAINT kategoribuku_pkey PRIMARY KEY ("kategoriID");
 H   ALTER TABLE ONLY public.kategoribuku DROP CONSTRAINT kategoribuku_pkey;
       public            postgres    false    219            �           2606    320936 ,   kategoribuku_relasi kategoribuku_relasi_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.kategoribuku_relasi
    ADD CONSTRAINT kategoribuku_relasi_pkey PRIMARY KEY ("kategoribukuID");
 V   ALTER TABLE ONLY public.kategoribuku_relasi DROP CONSTRAINT kategoribuku_relasi_pkey;
       public            postgres    false    220            �           2606    320926 "   koleksipribadi koleksipribadi_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.koleksipribadi
    ADD CONSTRAINT koleksipribadi_pkey PRIMARY KEY ("koleksiID");
 L   ALTER TABLE ONLY public.koleksipribadi DROP CONSTRAINT koleksipribadi_pkey;
       public            postgres    false    218            }           2606    320900    peminjaman peminjaman_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_pkey PRIMARY KEY ("peminjamanID");
 D   ALTER TABLE ONLY public.peminjaman DROP CONSTRAINT peminjaman_pkey;
       public            postgres    false    214            �           2606    320914    ulasanbuku ulasanbuku_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.ulasanbuku
    ADD CONSTRAINT ulasanbuku_pkey PRIMARY KEY ("ulasanID");
 D   ALTER TABLE ONLY public.ulasanbuku DROP CONSTRAINT ulasanbuku_pkey;
       public            postgres    false    216                       2606    320907    user user_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userID");
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    215               {   x�372�034��HU��I�+Q�ML-.)�����-U��,I��tS� 3����LM͌�8}K2Rs�DfrbP[YjQfr6.}�\�f�Ɩ�f�>��@[2�JKR��R2��*q����� �~2U         9   x�3247�00���2330165 1--��9s�Rs2�KsR�<�=... G�$            x������ � �            x������ � �            x������ � �         7   x��07�421����������ܢTNc.#ScS#sL9��4 *����� s0K         �   x�323�0172�,ή��T1JR14PI̭����t��p�M/*3��.-�,rJ��/KM���2��K��5�Ou�
sq�4�ή�qH�M���K���)M�S(-����J��s�Rs2�Ks9Sr3�b���� T0)f     