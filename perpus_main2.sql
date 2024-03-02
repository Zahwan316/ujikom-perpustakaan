PGDMP         8                |            perpustakaan    15.5    15.5 #    A           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    public          postgres    false    216   �0       7          0    16409    koleksipribadi 
   TABLE DATA           W   COPY public.koleksipribadi ("koleksiID", "userID", "bukuID", created_date) FROM stdin;
    public          postgres    false    217   3       >          0    16472    message 
   TABLE DATA           H   COPY public.message (message_id, text, created_date, title) FROM stdin;
    public          postgres    false    224   �3       8          0    16413 
   peminjaman 
   TABLE DATA           �   COPY public.peminjaman ("peminjamanID", "userID", "bukuID", tanggal_peminjaman, tanggal_pengembalian, perpus_id, created_date, status_peminjaman) FROM stdin;
    public          postgres    false    218   �9       9          0    16421    perpus 
   TABLE DATA           c   COPY public.perpus (perpus_id, nama_perpus, alamat, no_hp, created_date, updated_date) FROM stdin;
    public          postgres    false    219   �=       :          0    16427 
   ulasanbuku 
   TABLE DATA           b   COPY public.ulasanbuku ("ulasanID", "userID", "bukuID", ulasan, rating, created_date) FROM stdin;
    public          postgres    false    220   i>       ;          0    16433    user 
   TABLE DATA           �   COPY public."user" ("userID", username, password, email, nama_lengkap, alamat, perpus_id, no_hp, created_date, access_level, img) FROM stdin;
    public          postgres    false    221   @       =          0    16464    ref_peminjaman 
   TABLE DATA           K   COPY ref.ref_peminjaman (ref_peminjaman_id, nama, create_date) FROM stdin;
    ref          postgres    false    223   C       <          0    16456    ref_user 
   TABLE DATA           ?   COPY ref.ref_user (nama, create_date, user_ref_id) FROM stdin;
    ref          postgres    false    222   aC       �           2606    16440    buku buku_pkey 
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
       ref            postgres    false    222            5   l  x��VY�ܸ�f�"=?nE+���G�K�ь�%Yr�Z�E�"Q���)}9�W�%|�&>��^j$���Hd��r!�ҳ4�f�y�˚�綐�jh�5]pqC�A��ϓx$Q2�8�ς,�gQ���dg�,ZE�i4�f\�d�o������.�Nޙ��'��"�ެ��^�r��^���䦹Z���z�>�?�/��_�x���p���׫��]�N���_.�v}��/�(��L�?XK2\ٖ��2������4Hr蹥��RɆ�mIMg:M;6��\� ����ū��'�-�����h�jD�P��Ŕ�ۂ+ڈR;�Q8�ْ�Ȃk,�7B����vB���arl����)���T�#U�퀰-�Jr�ɶ��n��Z�`�(~w��!�J�b�J*�Or �Pr��A�Ǥd[��;�����=4�O��0(xBܳ�R*d�J�����GmY:zb�,}����A.�]m�+����������{y�'`s��8�D?z�
