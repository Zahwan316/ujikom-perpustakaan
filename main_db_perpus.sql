PGDMP     :    %                |            perpustakaan    15.5    15.5 #    A           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            B           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            C           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            D           1262    16398    perpustakaan    DATABASE     �   CREATE DATABASE perpustakaan WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE perpustakaan;
                postgres    false                        2615    16455    ref    SCHEMA        CREATE SCHEMA ref;
    DROP SCHEMA ref;
                postgres    false            �            1259    16399    buku    TABLE     �  CREATE TABLE public.buku (
    "bukuID" integer NOT NULL,
    judul character varying(255),
    penulis character varying(255),
    penerbit character varying(255),
    perpus_id integer,
    tahun_terbit date,
    kategori_id integer,
    created_date timestamp without time zone DEFAULT now(),
    img character varying,
    sinopsis character varying,
    slug character varying,
    stok integer,
    isi_buku character varying,
    durasi_buku integer
);
    DROP TABLE public.buku;
       public         heap    postgres    false            �            1259    16405    kategoribuku    TABLE     �   CREATE TABLE public.kategoribuku (
    "kategoriID" integer NOT NULL,
    nama_kategori character varying(255),
    created_date timestamp without time zone DEFAULT now(),
    img character varying
);
     DROP TABLE public.kategoribuku;
       public         heap    postgres    false            �            1259    16409    koleksipribadi    TABLE     �   CREATE TABLE public.koleksipribadi (
    "koleksiID" integer NOT NULL,
    "userID" integer,
    "bukuID" integer,
    created_date timestamp without time zone DEFAULT now()
);
 "   DROP TABLE public.koleksipribadi;
       public         heap    postgres    false            �            1259    16472    message    TABLE     �   CREATE TABLE public.message (
    message_id integer NOT NULL,
    text character varying,
    created_date timestamp without time zone DEFAULT now(),
    title character varying
);
    DROP TABLE public.message;
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
       public         heap    postgres    false            �            1259    16433    user    TABLE     �  CREATE TABLE public."user" (
    "userID" integer NOT NULL,
    username character varying(255),
    password character varying(255),
    email character varying(255),
    nama_lengkap character varying(255),
    alamat text,
    perpus_id integer,
    no_hp character varying,
    created_date timestamp without time zone DEFAULT now(),
    access_level integer,
    img character varying
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
       ref         heap    postgres    false    6            5          0    16399    buku 
   TABLE DATA           �   COPY public.buku ("bukuID", judul, penulis, penerbit, perpus_id, tahun_terbit, kategori_id, created_date, img, sinopsis, slug, stok, isi_buku, durasi_buku) FROM stdin;
    public          postgres    false    215   *       6          0    16405    kategoribuku 
   TABLE DATA           V   COPY public.kategoribuku ("kategoriID", nama_kategori, created_date, img) FROM stdin;
    public          postgres    false    216   �C       7          0    16409    koleksipribadi 
   TABLE DATA           W   COPY public.koleksipribadi ("koleksiID", "userID", "bukuID", created_date) FROM stdin;
    public          postgres    false    217   �F       >          0    16472    message 
   TABLE DATA           H   COPY public.message (message_id, text, created_date, title) FROM stdin;
    public          postgres    false    224   8G       8          0    16413 
   peminjaman 
   TABLE DATA           �   COPY public.peminjaman ("peminjamanID", "userID", "bukuID", tanggal_peminjaman, tanggal_pengembalian, perpus_id, created_date, status_peminjaman) FROM stdin;
    public          postgres    false    218   tN       9          0    16421    perpus 
   TABLE DATA           c   COPY public.perpus (perpus_id, nama_perpus, alamat, no_hp, created_date, updated_date) FROM stdin;
    public          postgres    false    219   4O       :          0    16427 
   ulasanbuku 
   TABLE DATA           b   COPY public.ulasanbuku ("ulasanID", "userID", "bukuID", ulasan, rating, created_date) FROM stdin;
    public          postgres    false    220   �O       ;          0    16433    user 
   TABLE DATA           �   COPY public."user" ("userID", username, password, email, nama_lengkap, alamat, perpus_id, no_hp, created_date, access_level, img) FROM stdin;
    public          postgres    false    221   �Q       =          0    16464    ref_peminjaman 
   TABLE DATA           K   COPY ref.ref_peminjaman (ref_peminjaman_id, nama, create_date) FROM stdin;
    ref          postgres    false    223   �S       <          0    16456    ref_user 
   TABLE DATA           ?   COPY ref.ref_user (nama, create_date, user_ref_id) FROM stdin;
    ref          postgres    false    222   PT       �           2606    16440    buku buku_pkey 
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
       public            postgres    false    217            �           2606    16479    message message_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);
 >   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pkey;
       public            postgres    false    224            �           2606    16448    peminjaman peminjaman_pkey 
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
       ref            postgres    false    222            5      x��[�rGr}~E�^DELO�}0؇���		@+v-���f��W����"��bG�/~�o������dU�4 J�F��`����2O�̬ΙN�g��z���2Su���Q�ӫ۫�C���F�,R_��&,mQ��Mc�Hiu0���f��J���j�S3x���=�l ?��j:Y���4��`�����/̓�,/�dq>���W��|�>[����|�����������q2�����ޞ�ߏ����I��¨�|0I^��w?�?dߛ$�SÝ=��XMG���j��x���ԅ:�MY�d�l&��L�J�����%���ޔ�k��ZW�UB��l��G,dM����T����?�����ӿ�F�r��N��vgl
