PGDMP         (                |            perpustakaan    15.5    15.5 #    A           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    slug character varying
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
   TABLE DATA           �   COPY public.buku ("bukuID", judul, penulis, penerbit, perpus_id, tahun_terbit, kategori_id, created_date, img, sinopsis, slug) FROM stdin;
    public          postgres    false    215   �)       6          0    16405    kategoribuku 
   TABLE DATA           Q   COPY public.kategoribuku ("kategoriID", nama_kategori, created_date) FROM stdin;
    public          postgres    false    216   �;       7          0    16409    koleksipribadi 
   TABLE DATA           W   COPY public.koleksipribadi ("koleksiID", "userID", "bukuID", created_date) FROM stdin;
    public          postgres    false    217   �<       >          0    16472    message 
   TABLE DATA           H   COPY public.message (message_id, text, created_date, title) FROM stdin;
    public          postgres    false    224   j=       8          0    16413 
   peminjaman 
   TABLE DATA           �   COPY public.peminjaman ("peminjamanID", "userID", "bukuID", tanggal_peminjaman, tanggal_pengembalian, perpus_id, created_date, status_peminjaman) FROM stdin;
    public          postgres    false    218   �>       9          0    16421    perpus 
   TABLE DATA           c   COPY public.perpus (perpus_id, nama_perpus, alamat, no_hp, created_date, updated_date) FROM stdin;
    public          postgres    false    219   �@       :          0    16427 
   ulasanbuku 
   TABLE DATA           b   COPY public.ulasanbuku ("ulasanID", "userID", "bukuID", ulasan, rating, created_date) FROM stdin;
    public          postgres    false    220   ?A       ;          0    16433    user 
   TABLE DATA           �   COPY public."user" ("userID", username, password, email, nama_lengkap, alamat, perpus_id, no_hp, created_date, access_level, img) FROM stdin;
    public          postgres    false    221   C       =          0    16464    ref_peminjaman 
   TABLE DATA           K   COPY ref.ref_peminjaman (ref_peminjaman_id, nama, create_date) FROM stdin;
    ref          postgres    false    223   �E       <          0    16456    ref_user 
   TABLE DATA           ?   COPY ref.ref_user (nama, create_date, user_ref_id) FROM stdin;
    ref          postgres    false    222   XF       �           2606    16440    buku buku_pkey 
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
       ref            postgres    false    222            5      x�}Z�r۸�}����[%�$Y�%�Ö'v&N�����L��j
"!p Ҏ��_�_��4H�I�U�ĖH��}���Ɯ�.�����ч\]�Z�w�uF���!�N��6ӥ|0;���G]��V��2X���fӳ�l2��&���t�ZNO'���������g���x1[��'��?���\������j;�v
����7A�Q�Mm������o���H�2�W�V�<����w:�3�X,�ߨ�d���T��2{�&?��/��^���<���3]+�Rگ68y ;�\}0���A�C��~�>��U>�P7pU�7���Lx0?�4X(O��X&�����QU&lLV�XVo�<���?�R�P{�D��[�~��Q�w1���Pe��ں-�.��ժ��ɮ{v��;��c�*_5%ͪ��f�N���<B���V�ͷ@Ҍ�Pv7F�d�u��;�xP��f�oh�,�h�}V�v�"�q�y�!��?��^y���� �1�+�}k�����6��G��B �Lʊ����<�zD��n�ZN1��T�!F �{�D�Wq8 ��^�C�0'�Yu���M�dW�PHx��C->M��ɛ0���QN_`�h�>��㔅# |� >:����f��d6�.����3��k��z�w7��
@��D�w�9���&>�ܜ��ON����j�,5�)5/$7tu�K`���!j\����Ɣ�^����N��F�� |ã�ɀk~��ፉQBUz��>7_�`��oA7c��^~,�IZlm�_i_'|��(�����`�V	���: [��t ������{�$�/��MV������n��r\�ŏ@E��%�`pd$z���1d�ޖ�q�jUꚆ%�q$�K$ ����	.�3�A������b�Ta8�F�#$�)��6�%��<EG������7��v<�!Y��8�(ꆠM����5���y���]�=��t�!^�&e��5n�4d/��z���܀T�u��%L�dC���UP�)}��i��a�����7��;W���|�3e��8MH�������1�l�4}DLa�5�
��Q$h5����!� ��v���:Lzyʽ�8+�Q�k��8y��7b�#s$���Ս���=�+%����Zڝ�2�]HƤ�!��ԋ-۷�;��J�^�Ѹ���6#a���|5��&�7�}S�z�F�?��b��zo/?�W�	^���������'���jr�z�@�V�H�ٔ[�p_�hJ�"����lM�H�y��Y֔�zY6��K���Mso�u�s���z8ׇH�7V�/0���{h��;܌��K��0�z���i��Ƀ͡Jv7��U�Z��؈T��J��� ��$)��9}Iwi���iC:<OZ��%� ��.���Mk"�c�7�B$�8(fH ���ă��b>͓��V �ն琗�2"5s���)� ��Lز	p\"K������VK�x3)������m:Ȑ�]e��jڈ����&/$�r~Q�ͮqZ}8�u0��-���s0�|�K�#b�����k)�#2+���!���i�X��F��`��e#��B�H�����M�N�������C(�2�5�z+hr����=�i��$pDp%'QF�jGyD�,Lz����ч��.�G)����˓���wc_������l5X���œ֟���|6;_��W��d��J��ۻ��W�B('��m�A�mH  �pR(H������NONOf�9ڎ����&G�F�Q{����!ߙ6[д��|r6���˓�ͧ�O��������Ż�/�������������?~}u����<�������f������vW��v���~��/�}:��]}�������N�~����g���o��d���"����j�P����xA��NGl���{G}����H����\��w/��^�-�}���4q��_���cdA��M�����������}mB�3����Խ)55����+���J��nɅW��������#�ەx��ߙ{�Z���`�S7(L���:2�=�m��DB�a�aх��`��������U��[�|D�@���w��v�:�d��ny<me��wܥ2��s�wV6�8�}�Œ�-w��m�����k���k�Tn�W���;���K�oⁿw�W�d m-u��jn5>L_���$�6�LO&���a�r4�zu��ap����y�^���?v�)e�Ț��t~z�X^}���p�n4�|�it�tBxZڶ��tNu�O����IZ9�m�.��Iȉ������j{<j-ֆ��3ˮ�7*˾F�N�rj�"�He�DS�D{����>��I߭=�X�7�[�KL�L׺�K�n��V�I#�7��iSRUl��a�?�=)*�ϒ��B��.TСN���毆��ёh��P����t����)�K�IT�J!�48�t	�lM���,^kM���`30�a�[��ش���T#n}���c4�MM�L�&%�>���+g����v��\=V���V��f�m��(��QC��!'�S�2gMQD�u�'��!�YA�ۏ��>$�Y�T��
�w'�i��2YIy�v\ϡ���P������h�_-��;I�EE����&2I"�J�)œO5?��5�*5�k�Tq���
�(8��ʡ8D�T3�"Ȳ�5� .Ȗ��$��3���3������ �5�K�Iؗt�O����� �&gC�!���>��O��ht�5s�Z�:Z,����l�Io5�t�ك�v�lW�������l4Eoqr�8%�"�s|�XM�&��qzZ�LR��W����eְ3_}#&#1K$�d%�,�ee�LY>$�!�Z�+u>|�_�!����Y��Ʌݷi�r���Y�Ql8@$Z�
z[T7$j��8�r�ߚ����!
D���<��C�U���rJ�Lta��Z��D'�/�I`��Y@��懕��X�Z{���[��{�3J�%��ݮ�v����aγ=A��B�֊BH���'B��`\��O��|����V�Ӊe�)�Zc�O�ڈ>������43-�VG�Ʋ&x;8t�W�U�B���uoe:��i'C��AV��_��j�ָ����@(�@���Q���$��"���lH��
�e��Ae���	li��69W>M�K��X&"+�R�r���\�Ny@h�xU:mLvi6��[���RP9y���][���l�|
�D	x�?l��J��	ǜ��t
��1�
N�<|�iX��"�8�C���/��Uإ<�
�Z�h�St28W7�� ��AS,�@訦~oP �+|�@�l�H~Ǆ��>�;!�pX�Aeh�p��qn���tq�N�>��$���]RK���u;�r�Qцn4'I*L����Nҕ\���b �h��x,�q��ۢ�*�r���֛ӈ4�k�j�C-�ƚ^�ا�0��k�JE�[�[�qO�G��d>Y-��+e�/P�8��s�����A��L��l=��������d�8������r5[��!��X�,jc�.h���G�Hl���q���GS̝��8)��%�C������GFmQ�5N�yw�r�>Gv�/̖f��֦*�5ϦC�!�k���[��
U��tr*��%�0-�9$���< T�Xh��[燄M6�,HPi<�C��O�]�P�7t���H"�@�h�^�#;��Ws"�>��=���ֳ?������~��y�@����-�dB��$i��5e�,�v7��Ԏ�>M����c���.eV�<�|�����Q�{@
p�jY�4f=	
`�{��K��<Ɠ�+�Rͥ��Y���~��NU�Q%�e�GJJ{;���g[W��r�+� �o3Ѱ���[)6�ѧTI�[!%�=������<�j�����Vu��j]"Ze*�	T�3A�>��%8�N�YG��<0����
D�����ܒ�8Jla�<�;�t�F�mS���d8h�LW�H�q�>#Z~�"q��m�����8x� 
  wv�����Ae�Φ���j�=)�����'��|5�N'��i�>K�D��\	� ��]�ȵ���w�8��lO3V�G�/���&1}�0� �@Y�szn�:z�I�C��q��C��m;?��GRJ�$2���Ns�
?�h��v܊&�7V?u���zv��r��B˼c[��[���}|	�`ǒ��mok��q½��ӥ0'�e���Dx�t��
d�_Ɇ�Jd1V�2�#��tk�<�u��C+��x�6���,���EL潀�I�M��<�"w��^�O;��dF������J\쓢�6���*wď��׼cp=�$:�o�6[�|؂x��ZA����_�%<��u{?���= ���L�%� <�e �F�<|#���؉>Jףշ�V����eԓH��q�Pňk6��x�T��'��q�4��ݕϿ8� ����}�iR��oO��������ZG��퇟����\�ʋ��i+t��kot;d� ��&�>���?��F䟣?�GGG����      6   $  x�m��J1��s��3�L2�� "h��G/KM��ݮl����z�͟�aU 6�e��j<��\y�0d�L�(�DѪ`����T��Q:H��NS�>�8��i[�$93e/N��K�QC0oCݖn��������6�SFt�>��
R������[����R"UB�P�纄��8L��j������W��LNHX�MH��S9�����Y�'��+��5���\�KH�:d�-3�(��2N��o�MG��� mB	�l�s�2/-�\䈑,����<N��'A���p��o�rr�      7   �   x�u��1cmn�����p��%vd��p����	v).���n���%���οU�	��Iz�V�?Uۦ3�l����AlWV�ȃ�����R��
^B�~(Fy�"F0����8���$���"�Z-�      >   T  x����N1E�3_� ��q��H�@lRf�T*T��g�KU���s����Bsѿ�l�b(ya��ǵ9\�������AN�V�Rss�$u���u��'P���<���9M��yf	��W��4�z!���u�Wͮ�2�ҙY��5/&`��X�0F�{�m��͘[p�L��������h�9>�d�j���uM��Q+1�j-�+������rՙ�ճ9/�Pz����J��6��ɠK,	�2iTE9�Ă�Q[�7U�#�=��5�������7>XE����9����Eϗ���e��:]M�*��04y������i���������۶�^
�      8   �  x���]n�@���S�Yp��=DO����\5��8v���B�>�pHn:%�o�7��ŅI7&�w�;��(ج"����6���`�6���Q�km�f8��o��$(d��ݒ�Y7)#i�ߘ�N~>^3׫7H�l����o{r�]��I~�h�������̪PRzE�N�����U-�_D�
�ջ��TA�5f$4�=>ʠ��k̘�� 5����_���6YL6��y��O"�ݏD��&��<o��:I�����59���sLà,�\/��Մ�XM���W��9�����X�٘D�|��[�㚺��$~F^�|
Y�l�1��By~W� �ű���dk~��4�L����	����:9��p#Z.�8V�i�{��2t��u��A��j��׽C��v�2��7H>,�$��idg�!_��S<$�sap.��T�#�]DZoӳ������GK��p��.�w�y�a�,�fC�%�Yc����9L�      9   f   x��=@@@�z�s2;�A���V3����m_���!'f���{^�T}�A�Ǫ��t��o�Gp.j���`��JCH��K��vRc��0���Zkr4�      :   �  x�}�Kr�0D��)p�����M�xC%EӦT�T��r�Hr�j�臞n�e�螿��k�%����u�Hv�;� ��X�V��L<��Rz�������&@�K9#��h��=5�:�����98�r-TT�n&�(���D�$�/�˩�T�5H�Q2���Lg�����Nǥ�܎�~��u�!��}�Z��g�r�@b@H�`
��k�d�D>Y&� �hI��-�pjǮ�K�C?����=/��UL�}2a�c� ��N�|(�f?���:_�!�Ӭ&�(eQ�Irb���~��e�0���_�ե;J�V% ��3d�H��}ۂ��<��4M�m=˜� ������}eT���J�QJ4	S"gjd�C�����S?.�����0��yJ2����%�em�x��v���IU����Ȱh��ȑ	���	�r}ą@�#�Z�J���+����٪      ;   �  x���K��J���`ы{�����ڭ���iԘ`����m����pf"f"j�q�;y�0ǖ��~h<��	�'����	�����tO�p���>���mմ[K���S������I���N�p��f%yP�X�s�8�6b��/��jT�$� )�5Dg��}�Dw��Bf�t���8Gk�^W[iE'{��,�� ��g�#�l��xU8�����w���6,���d�#� ��a$8D���1�`�O'v*B��9z�t���k�=/�yA��]��ܭf���X)<0-��f�3�S�Y��O0\��4,� �,��D���E)Ƅ����~d�"���4ȟ3X�;�Z;��n����v;D��a�iBo��mD_F)�_%�n�G�v�x�R�b�Rr�H�2O�T��t�"��Xv��;:�#��\R����Ǔ^��N�κ�ߌ�.�mpQ�ms���.����ڏ|�Y���J@�O��n�*5zyqL��]F-����Lq����dT���ͷ<�	K`Q��K��F0���%�l��-��Q�ܲ�i0xۚ��^����i�ϫ�����������L����0���˪a�w��?�?]%�+}ue�fa�#�]��D�k�v5���˪D��*����8�#�����=5B*�'/'g8p�%�}��$N�����{[>�7�/7ɿ�m���Ge &�' ��@����Y�վ��J      =   K   x�3�t�,���J��4202�50�5�P02�26�2��322715�2��N�MJ���N��Til�glihn����� e7      <   X   x�e�1�  ����Д�T�-.$�	�D���z�չm�cb�<�@��a�`��8�^�ھ�J�Hyd5'}��Z�R� ��8�	��?     