�p�����֠x�x�p�� 1�U��#�B��q�G����>tC|��N��h-��laQ�{.9 |�Cpkk�X���I�hͣ�~)	���*�WY:��d>_�b�L2_��Noe�z���-u�p?�t#�U9��J-؈�О���FIɁ��@���ʲ2B��r#�> k �x�QNZ��4�gs�F�m[D��F�2ޒlz-�A��7B�M�._d�b�bJ?v{q'�H8Tm�Ĳ6$J���;pO��m!4���,����]����Ϊ�;'g;����r#�a��F��0��6���HA��Z*�����8-5V�)]�A����e���Ӭd�*��F	��N�{�wh1�m.��h��oM�u������(�b?���J;[a@�Gl�[)Tq�U$;T�Wc�H����'��fg�v��؀���}�(�SW���%U���o���"��@�NC�
 �*�K������4\������2y(n6���٫� ����ӽKJ!rYϫ���1 ��֮@ݧ�<��B�Y�����a��*#��?��Bmݠ3.�ql���_X��0<�a2�I�a����^�TZ�T���NvJ�L7\@�a&[���6#�u9�#J��T��{�h��A<����0��U�\�q�*@y4Ҿë�3v���>L��O��M���"J�E�Z�n�eGouWjn����t��o~?�R� �R��h���*�V��4Jgq�x��b��p��j$�B��e�܈ݲ/�A�b����/|م����%�t�2vX��m���]	�ފ�������gt�)|-7��l�[�.q�|��AkL$��xq�et]ts�����J|���+��ҳ�<��0Y�a��$�ϲ,L�8��H� �+x�̓:0�Cg��g�s��������#5C")�-�3��n�kd���Rj$(Y�[��֌�N�T� ���f'Y��Βy��b���ӊ�k��Z�%ch���i��qF� ���e��r�M���,�Bx��S�����)X2F#���]	k�"k�n�j$�jw���!ƻH!�W�D��
�^4^�(J��y��t����6����u�#ܿ�8�0� ��гO�0z��.����N?OONN��6�^      6   |  x�m��R�0E����أ�����BJ��\
��(��(��__�P
�3қ��>K[�J�r�/=a��B��x� �(�BI��{�"?T��Y��٦��m�G���ʎ�0�p���KQ(��rb4H*�\ڦ����T%,dlנɹ-�;���E��R?�w�Om?�S�9k[�&s�D`�tltp�%Mg)A)Pj�ͷ���o��o�r�W9�uqZ�.��Y��呂4����gn:/�����"�i�!T�a
y�6�~�
�%�ʮz�:雛b&%"���ڪ�m]ۏC4�\�ޢ���zo��!gxH�И 5��{��Q�����
@�r)�	�(�����s��Lx��NO\g���c�Zh|�ˍ�iim~}�l7[,n����#s��>��']�t}��GSE9w+�o�xBi"L��@����g\��L��������{�����I.����`�A 3�:���.���,�l����G)Jv0�
�pu[�����P5
$ksߔo��]���i�Pw�ߋ*�<4�ܬz_U�?�	�2�Ɍ0˰2����5�+��e&da�x.TAra@���o�'�c͵2��al�M�j�6�B+8F�S���?��d�X �      7   �   x�u���0ki�,`	� �!2���#v���:���j���}?��Km�l��ƆNB��|D�>32���o�ź�z��<i1�C��#�*B�Vܖȶ^Z�����SGE���Z�̟~���"1�5�� ߣ-�      >   �  x��YMo7=ۿb�@���[ڦR�)���"%'������}+%m¥�kK�OA�3�y�WKRu?�u}?�������auݽ�~�v�m��w7���#��ψ:Ҟ��2�����S"��	�v{�z�����������0�&���T����9�7�Ź%�����uu��/���pѽ^����J5�HT�Q)bEvx�9�ԋ�(\<�˟��sJ1��WW��叿i���|x��]�*R�s] ˔-|����{���^W�ú�W���auս~�����ܑ����rv�*�DcM�e��%zl���(ެZ�E��u�������6�%��t������SX����5U�\SL�VWo/�yTmp�ڛ�Twʩ�5����1�L=K��lrd4fq�EUn sO��ܚ%��Nv���o.כ�н�`���n��}B0[b/Z�-��t����u��{KA(Ei��1��ˢMZ����dn�Țc6=\���ۻ�m����v=�� 8�K�z�H��x�������p���w����V�#�QHYS�����.z����c�5�L��ˢ��V�bO\
�6��$�ˢI��Ac�܊�MZ�@�i��g�0l�W	jQs�A����p
��:�l�wﻟ�n��&��K�$Oz�I��ZBI%q3��e�l�&�����m)�i�u�8��W>bc7',L�z�9��>=�O	&D��T����r!����i:���g�-�[nN�fh����#�S�(��z-ص���0���ٌ=�X��#V��9!5wg[���z� �cVZy��"���Ԕj�J�%�x�<�X.���� O�[ �����g[��
C4����<�b�)ӽǶ0J�T_�(Ė��\�c�fox��3[hC�@y}rHs:���`U��]m��#���y&C�����0îr����L����D���<@�]��+"�)�u$������
�Q� ��`1E��4�h����ax7ͨUs�AyC��i��MA6!%(��N�����˲��	�!��1M%���8�ɲSHO��b�B m.m�uދ�$T�vC��P��\�0�7 ��-�PI�����P�&|�
��v6瑫��(�Z���Gh�1@���� 'Q��p.�{L�u��o��ɚv�kU��<@!P�������l+8�5;"�U���9��1���q��{0��l���U��R1�љ�8�^�G��ˈ����uF#��G�Jc���5���r�������ƽ�*�8Ņ
�P}�����Q�v�����\y4]�_&^"��`?��3:� K1�~Х���G�כO�G!������|��[�Gz�2���KJˬ�l�|���c�Fn�^�i�ػ���1M%N�� �,��.���t��Bx9f�f��u�[���Y�� J��E�m����s_a��7��߫��\m����.$S�V�ʲ1} ��ʁ\ܛ"�V�g��������⚅��
��ؖ��6|F�<���5��&����ųM9      8   /  x��XYv9��N����E�������[�Gq��/��*
 c)�z*/��SsUG���>I>��G�L���l��0Nⓜ+�D��Vr
��/�'��Q��?�>��}���'>kzh�R����Q�λo�?����Ŝ��B���(�S>)����)>XQ$J�nu.]��!�	˻�>�/# �n��m����xh>8���a<Ǽ���Ya�G�(_��2~�Y�qqqR&���}������/
8/1�"5��� ��_��?LӁ�s�������F�	Y�~cif��`�Z����&�umO���j�@J����0�MR��Im��MV�����z%M�I�U����t_$`~@d�����OXټL�$�=�m�oA��|�E�5�� ��7�@^�6�1#��3U�EN�f2��a8;�x�	�ȋ�'ZґK�w{��7�m�l�?��� ��Zy���u˲?>@�j9.D�@V@b��5�o��%���[�T�&��|l]Ⳇea��}(�����[����Dn���!2u\t��kޠ�d�$������q	3t�,`8�V�C0���L�A^g�1�7?5�$�Ϳ�Z�oJ�ٿ�srtJ,gpr���[" �3�,A�k����<p|��d��]1��� ���1WS3\��XެΑ)jI�yP�~��D�I�t��fh��h��v�J��Ҟ� �b� knG^����� {�5�a�a/���a��V�5�f,�Ѵ����2�[��A�l�����E{G˿�<�4Z��1u��1HL�F9�/�np=�X�E�/	k�|���B{G@m%��U���"Q�Eɬ2:y@Ӯ����|er�h��C�5���;R�t��J��s$ۚ�t����5�GN�zI�� �#�.x�P�,s��7�eaO �5�|���2��a;x)�F[�|���!ޞ�}g��!�xI���Q��w�����2�^6���������P�]% 3ڬ���of��D7F0�r�Q�K�א�'ľ�9Ɠ�+�e�tlA��b�W��on��I�?�|>���A�      9   f   x��=@@@�z�s2;�A���V3����m_���!'f���{^�T}�A�Ǫ��t��o�Gp.j���`��JCH��K��vRc��0���Zkr4�      :   �  x�}�Mn1���)t�)J���.�E7ٌ[�1&��1�޾��8�t@`6���h�
%u�_��i�%<O���;J+�Z�\Y+H�"fɓ	�{,l�~��?�	TXe�T��q��ux��]Xƀ\WHQ4 �)�$t\��i�6O�0�}ۍ��c;^��
!@�+K3d_�pRzW�d@H��	�Lm��y�]�Q!��Q�p�	��^e�g�v�J�{��e̙����;�}�v���u�[�����G1�z,��& >a�C ���6�pm���)�gl�3v��++$�0l��B[.�t:ebUR����{�V����:��'KN.<�R�+��=������KXh�6�x��z&9����q�dz���m�.�?Ci>�h'��*�BK쯋d�*��w2_�8���Ϸ��[;zR��o�1z���P��      ;   �  x���M��:���W��Ž���EH\�J��حӊ5� Q�m� �S�;U3UY%U�y�{N��S�4P>x���O��[�q���kم��������C�v�Ѹ--���[�UF�^�P��k��*��M�y���412����/}�TCF�>:A�cH��@���`�6itZz"�eSo���%��,7B'<�n��(y�����T�8������WB)�*�R����h�MuM��W1��	!�rû^�ɻ���_n㋘������Q�gK|��Hǋ�u���r�Fǚ��8���} &51���)�+7������գY��b c�����͐E�˳�i�}�a1��ڍu��<5�������=ׂ��c:�vF�_j7����̐٤T7���܆I�I5O���.����6�ca���=*ۑ�m.�D����L�ZV;�u�^=R�P��E���@��~]�Ei�ď|�*)S��S?׆��̴޶8fЮF-���&5tq�c�]U��R�?ƿ�j7LȈ@� �2S���X}k+�ͦ	ăp����sc��,rֱ/�D^r���?K��_�`rC<4qC�%��i�UP%�C����HT;r�c^�j'M}�?�R~����������e4?��Lo�I�|�3�[�x}F�oظ�R��dU�@V��n��^]4+Pqu�9�$�x������:yuM^��!�ɯ�APC�I���Ī���kv]����h4~ 
I�      =   K   x�3�t�,���J��4202�50�5�P02�26�2��322715�2��N�MJ���N��Til�glihn����� e7      <   X   x�e�1�  ����Д�T�-.$�	�D���z�չm�cb�<�@��a�`��8�^�ھ�J�Hyd5'}��Z�R� ��8�	��?     