u��^%��*�oUf*�1]QW#�zK��^0&��'�E&C�\!�����3u��Oy6R_7U�*����?��};�,��y�O��D0�+�3�Ԯ(�����&��ulD�z_��N�:uls�0�lUm�`s�ꫪ<�������L� ��v��4� �3c���咵M���P��sޚ@Z�6Im�B�LO�TZ�&�z�vה&R�I�Dצ�=4.2e����M��R��Jld�}~��3.R�7�GU�VP�%6�5}5�(�V۬ѵ�M�=`MF�7y�Ҕ�L����b�m��^�#�tq0A\��v�;��mg��hv�aC�*1Jo~HS�+ʣ O�^6�B�s�M�*Sʭ��w�)o'y�=�'z��~��_���Q�>	_�� �'���b�@-_�b ��{:�X�_��P=���7j�����RO����R�ǯFE��=�����b2xH����ةI�0��C�� u��Z^$�\�Cu3z���������TW_j"�Ջ��ue��7ƫ`<��N�g��zy�<[ �Z��Yä���B�N� ��Re6��w8O!��tA�}�7Ȧ�ަ���m*�����ߥ�����豎Oֳ�|5��� L���Xo�gbD�ϔEi+�U�GM9��0jbCq��;so��� ���搗q5Ts�֋Ȋ���7��C���OTfR�5�@���Mb+�u4��k���`<�%{-���d2�/����z��N�f�����	LאP('RaA+ v��1���7�Y5aj����K
�u�OH�tT8,KA4���Z���0��� y�PU��5����W{��$�"d��&��q�%�2}q�;BB���P\k�&1���dCe��Ɋ�u^�

�%�mOU�bZ�┪og���Gص!+lo���Q��3�	�ЇRz~�&6e%z��#�,w�j����ޙ�ƺ ^b?�L{]Sg��&ݴ��� �7�&!h�U�1��Lh+��:CEv�v3�n9]o>aV�h��Pf���4U�u��2�w$y�S��A$d`��8�B�y:�C���6�K��G~$+����v����R����s`�������y�4�K�e��S�r�'��1w�H�����]�8���S ����B�A��D�F%f�1�d�\MGy�F��&�+��N�N�vo����61��&�vL��N:^�hQ��G��+2�m����f�%��[ ���T�T��6��j�9۝TMQ䥳�z����mť`E�H45r���}Khsk��~G�dR������#��V�V�<�e��!DE9+�X
鵍�㨯T���)Fm}��z��5r22��j�|�����^��HO%8�HD	E��G&!A�@<�?�\Q��D��G��π��a<{y'�'��x<]N�<Z��Ӑ��1_aLy��[�+�no�e���Ĩ?�!d����&�B�=׿=�糳�j:_-(�>^]/"�ͷ�V��Db�	��ы���.�'rQ>}o�aS"XՀ2�])"ԁhv�&��8J>}�Jo$�f>�f���4���*���7�S�h�g-S���
[N@F���g>ZT1���q)��)��i��0V=:��- ��$R�JX4�(.D�� ��)�)��zL���޳�G���>�Aۄuŉפ2�pX�)�P�۾1��j1E�^�*�ș�Pͮ>v옂"X�TqKK�	�<'�)Th�a(��T��la���J���%���C�C�t�Hq⓻��?h�%wa	�ܥ?��.�`���zO��cw_=YL���t5�i
̓��\]ĺ\��EE<��n:��)��l5[�g���N�du>Y�����j9�PW�f.��[g╧Ŧn5T��*�5����+�l�Z\�]-%dPGV4`3Snl-%T��7Ly��p��lf��4��5���D4Z!>X�N'�I��<��O{2��O��W��³�lv��ї��>�m�'`����J��3�S���h<�O���4T�H�/n��3&8;}GmuUw�Cbj�FS�*�e��[^��+Ι���}iQ�:��צ(������� 5;;�,֝*xt�G��n�(�
�7� u�$���߮�+��d>����,���4X����V�*ɷ�D���o���sH�ȳ�k>���mM��%�kGc�h�2K�G�U�Ku��쓺鞞���>W���P/�t��1I��Q�'��o�M�O���������׷��N��/>8^]�xu=[-���;��/֣���ܺ����e��~��ݺ�w'a���_E"a͑jc+��H�c0�b[k�sU[Uȡ�N��Vf�G�;5DcD�7d�`�;Y�\d��e5 �*}ǣ���X���iJ�N��dG]�;nX��L��dÏ"Omj]������j0����.c���K�A�v�ÏP�F�)>���F|��D��L�/��1%"&"銌��M�J�5VffQ6L�Tn����o�@�xs',\/<^>Gq��l=]-7Ȃ�<�ի<a<~�'���FWM�&jp�z�������<#u�G�4 ���)O�<ջZ�����l��O����p}>_�f��d:싹i�a3���>;V�t�n�;A�k�����p!شµ�kg��v@��P�iJӞg]��C]��\����b��<�4����(�Th�3[m�P�� *�w�8��e����:|(>`�Q���्�A F�Hl�T�E�K�"R�x���#��HǏ���fx2�<CpM.�I<�Ɲxpˣn��ЎQ��'Y��()��M(�K�Z�4�p���<C���A�����qH���2����Q�D�Lb[�j�.��:l(�<ǧ�Í�-C����Qme��vE��ڧ��~�y����V���0��<QA����t���Kú��o��)���nt��1�ж���)S�[������͒�*�f����-#���������F�3���Zc����p�(bn�\[��&%q�xn�x�٫g��X�,85j�7�&b�B[��Z2��ؤA�$�s�T"C�������|��ƵT�`�kS�-�;���#>�~�z�QY"����z��o�]O`�/�<�C;f�+��o\Ldu�%�<D��-Y�qM���`�
Щ�l�d�cG'�3X\LN`����1�!z+u���xoK��4p�2���)�I���'�X�
 ��o=��'M��l�&L�<+��좖@�)� �d@E
