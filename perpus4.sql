PGDMP         /                 |            perpustakaan    15.5    15.5      9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            <           1262    16398    perpustakaan    DATABASE     �   CREATE DATABASE perpustakaan WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE perpustakaan;
                postgres    false                        2615    16455    ref    SCHEMA        CREATE SCHEMA ref;
    DROP SCHEMA ref;
                postgres    false            �            1259    16399    buku    TABLE     *  CREATE TABLE public.buku (
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
       public         heap    postgres    false            �            1259    16405    kategoribuku    TABLE     �   CREATE TABLE public.kategoribuku (
    "kategoriID" integer NOT NULL,
    nama_kategori character varying(255),
    created_date timestamp without time zone DEFAULT now()
);
     DROP TABLE public.kategoribuku;
       public         heap    postgres    false            �            1259    16409    koleksipribadi    TABLE     �   CREATE TABLE public.koleksipribadi (
    "koleksiID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    created_date timestamp without time zone DEFAULT now()
);
 "   DROP TABLE public.koleksipribadi;
       public         heap    postgres    false            �            1259    16413 
   peminjaman    TABLE     "  CREATE TABLE public.peminjaman (
    "peminjamanID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    tanggal_peminjaman date,
    tanggal_pengembalian date,
    perpus_id integer,
    created_date timestamp without time zone DEFAULT now(),
    status_peminjaman integer
);
    DROP TABLE public.peminjaman;
       public         heap    postgres    false            �            1259    16421    perpus    TABLE       CREATE TABLE public.perpus (
    perpus_id integer NOT NULL,
    nama_perpus character varying,
    alamat character varying,
    no_hp character varying,
    created_date timestamp without time zone DEFAULT now(),
    updated_date timestamp without time zone
);
    DROP TABLE public.perpus;
       public         heap    postgres    false            �            1259    16427 
   ulasanbuku    TABLE     �   CREATE TABLE public.ulasanbuku (
    "ulasanID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    ulasan text,
    rating integer,
    created_date timestamp without time zone DEFAULT now()
);
    DROP TABLE public.ulasanbuku;
       public         heap    postgres    false            �            1259    16433    user    TABLE     n  CREATE TABLE public."user" (
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
       public         heap    postgres    false            �            1259    16464    ref_peminjaman    TABLE     �   CREATE TABLE ref.ref_peminjaman (
    ref_peminjaman_id integer NOT NULL,
    nama character varying,
    create_date timestamp without time zone DEFAULT now()
);
    DROP TABLE ref.ref_peminjaman;
       ref         heap    postgres    false    6            �            1259    16456    ref_user    TABLE     �   CREATE TABLE ref.ref_user (
    nama character varying NOT NULL,
    create_date timestamp without time zone DEFAULT now(),
    user_ref_id integer
);
    DROP TABLE ref.ref_user;
       ref         heap    postgres    false    6            .          0    16399    buku 
   TABLE DATA           v   COPY public.buku ("bukuID", judul, penulis, penerbit, perpus_id, tahun_terbit, kategori_id, created_date) FROM stdin;
    public          postgres    false    215   �%       /          0    16405    kategoribuku 
   TABLE DATA           Q   COPY public.kategoribuku ("kategoriID", nama_kategori, created_date) FROM stdin;
    public          postgres    false    216   s&       0          0    16409    koleksipribadi 
   TABLE DATA           W   COPY public.koleksipribadi ("koleksiID", "userID", "bukuID", created_date) FROM stdin;
    public          postgres    false    217   �&       1          0    16413 
   peminjaman 
   TABLE DATA           �   COPY public.peminjaman ("peminjamanID", "userID", "bukuID", tanggal_peminjaman, tanggal_pengembalian, perpus_id, created_date, status_peminjaman) FROM stdin;
    public          postgres    false    218   
'       2          0    16421    perpus 
   TABLE DATA           c   COPY public.perpus (perpus_id, nama_perpus, alamat, no_hp, created_date, updated_date) FROM stdin;
    public          postgres    false    219   �'       3          0    16427 
   ulasanbuku 
   TABLE DATA           b   COPY public.ulasanbuku ("ulasanID", "userID", "bukuID", ulasan, rating, created_date) FROM stdin;
    public          postgres    false    220   $(       4          0    16433    user 
   TABLE DATA           �   COPY public."user" ("userID", username, password, email, nama_lengkap, alamat, perpus_id, no_hp, created_date, access_level) FROM stdin;
    public          postgres    false    221   �(       6          0    16464    ref_peminjaman 
   TABLE DATA           K   COPY ref.ref_peminjaman (ref_peminjaman_id, nama, create_date) FROM stdin;
    ref          postgres    false    223   *       5          0    16456    ref_user 
   TABLE DATA           ?   COPY ref.ref_user (nama, create_date, user_ref_id) FROM stdin;
    ref          postgres    false    222   r*       �           2606    16440    buku buku_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY ("bukuID");
 8   ALTER TABLE ONLY public.buku DROP CONSTRAINT buku_pkey;
       public            postgres    false    215            �           2606    16442    kategoribuku kategoribuku_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.kategoribuku
    ADD CONSTRAINT kategoribuku_pkey PRIMARY KEY ("kategoriID");
 H   ALTER TABLE ONLY public.kategoribuku DROP CONSTRAINT kategoribuku_pkey;
       public            postgres    false    216            �           2606    16444 "   koleksipribadi koleksipribadi_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.koleksipribadi
    ADD CONSTRAINT koleksipribadi_pkey PRIMARY KEY ("koleksiID");
 L   ALTER TABLE ONLY public.koleksipribadi DROP CONSTRAINT koleksipribadi_pkey;
       public            postgres    false    217            �           2606    16448    peminjaman peminjaman_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_pkey PRIMARY KEY ("peminjamanID");
 D   ALTER TABLE ONLY public.peminjaman DROP CONSTRAINT peminjaman_pkey;
       public            postgres    false    218            �           2606    16450    perpus perpus_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.perpus
    ADD CONSTRAINT perpus_pkey PRIMARY KEY (perpus_id);
 <   ALTER TABLE ONLY public.perpus DROP CONSTRAINT perpus_pkey;
       public            postgres    false    219            �           2606    16452    ulasanbuku ulasanbuku_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.ulasanbuku
    ADD CONSTRAINT ulasanbuku_pkey PRIMARY KEY ("ulasanID");
 D   ALTER TABLE ONLY public.ulasanbuku DROP CONSTRAINT ulasanbuku_pkey;
       public            postgres    false    220            �           2606    16454    user user_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userID");
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    221            �           2606    16471 "   ref_peminjaman ref_peminjaman_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY ref.ref_peminjaman
    ADD CONSTRAINT ref_peminjaman_pkey PRIMARY KEY (ref_peminjaman_id);
 I   ALTER TABLE ONLY ref.ref_peminjaman DROP CONSTRAINT ref_peminjaman_pkey;
       ref            postgres    false    223            �           2606    16463    ref_user ref_user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY ref.ref_user
    ADD CONSTRAINT ref_user_pkey PRIMARY KEY (nama);
 =   ALTER TABLE ONLY ref.ref_user DROP CONSTRAINT ref_user_pkey;
       ref            postgres    false    222            .   �   x�e��J�0�ϓ��l�d2�&�UXo��%���Yh�þ��a���������â�2T�IG�N����g��7{�ZYGN1z��;t;/�z'(��u�gN�f#$�1��~�T�n;�}\�R��"��:�E	����c��}$�$Qb��6��uk�}]�Z�r��7;j+���7n��u��c&�:���h>:c�\�D�      /   j   x�U�9�0 ����| ������4��%��R��h�Z��5��0r[�VօZ��Ps�dhTn�<�R,�)_h�{
Pv���c?�Rj�$G���
 #^Z      0      x������ � �      1   �   x����1D�I4����O�Z�"$X@+q��7���-�Q�l���5�Cp����+S�ջ�7�2YVC��I�iN�i��Z55P��+�`їۨІ>C�2lf��~'���XO��k��{s0�D����?�|Ifm�~���X=D      2   f   x��=@@@�z�s2;�A���V3����m_���!'f���{^�T}�A�Ǫ��t��o�Gp.j���`��JCH��K��vRc��0���Zkr4�      3   R   x��07�421����������ܢTNcN##]C]Cs+c3+S=SKS.#ScS#sLm
�i@�_w� $��      4   �  x���Ko�@����Wt�6�̙�\��!�m��& 0�Ʀc3�0�N}�TH��vU����!ń�/eR� <���q�����i�i٧�V.�������MU��������Wz=��.�'�n)��*1��o*T6g]!��\H�*!�u�y� �����<&<Jm.��ŀb�O�J�b�{6i��tΏ�ul/w����*�`�:n�ip�Y��Q����`�6s�j�L��LMr����'\�~�䟻)�(���".U�p��`��G{�e�/�!Uf~'ޑ���E���q\��lJ@A�"L
�r@}Sf7ͷXէj?�����(���LN3y&��P�6J땹^�e1��B�Ϧ��D���*��ls,��g۲���G��      6   K   x�3�t�,���J��4202�50�5�P02�26�2��322715�2��N�MJ���N��Til�glihn����� e7      5   X   x�e�1�  ����Д�T�-.$�	�D���z�չm�cb�<�@��a�`��8�^�ھ�J�Hyd5'}��Z�R� ��8�	��?     