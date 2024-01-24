PGDMP     4    '                 |            perpustakaan    15.4    15.4      9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            <           1262    320895    perpustakaan    DATABASE     �   CREATE DATABASE perpustakaan WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE perpustakaan;
                postgres    false                        2615    329209    ref    SCHEMA        CREATE SCHEMA ref;
    DROP SCHEMA ref;
                postgres    false            �            1259    320915    buku    TABLE     *  CREATE TABLE public.buku (
    "bukuID" integer NOT NULL,
    judul character varying(255),
    penulis character varying(255),
    penerbit character varying(255),
    perpus_id integer,
    tahun_terbit date,
    kategori_id integer,
    created_date timestamp without time zone DEFAULT now()
);
    DROP TABLE public.buku;
       public         heap    postgres    false            �            1259    320927    kategoribuku    TABLE     �   CREATE TABLE public.kategoribuku (
    "kategoriID" integer NOT NULL,
    nama_kategori character varying(255),
    created_date timestamp without time zone DEFAULT now()
);
     DROP TABLE public.kategoribuku;
       public         heap    postgres    false            �            1259    320922    koleksipribadi    TABLE     �   CREATE TABLE public.koleksipribadi (
    "koleksiID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    created_date timestamp without time zone DEFAULT now()
);
 "   DROP TABLE public.koleksipribadi;
       public         heap    postgres    false            �            1259    320896 
   peminjaman    TABLE     3  CREATE TABLE public.peminjaman (
    "peminjamanID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    "tanggalPeminjaman" date,
    "tanggalPengembalian" date,
    "statusPeminjaman" character varying(50),
    perpus_id integer,
    created_date timestamp without time zone DEFAULT now()
);
    DROP TABLE public.peminjaman;
       public         heap    postgres    false            �            1259    329146    peminjaman_detail    TABLE     �   CREATE TABLE public.peminjaman_detail (
    peminjaman_detail_id integer NOT NULL,
    peminjaman_id integer,
    buku_id integer,
    created_date timestamp without time zone DEFAULT now()
);
 %   DROP TABLE public.peminjaman_detail;
       public         heap    postgres    false            �            1259    329138    perpus    TABLE       CREATE TABLE public.perpus (
    perpus_id integer NOT NULL,
    nama_perpus character varying,
    alamat character varying,
    no_hp character varying,
    created_date timestamp without time zone DEFAULT now(),
    updated_date timestamp without time zone
);
    DROP TABLE public.perpus;
       public         heap    postgres    false            �            1259    320908 
   ulasanbuku    TABLE     �   CREATE TABLE public.ulasanbuku (
    "ulasanID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    ulasan text,
    rating integer,
    created_date timestamp without time zone DEFAULT now()
);
    DROP TABLE public.ulasanbuku;
       public         heap    postgres    false            �            1259    320901    user    TABLE     n  CREATE TABLE public."user" (
    "userID" integer NOT NULL,
    username character varying(255),
    password character varying(255),
    email character varying(255),
    nama_lengkap character varying(255),
    alamat text,
    perpus_id integer,
    no_hp character varying,
    created_date timestamp without time zone DEFAULT now(),
    access_level integer
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    329210    ref_user    TABLE     �   CREATE TABLE ref.ref_user (
    nama character varying NOT NULL,
    create_date timestamp without time zone DEFAULT now(),
    user_ref_id integer
);
    DROP TABLE ref.ref_user;
       ref         heap    postgres    false    6            1          0    320915    buku 
   TABLE DATA           v   COPY public.buku ("bukuID", judul, penulis, penerbit, perpus_id, tahun_terbit, kategori_id, created_date) FROM stdin;
    public          postgres    false    218   0&       3          0    320927    kategoribuku 
   TABLE DATA           Q   COPY public.kategoribuku ("kategoriID", nama_kategori, created_date) FROM stdin;
    public          postgres    false    220   �&       2          0    320922    koleksipribadi 
   TABLE DATA           W   COPY public.koleksipribadi ("koleksiID", "userID", "bukuID", created_date) FROM stdin;
    public          postgres    false    219   7'       .          0    320896 
   peminjaman 
   TABLE DATA           �   COPY public.peminjaman ("peminjamanID", "userID", "bukuID", "tanggalPeminjaman", "tanggalPengembalian", "statusPeminjaman", perpus_id, created_date) FROM stdin;
    public          postgres    false    215   T'       5          0    329146    peminjaman_detail 
   TABLE DATA           g   COPY public.peminjaman_detail (peminjaman_detail_id, peminjaman_id, buku_id, created_date) FROM stdin;
    public          postgres    false    222   q'       4          0    329138    perpus 
   TABLE DATA           c   COPY public.perpus (perpus_id, nama_perpus, alamat, no_hp, created_date, updated_date) FROM stdin;
    public          postgres    false    221   �'       0          0    320908 
   ulasanbuku 
   TABLE DATA           b   COPY public.ulasanbuku ("ulasanID", "userID", "bukuID", ulasan, rating, created_date) FROM stdin;
    public          postgres    false    217   (       /          0    320901    user 
   TABLE DATA           �   COPY public."user" ("userID", username, password, email, nama_lengkap, alamat, perpus_id, no_hp, created_date, access_level) FROM stdin;
    public          postgres    false    216   f(       6          0    329210    ref_user 
   TABLE DATA           ?   COPY ref.ref_user (nama, create_date, user_ref_id) FROM stdin;
    ref          postgres    false    223   )       �           2606    320921    buku buku_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY ("bukuID");
 8   ALTER TABLE ONLY public.buku DROP CONSTRAINT buku_pkey;
       public            postgres    false    218            �           2606    320931    kategoribuku kategoribuku_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.kategoribuku
    ADD CONSTRAINT kategoribuku_pkey PRIMARY KEY ("kategoriID");
 H   ALTER TABLE ONLY public.kategoribuku DROP CONSTRAINT kategoribuku_pkey;
       public            postgres    false    220            �           2606    320926 "   koleksipribadi koleksipribadi_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.koleksipribadi
    ADD CONSTRAINT koleksipribadi_pkey PRIMARY KEY ("koleksiID");
 L   ALTER TABLE ONLY public.koleksipribadi DROP CONSTRAINT koleksipribadi_pkey;
       public            postgres    false    219            �           2606    329151 (   peminjaman_detail peminjaman_detail_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.peminjaman_detail
    ADD CONSTRAINT peminjaman_detail_pkey PRIMARY KEY (peminjaman_detail_id);
 R   ALTER TABLE ONLY public.peminjaman_detail DROP CONSTRAINT peminjaman_detail_pkey;
       public            postgres    false    222            �           2606    320900    peminjaman peminjaman_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_pkey PRIMARY KEY ("peminjamanID");
 D   ALTER TABLE ONLY public.peminjaman DROP CONSTRAINT peminjaman_pkey;
       public            postgres    false    215            �           2606    329145    perpus perpus_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.perpus
    ADD CONSTRAINT perpus_pkey PRIMARY KEY (perpus_id);
 <   ALTER TABLE ONLY public.perpus DROP CONSTRAINT perpus_pkey;
       public            postgres    false    221            �           2606    320914    ulasanbuku ulasanbuku_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.ulasanbuku
    ADD CONSTRAINT ulasanbuku_pkey PRIMARY KEY ("ulasanID");
 D   ALTER TABLE ONLY public.ulasanbuku DROP CONSTRAINT ulasanbuku_pkey;
       public            postgres    false    217            �           2606    320907    user user_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userID");
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    216            �           2606    329217    ref_user ref_user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY ref.ref_user
    ADD CONSTRAINT ref_user_pkey PRIMARY KEY (nama);
 =   ALTER TABLE ONLY ref.ref_user DROP CONSTRAINT ref_user_pkey;
       ref            postgres    false    223            1   �   x���1
� �YO��ߨ�ڥC�-��H*��h��Bo_)=A��x��3R[-$�Ϯ��T���Z��7��Hwv������R5\4�2n�����`h'�Р��J��.U��3��ݬ�=��&'�֏����%?0��ٍN-���[E�      3   V   x�3247�00���4202�50�5�P00�26�26ӳ47�0��2330165 �������̐3'�(5W!���4W!%�ç)F��� \��      2      x������ � �      .      x������ � �      5      x������ � �      4   f   x��=@@@�z�s2;�A���V3����m_���!'f���{^�T}�A�Ǫ��t��o�Gp.j���`��JCH��K��vRc��0���Zkr4�      0   R   x��07�421����������ܢTNcN##]C]Cs+c3+S=SKS.#ScS#sLm
�i@�_w� $��      /   �   x���
�0  ����:���THIdQ�e��r��5ȿ��^�1��3�E��v1�q&��B�=K�7�0�+l�lJ�;�,�M5W�<u� �i����J�~6����ᣞ�%�z=�)���b�L�"L6+�",�@`� �?��-1      6   X   x�e�1�  ����Д�T�-.$�	�D���z�չm�cb�<�@��a�`��8�^�ھ�J�Hyd5'}��Z�R� ��8�	��?     