�ͅ/�C�����9��vqz����&؉ګ[z�k�{\�5L��+�jn�q.��C<��;��v!�3�i��]I�Ӂ�(	w�ut'����PsB��#_�Ps{B��Ē�YU��F}Y��ҁ�>�?��<������Q)ki�yþ'n���u�٩��<�}JӺ��z�D�E��H_�T#㉍���O2(!�؇��x��o��$z�8��v� ��6ioPk�֡/��^�"�#�T�B!������Y4ٰ��[�Ux�M�^d
M�H�� �&�P�}̾��O���T�a��
�Mњ�r�ю՜[j�82�k���H�V�I�`��K_2�	�^���^��xS�6� ��jЉs��)��(�,1�c����W�|���n�q�Lɉ>�O��Gv��(w�>nRH�6�,�nq�9�عe�.��C>�$�EQ9 �	  8��ާ��{?{�2�'�� E�z#9��X�7ht���>b@W!|�����ۋ7��7�no.��e�L���^���Lg���t4�M���`�_̝fp~]1[K�� WMIaC�D���?jw���+�tj8�ERe�ܺ�'����wPH�$.f��l hm�V1�╴���� s&&4?��[�B��n�nJ4�H5���,��Ŗ%�i#���:�*d$q ?���L��M�L�o���;�wu%'p�!��%��Q�֟a�DP�G.?!T��M�9�gn6�k�R,n6:���!U�
����Z��o�l����^����p��$���؜Q�'���B����n�%Q�Z	��*l#E�$���D��)��X�A������d4��ŧX;�@�6�=�i��Թ�HK,G�ڝ=�?Z�u*�|�
���j�R7���7�L��f%H�+S�dL���7��7�~��^W�t����b���y�dҔ�Yn��܆��5dA���D�;�	n�l`�Y�d��S]�{X�lڂ����UoG�9o<\��i�/���I^
qy�~�i߲�#]�㠣�`0�?�����_�+���#u�?�݌��_��٤{�ھ{Z��&��|p	�\8��|��,n�V��?���'-~��`>?�MF��Ǆ�/�_��3��}5�]^^\޾&����k�$�z�&r5��&�M,RKC4�Do�\�	�K�)+�.�_��0��W�)�	���	����Pr6W(����[d.wg9en�P�q �+br(o�:Q�ޟ�Dp��C�Ӕr~EВ���T�����t������������A�o=�S�L��-[u"�:&�w:�E��1�'J�DUH9�j�����?���J�*(��G�c|��l��O�!G��t���jօ��|(�c/ �!��H����,v�Mh>�F�]Y� !�GԸ��)"���.D9�O_5��P��DT�˨8T]RP�<��F�@���qZo��H�.��1���?U�n�2�%jr�K®H�r�yO��^I1t"�w�$���nK��S��[��ޱ�L���8��E��3��ȿ�dWV��igΆ�lC?�ϛ�2��]����N�J�ŗ�He%�K�!���X�-��vW=�v��yA#�_�?lp �%��lw��Kxf+8)��%�2���-p}���n�O���5�U�}͕9���o�)��5xM<���Dd�>�9����]���P\�GC�6c�!B�6y�S��|5�.���M�<pP1���W�]ur��Z�ಕB��R��k��+�I�6�����q�?��t	�h��X]_#�#�'M���3l�S�{�FRe:��L4k}?��J.E��w�na�=����{�J���Ɖ�?(�3��y�D'�?��a�N��i���)��:���S��\�3|�&�C.dr�{�r�C39��%:f�u``S7R��	5.u���@�
�R�R�k�����{{���/�R�n� @٘�a��쉚�w�k,�7\ca
J�G&t�k�CǕ�m�-��[�6oY�R���@�'����t�:[1�A�S��1��I���+�5;���Cԓu�Z���Eb��|��ٽ����ƃ�rq6YL�Ck�P��'g��`��k<_�|#j�%b>I�+i�����[	�"[�6G�)��f�(?����n>��1��3�'EN��I���V��lD�|æJv�Gf�N'�'�-ۭ{�U��BXOGls���ӊl\a�Ω�e+oZ�f�tҶ�4ꠣ�E��f�~Ú������G� �r����6�2bQ.�a��p%s�|��7����i�	C3���^ה̦���ҿ�J���|K�ۍ،k��}���P�M�@oN���R�K�j/�a��A8�4��n\U��nm8�S��v�u���$}�9���k���s����\�c��_��_���A�����ҋù����	)�~�Q����*�,L�ȵt��A�P6E�~�WX&������y�]�g�F��<g�!1�θF����ʌ܉)�v�w��Bv����5k�n}�4M�Ծi�7����=���4a�yɗ�I7yt�|m������ܰ϶v��`!�I��n6���r�U1s�
6p��3���9�s-�#�S9���(�|���G�A#Bm�1W�s��ý.j��BZ����Fȱ;�_�
]g۬wҍQb�ʲ3\ȩ�ثs��WMw���
�7�eFM����OJ�mX=�Mi>smd��7��JX��u]������3�Z�J��~������~(J{�Ib�w��T#Ζ�P^������!��r<�_H��%�Z�Q��I*���@�/���7��o�zl�k���uNG�M�GO�Ӕ�*��n(�-�
i���&1#	��)�J�]N�Oׇ����%�h�����{aX����y����ѓ'O�Zn7j      6   �  x�eTKr�8\ç�����.��q��X����*DB$,�`HP���[*�qܰ��~��!�!D��.��#FǄb&.)/)�@�J�D�Ц�9��`{_㍭w����~��`��!��m] B��al/���H�n���3՗D��)da�T��.�g����w���{;UvJG "�R��M���0��Y�P%������1�i�<�qJ3N���K�Mn�6�t�9�g:P`L�Z���_s���"�lU�P�J�l�0J�n�!6��sJ����l/��h�?!�Ѐ@�jUq#�dZѪ7?������o�t���{�_�wWc���ד?�(�Ѝ�|��f�%!�0C�ٴ:toas+���}���}������j�D���w�Q TPf~�b��|��N1����<[K��H  +h���Ny�h�,�PJsBQ?�/��/�qhH��c�ǅI.U�:Nqz�'���VF#?�X��.��)p����bI��������c�a8A&��QR]a��腦Sl����̵]�Dv'7cw�]�mc�=�qr{��^��\��]H~���"g�d�0:���bFB	1���_�n�ٕ_�2��I���}��޳�>�JJNr,f��t��<�,�*�0\K��s�C��;��-�v6�����o��s�n>�K�s�:g%�����e	<g��+���l����q>��ӽ}�����p���g������8�V�      7   �   x�u���0ki�,`	� �!2���#v���:���j���}?��Km�l��ƆNB��|D�>32���o�ź�z��<i1�C��#�*B�Vܖȶ^Z�����SGE���Z�̟~���"1�5�� ߣ-�      >   ,  x��Y�nG}��b~���tuϛ�����ʛ A^��@fD�t��R����h$j>IdUWuթs�%G����ߺ��n�����u�qw��^o����k�ȓ���"�*HMV��������s�1P�[7�E������c�Z^5ݤ5N��U$�ٻ;����s�rLg����d?/�U�-����˵��!셜Y3��=�i	5��L�"L����~�ѧ|��j�To� ip��'|{hU�Q����	����/�Xo��Ͷz߭�][����b�5���S���k��k�P2��+�J�}WGS�X��fr����5ﳤY����˼��K�>{����g\��u��q$	U3ȕI�Q�Y����̣r�˗Z�1E	��)�bB7�+��BM�4F��MiV������Sl�,���s�l7mW���z��m��������ĖeضHN�yg�rDZ�\��5:�s1�)y��mT:�]��L���"I�I�x���~�movՏ����p�e�M�"9���o?W�h��n�z��v3��#\p1ILC��@�=�z�߱y��Hgd��OfG}�g)^o�a*�"��e�e��tT�
����?y�ka'�%T����=P�]��s��y��Wvd��p@R�(��i@P�d�c�T$aX�N;r-7�6�b�����+�mc6GL�#x�>'��';�B+b*O<}�K0�4�7��N?}�	d햊�&	\��c��t� ����XP�k�y!�p#ɡ�C�C$��S�s�c4�K�<�%���׃nbȁ��R ESN�PR��d5x����đ�t){�p�&H��	C�A�Y�y��!7!��A>�,O=�xJwl��Q^EOX�����bpZFoh�HSh�.λ�����A���'��BW�s3���'�sP�P_?4R�1l��R?�W��PV����{�Է1�ለ!�s���ItY��CqJ �'H�����i8���x?O^>��݌\��7�=�ƾ���#P����:$�eyf.uJQ1n�E�y4�	���(-m�tV3��!�PA�U�S�3��w ��2�B&!ZN��GC!�m�d�4�)�X��{�WZ���=z�f�)�(?�B���[7;2�z�i�B�Xe�a�0��>���_,+(�4;!�����a��6��~��{Ѝ�h"���XW1+��D{����exd~�.�t��e�{=��(�(9�Ъ*�|��:8�~	��s����g2�c�98J�6"!A��GHW�h�R/�?��D
���eӝu\A�<~�����{�W�8N��F	�W'�r� rk7�Kz�r���r���d�l�{���t#�E�q5{��������ǻ2�4Mg�}0%�
��V���G�H�<��Tk��
��(q��� ���^av_�M���Tu��ٌ�c�{��0�
!�k����U�bV$�D��4gڛ-�w}56rM��
�I籹�����''ܿ�Y���x[�w�l�5g��f}�i����>�o)�5G�1(Fo�&"�����~	�	�,q�ɛ��� $��FB_��g�f�Iu�� �"" �����\����k�Z�A��/K��7��z;th��$��0Di�Ҕ���p0��*���ѳ*�өg��˦z�hVH���Z�vߍ����$Uǻ�X�0���\v�_�m�6�6�/������j��n�m�f�\��v]�[/�������L�c��tاׂͣ����Žx�
��aa�$ �yPr���<�
���I�i����w��Vdٿ����?�ør      8   �   x�����1��4>�ג��X'��H�Yio�Ol��(yd��8 ��S�ZFgB��zh���2])��F��$O2 '.��O�?d-���oO�8=Z)���h:��,n�5A�}D\�_�>4��"f¬�Xp��S,�����7#;�a6M޷�v����*��N��wJ�ʆ:^s��b�Z�      9   f   x��=@@@�z�s2;�A���V3����m_���!'f���{^�T}�A�Ǫ��t��o�Gp.j���`��JCH��K��vRc��0���Zkr4�      :   /  x��TMo�0=K�B?`1DJ�(���{�����^�&Ml���n� �!�����hI�1�y��Φ��?v/]c�A�q�a�|�מ*�$-
�ts��/=�FC�L�&$������Sٗ���A�c�}��c�h9&�&d�Aҹ�;e����c�[�q����u�ʋ@���?0�G@�����w��L�bA�!T,9d��߲�7� �(���6I���	
`[��>N�ah:�.�ɟɀ��P�,��FD�d�G3�E��ͮ\����X� lu
��̳���sA�<&T�P�X� :8��wx��la]6c�o�5;WM�-�v4U9�$+!R�iʷ�k��kђ�Qs4|͢�ʕ�Δl`B�pC��_���\ԧ��$2yb�4%����	�h�[��/���/��ܰs����$@\G�� 2ؘ"��!�HG�����^����FŚ}y.�{.�K�ص�������ֽ+�v�ZMjP5�y�1��|�v�<g?�d��?U,;���%M�z��qZ�Y�P1���G�����7]�1V0����/?[�      ;   �  x���Ks�0���Wh��]��-�U%�@  <&�~�`^��ט0�igZ-ug�9߹��Q%��dQŨ��G����Y�>���cs=O]f���d1�����L'�QЉ��c�6�ŘM�g�G�j�8��x{�p鵆^�I@G':����Ia��)ஔK��+�$�b"��p���:u��gЫ,��7���lÊD���r�W����7-}LG"�e?J��B��3��/���g�i���I��2��.�7�/7ɽ���M��aĕ�
`���.�eF�QB�V�h�鎘���v��o�&bc2���^�4BR1j1��$>����9h��i��`
�?��bg��-lX��'s2Y�,�l>)�����_@��O R�bTg����bQ4\T_j��%��8C�Ň;��Ӣ�m�<�m���^��M��μ��?�,6�ɸ7�A�;&��'@~����QA��Sj�¿�_�t�9d!l���Nh��N8�3���IU ��+oN�R���լ      =   K   x�3�t�,���J��4202�50�5�P02�26�2��322715�2��N�MJ���N��Til�glihn����� e7      <   X   x�e�1�  ����Д�T�-.$�	�D���z�չm�cb�<�@��a�`��8�^�ھ�J�Hyd5'}��Z�R� ��8�	��?     