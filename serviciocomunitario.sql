PGDMP                      }            postgres    17.4    17.4 p    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    5    postgres    DATABASE     n   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pl-PL';
    DROP DATABASE postgres;
                     postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                        postgres    false    5048            �            1259    16553    Cargo    TABLE     a   CREATE TABLE public."Cargo" (
    "idCargo" integer NOT NULL,
    "nbCargo" character varying
);
    DROP TABLE public."Cargo";
       public         heap r       postgres    false            �            1259    16450    bloqueHorario    TABLE     z   CREATE TABLE public."bloqueHorario" (
    "IdBloqueHorario" integer NOT NULL,
    "rangoBloque" character varying(255)
);
 #   DROP TABLE public."bloqueHorario";
       public         heap r       postgres    false            �            1259    16449 !   bloqueHorario_IdBloqueHorario_seq    SEQUENCE     �   CREATE SEQUENCE public."bloqueHorario_IdBloqueHorario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."bloqueHorario_IdBloqueHorario_seq";
       public               postgres    false    224            �           0    0 !   bloqueHorario_IdBloqueHorario_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."bloqueHorario_IdBloqueHorario_seq" OWNED BY public."bloqueHorario"."IdBloqueHorario";
          public               postgres    false    223            �            1259    16434    diaDeLaSemana    TABLE     y   CREATE TABLE public."diaDeLaSemana" (
    "idDiaDeLaSemana" integer NOT NULL,
    "nbDiaDeLaSemana" character varying
);
 #   DROP TABLE public."diaDeLaSemana";
       public         heap r       postgres    false            �            1259    16433 !   diaDeLaSemana_idDiaDeLaSemana_seq    SEQUENCE     �   CREATE SEQUENCE public."diaDeLaSemana_idDiaDeLaSemana_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."diaDeLaSemana_idDiaDeLaSemana_seq";
       public               postgres    false    220            �           0    0 !   diaDeLaSemana_idDiaDeLaSemana_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."diaDeLaSemana_idDiaDeLaSemana_seq" OWNED BY public."diaDeLaSemana"."idDiaDeLaSemana";
          public               postgres    false    219            �            1259    16525    elementoDeInfraestructura    TABLE     �   CREATE TABLE public."elementoDeInfraestructura" (
    "idElementoDeInfraestructura" integer NOT NULL,
    "nbElementoDeInfraestructura" character varying,
    descripcion character varying
);
 /   DROP TABLE public."elementoDeInfraestructura";
       public         heap r       postgres    false            �            1259    16524 9   elementoDeInfraestructura_idElementoDeInfraestructura_seq    SEQUENCE     �   CREATE SEQUENCE public."elementoDeInfraestructura_idElementoDeInfraestructura_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 R   DROP SEQUENCE public."elementoDeInfraestructura_idElementoDeInfraestructura_seq";
       public               postgres    false    241            �           0    0 9   elementoDeInfraestructura_idElementoDeInfraestructura_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."elementoDeInfraestructura_idElementoDeInfraestructura_seq" OWNED BY public."elementoDeInfraestructura"."idElementoDeInfraestructura";
          public               postgres    false    240            �            1259    16534    estadoInfraestructura    TABLE     �   CREATE TABLE public."estadoInfraestructura" (
    "idEstadoInfraestructura" integer NOT NULL,
    "nbEstado" character varying,
    descripcion character varying
);
 +   DROP TABLE public."estadoInfraestructura";
       public         heap r       postgres    false            �            1259    16533 1   estadoInfraestructura_idEstadoInfraestructura_seq    SEQUENCE     �   CREATE SEQUENCE public."estadoInfraestructura_idEstadoInfraestructura_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 J   DROP SEQUENCE public."estadoInfraestructura_idEstadoInfraestructura_seq";
       public               postgres    false    243            �           0    0 1   estadoInfraestructura_idEstadoInfraestructura_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."estadoInfraestructura_idEstadoInfraestructura_seq" OWNED BY public."estadoInfraestructura"."idEstadoInfraestructura";
          public               postgres    false    242            �            1259    16458    horarioExamen    TABLE     �   CREATE TABLE public."horarioExamen" (
    "idHorarioExamen" integer NOT NULL,
    fecha date,
    "idSalon" integer,
    "idDiaSemana" integer,
    "idBloqueHorario" integer
);
 #   DROP TABLE public."horarioExamen";
       public         heap r       postgres    false            �            1259    16461 !   horarioExamen_idHorarioExamen_seq    SEQUENCE     �   CREATE SEQUENCE public."horarioExamen_idHorarioExamen_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."horarioExamen_idHorarioExamen_seq";
       public               postgres    false    225            �           0    0 !   horarioExamen_idHorarioExamen_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."horarioExamen_idHorarioExamen_seq" OWNED BY public."horarioExamen"."idHorarioExamen";
          public               postgres    false    226            �            1259    16443    horarioProfesorPorDia    TABLE     �   CREATE TABLE public."horarioProfesorPorDia" (
    "idHorarioProfesorPorDia" integer NOT NULL,
    "idProfesor" integer,
    "idDiaSemana" integer,
    "idBloqueHorario" integer
);
 +   DROP TABLE public."horarioProfesorPorDia";
       public         heap r       postgres    false            �            1259    16442 1   horarioProfesorPorDia_idHorarioProfesorPorDia_seq    SEQUENCE     �   CREATE SEQUENCE public."horarioProfesorPorDia_idHorarioProfesorPorDia_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 J   DROP SEQUENCE public."horarioProfesorPorDia_idHorarioProfesorPorDia_seq";
       public               postgres    false    222            �           0    0 1   horarioProfesorPorDia_idHorarioProfesorPorDia_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."horarioProfesorPorDia_idHorarioProfesorPorDia_seq" OWNED BY public."horarioProfesorPorDia"."idHorarioProfesorPorDia";
          public               postgres    false    221            �            1259    16509    infraestructuraSalon    TABLE     �   CREATE TABLE public."infraestructuraSalon" (
    "IdInfraestructuraSalon" integer NOT NULL,
    cantidad integer,
    "idElementoInfraestructura" integer,
    "idSalon" integer,
    estado integer,
    descripcion character varying
);
 *   DROP TABLE public."infraestructuraSalon";
       public         heap r       postgres    false            �            1259    16508 /   infraestructuraSalon_IdInfraestructuraSalon_seq    SEQUENCE     �   CREATE SEQUENCE public."infraestructuraSalon_IdInfraestructuraSalon_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 H   DROP SEQUENCE public."infraestructuraSalon_IdInfraestructuraSalon_seq";
       public               postgres    false    238            �           0    0 /   infraestructuraSalon_IdInfraestructuraSalon_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."infraestructuraSalon_IdInfraestructuraSalon_seq" OWNED BY public."infraestructuraSalon"."IdInfraestructuraSalon";
          public               postgres    false    237            �            1259    16542    loginusuario    TABLE     �   CREATE TABLE public.loginusuario (
    idusuario character varying NOT NULL,
    usuario character varying,
    clave character varying,
    "idRol" integer,
    cedula bigint,
    cargo integer,
    nombre character varying(255)
);
     DROP TABLE public.loginusuario;
       public         heap r       postgres    false            �            1259    16502    lugarInventario    TABLE     �   CREATE TABLE public."lugarInventario" (
    "idLugarInventario" integer NOT NULL,
    cantidad integer,
    "idTipodeMobiliario" integer,
    "idSalon" integer
);
 %   DROP TABLE public."lugarInventario";
       public         heap r       postgres    false            �            1259    16501 %   lugarInventario_idLugarInventario_seq    SEQUENCE     �   CREATE SEQUENCE public."lugarInventario_idLugarInventario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."lugarInventario_idLugarInventario_seq";
       public               postgres    false    236            �           0    0 %   lugarInventario_idLugarInventario_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public."lugarInventario_idLugarInventario_seq" OWNED BY public."lugarInventario"."idLugarInventario";
          public               postgres    false    235            �            1259    16561    materia    TABLE     �   CREATE TABLE public.materia (
    "idMateria" integer NOT NULL,
    "nbMateria" character varying,
    "codigoMateria" integer NOT NULL
);
    DROP TABLE public.materia;
       public         heap r       postgres    false            �            1259    16560    materia_codigoMateria_seq    SEQUENCE     �   CREATE SEQUENCE public."materia_codigoMateria_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."materia_codigoMateria_seq";
       public               postgres    false    247            �           0    0    materia_codigoMateria_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."materia_codigoMateria_seq" OWNED BY public.materia."codigoMateria";
          public               postgres    false    246            �            1259    16425    profesor    TABLE     �   CREATE TABLE public.profesor (
    "idProfesor" integer NOT NULL,
    "nbProfesor" character varying,
    cedula integer,
    email character varying
);
    DROP TABLE public.profesor;
       public         heap r       postgres    false            �            1259    16424    profesor_idProfesor_seq    SEQUENCE     �   CREATE SEQUENCE public."profesor_idProfesor_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."profesor_idProfesor_seq";
       public               postgres    false    218            �           0    0    profesor_idProfesor_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."profesor_idProfesor_seq" OWNED BY public.profesor."idProfesor";
          public               postgres    false    217            �            1259    16483    salon    TABLE     �   CREATE TABLE public.salon (
    "idSalon" integer NOT NULL,
    piso integer,
    modulo integer,
    capacidad integer,
    status character varying,
    "tipoDeSalon" integer
);
    DROP TABLE public.salon;
       public         heap r       postgres    false            �            1259    16482    salon_idSalon_seq    SEQUENCE     �   CREATE SEQUENCE public."salon_idSalon_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."salon_idSalon_seq";
       public               postgres    false    232            �           0    0    salon_idSalon_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."salon_idSalon_seq" OWNED BY public.salon."idSalon";
          public               postgres    false    231            �            1259    16469    seccion    TABLE     y   CREATE TABLE public.seccion (
    idseccion integer NOT NULL,
    "idProfesor" integer,
    "cantEstudiantes" integer
);
    DROP TABLE public.seccion;
       public         heap r       postgres    false            �            1259    16476    seccionHorario    TABLE     �   CREATE TABLE public."seccionHorario" (
    "IdSeccionHorario" integer NOT NULL,
    "bloqueHorario" integer,
    "idDiaSemana" integer,
    "idSalon" integer,
    "idSeccion" integer
);
 $   DROP TABLE public."seccionHorario";
       public         heap r       postgres    false            �            1259    16475 #   seccionHorario_IdSeccionHorario_seq    SEQUENCE     �   CREATE SEQUENCE public."seccionHorario_IdSeccionHorario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."seccionHorario_IdSeccionHorario_seq";
       public               postgres    false    230            �           0    0 #   seccionHorario_IdSeccionHorario_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."seccionHorario_IdSeccionHorario_seq" OWNED BY public."seccionHorario"."IdSeccionHorario";
          public               postgres    false    229            �            1259    16468    seccion_idseccion_seq    SEQUENCE     �   CREATE SEQUENCE public.seccion_idseccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.seccion_idseccion_seq;
       public               postgres    false    228            �           0    0    seccion_idseccion_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.seccion_idseccion_seq OWNED BY public.seccion.idseccion;
          public               postgres    false    227            �            1259    16517    tipoDeMobiliario    TABLE     �   CREATE TABLE public."tipoDeMobiliario" (
    "IdTipoDeMobiliario" character varying NOT NULL,
    "NbMobiliario" character varying,
    descripcion character varying
);
 &   DROP TABLE public."tipoDeMobiliario";
       public         heap r       postgres    false            �            1259    16493    tipoDeSalon    TABLE     s   CREATE TABLE public."tipoDeSalon" (
    "idTipoDeSalon" integer NOT NULL,
    "nbTipoDeSalon" character varying
);
 !   DROP TABLE public."tipoDeSalon";
       public         heap r       postgres    false            �            1259    16492    tipoDeSalon_idTipoDeSalon_seq    SEQUENCE     �   CREATE SEQUENCE public."tipoDeSalon_idTipoDeSalon_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."tipoDeSalon_idTipoDeSalon_seq";
       public               postgres    false    234            �           0    0    tipoDeSalon_idTipoDeSalon_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."tipoDeSalon_idTipoDeSalon_seq" OWNED BY public."tipoDeSalon"."idTipoDeSalon";
          public               postgres    false    233            �           2604    16453    bloqueHorario IdBloqueHorario    DEFAULT     �   ALTER TABLE ONLY public."bloqueHorario" ALTER COLUMN "IdBloqueHorario" SET DEFAULT nextval('public."bloqueHorario_IdBloqueHorario_seq"'::regclass);
 P   ALTER TABLE public."bloqueHorario" ALTER COLUMN "IdBloqueHorario" DROP DEFAULT;
       public               postgres    false    223    224    224            �           2604    16437    diaDeLaSemana idDiaDeLaSemana    DEFAULT     �   ALTER TABLE ONLY public."diaDeLaSemana" ALTER COLUMN "idDiaDeLaSemana" SET DEFAULT nextval('public."diaDeLaSemana_idDiaDeLaSemana_seq"'::regclass);
 P   ALTER TABLE public."diaDeLaSemana" ALTER COLUMN "idDiaDeLaSemana" DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    16528 5   elementoDeInfraestructura idElementoDeInfraestructura    DEFAULT     �   ALTER TABLE ONLY public."elementoDeInfraestructura" ALTER COLUMN "idElementoDeInfraestructura" SET DEFAULT nextval('public."elementoDeInfraestructura_idElementoDeInfraestructura_seq"'::regclass);
 h   ALTER TABLE public."elementoDeInfraestructura" ALTER COLUMN "idElementoDeInfraestructura" DROP DEFAULT;
       public               postgres    false    241    240    241            �           2604    16537 -   estadoInfraestructura idEstadoInfraestructura    DEFAULT     �   ALTER TABLE ONLY public."estadoInfraestructura" ALTER COLUMN "idEstadoInfraestructura" SET DEFAULT nextval('public."estadoInfraestructura_idEstadoInfraestructura_seq"'::regclass);
 `   ALTER TABLE public."estadoInfraestructura" ALTER COLUMN "idEstadoInfraestructura" DROP DEFAULT;
       public               postgres    false    243    242    243            �           2604    16462    horarioExamen idHorarioExamen    DEFAULT     �   ALTER TABLE ONLY public."horarioExamen" ALTER COLUMN "idHorarioExamen" SET DEFAULT nextval('public."horarioExamen_idHorarioExamen_seq"'::regclass);
 P   ALTER TABLE public."horarioExamen" ALTER COLUMN "idHorarioExamen" DROP DEFAULT;
       public               postgres    false    226    225            �           2604    16446 -   horarioProfesorPorDia idHorarioProfesorPorDia    DEFAULT     �   ALTER TABLE ONLY public."horarioProfesorPorDia" ALTER COLUMN "idHorarioProfesorPorDia" SET DEFAULT nextval('public."horarioProfesorPorDia_idHorarioProfesorPorDia_seq"'::regclass);
 `   ALTER TABLE public."horarioProfesorPorDia" ALTER COLUMN "idHorarioProfesorPorDia" DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16512 +   infraestructuraSalon IdInfraestructuraSalon    DEFAULT     �   ALTER TABLE ONLY public."infraestructuraSalon" ALTER COLUMN "IdInfraestructuraSalon" SET DEFAULT nextval('public."infraestructuraSalon_IdInfraestructuraSalon_seq"'::regclass);
 ^   ALTER TABLE public."infraestructuraSalon" ALTER COLUMN "IdInfraestructuraSalon" DROP DEFAULT;
       public               postgres    false    238    237    238            �           2604    16505 !   lugarInventario idLugarInventario    DEFAULT     �   ALTER TABLE ONLY public."lugarInventario" ALTER COLUMN "idLugarInventario" SET DEFAULT nextval('public."lugarInventario_idLugarInventario_seq"'::regclass);
 T   ALTER TABLE public."lugarInventario" ALTER COLUMN "idLugarInventario" DROP DEFAULT;
       public               postgres    false    236    235    236            �           2604    16564    materia codigoMateria    DEFAULT     �   ALTER TABLE ONLY public.materia ALTER COLUMN "codigoMateria" SET DEFAULT nextval('public."materia_codigoMateria_seq"'::regclass);
 F   ALTER TABLE public.materia ALTER COLUMN "codigoMateria" DROP DEFAULT;
       public               postgres    false    247    246    247            �           2604    16428    profesor idProfesor    DEFAULT     ~   ALTER TABLE ONLY public.profesor ALTER COLUMN "idProfesor" SET DEFAULT nextval('public."profesor_idProfesor_seq"'::regclass);
 D   ALTER TABLE public.profesor ALTER COLUMN "idProfesor" DROP DEFAULT;
       public               postgres    false    218    217    218            �           2604    16486    salon idSalon    DEFAULT     r   ALTER TABLE ONLY public.salon ALTER COLUMN "idSalon" SET DEFAULT nextval('public."salon_idSalon_seq"'::regclass);
 >   ALTER TABLE public.salon ALTER COLUMN "idSalon" DROP DEFAULT;
       public               postgres    false    231    232    232            �           2604    16472    seccion idseccion    DEFAULT     v   ALTER TABLE ONLY public.seccion ALTER COLUMN idseccion SET DEFAULT nextval('public.seccion_idseccion_seq'::regclass);
 @   ALTER TABLE public.seccion ALTER COLUMN idseccion DROP DEFAULT;
       public               postgres    false    227    228    228            �           2604    16479    seccionHorario IdSeccionHorario    DEFAULT     �   ALTER TABLE ONLY public."seccionHorario" ALTER COLUMN "IdSeccionHorario" SET DEFAULT nextval('public."seccionHorario_IdSeccionHorario_seq"'::regclass);
 R   ALTER TABLE public."seccionHorario" ALTER COLUMN "IdSeccionHorario" DROP DEFAULT;
       public               postgres    false    229    230    230            �           2604    16496    tipoDeSalon idTipoDeSalon    DEFAULT     �   ALTER TABLE ONLY public."tipoDeSalon" ALTER COLUMN "idTipoDeSalon" SET DEFAULT nextval('public."tipoDeSalon_idTipoDeSalon_seq"'::regclass);
 L   ALTER TABLE public."tipoDeSalon" ALTER COLUMN "idTipoDeSalon" DROP DEFAULT;
       public               postgres    false    233    234    234            �          0    16553    Cargo 
   TABLE DATA           7   COPY public."Cargo" ("idCargo", "nbCargo") FROM stdin;
    public               postgres    false    245   ��       �          0    16450    bloqueHorario 
   TABLE DATA           K   COPY public."bloqueHorario" ("IdBloqueHorario", "rangoBloque") FROM stdin;
    public               postgres    false    224   ˌ       �          0    16434    diaDeLaSemana 
   TABLE DATA           O   COPY public."diaDeLaSemana" ("idDiaDeLaSemana", "nbDiaDeLaSemana") FROM stdin;
    public               postgres    false    220   f�       �          0    16525    elementoDeInfraestructura 
   TABLE DATA           �   COPY public."elementoDeInfraestructura" ("idElementoDeInfraestructura", "nbElementoDeInfraestructura", descripcion) FROM stdin;
    public               postgres    false    241          �          0    16534    estadoInfraestructura 
   TABLE DATA           e   COPY public."estadoInfraestructura" ("idEstadoInfraestructura", "nbEstado", descripcion) FROM stdin;
    public               postgres    false    243   ��       �          0    16458    horarioExamen 
   TABLE DATA           p   COPY public."horarioExamen" ("idHorarioExamen", fecha, "idSalon", "idDiaSemana", "idBloqueHorario") FROM stdin;
    public               postgres    false    225   c�       �          0    16443    horarioProfesorPorDia 
   TABLE DATA           |   COPY public."horarioProfesorPorDia" ("idHorarioProfesorPorDia", "idProfesor", "idDiaSemana", "idBloqueHorario") FROM stdin;
    public               postgres    false    222   ��       �          0    16509    infraestructuraSalon 
   TABLE DATA           �   COPY public."infraestructuraSalon" ("IdInfraestructuraSalon", cantidad, "idElementoInfraestructura", "idSalon", estado, descripcion) FROM stdin;
    public               postgres    false    238   ��       �          0    16542    loginusuario 
   TABLE DATA           a   COPY public.loginusuario (idusuario, usuario, clave, "idRol", cedula, cargo, nombre) FROM stdin;
    public               postgres    false    244   ��       �          0    16502    lugarInventario 
   TABLE DATA           k   COPY public."lugarInventario" ("idLugarInventario", cantidad, "idTipodeMobiliario", "idSalon") FROM stdin;
    public               postgres    false    236   ט       �          0    16561    materia 
   TABLE DATA           L   COPY public.materia ("idMateria", "nbMateria", "codigoMateria") FROM stdin;
    public               postgres    false    247   ��       �          0    16425    profesor 
   TABLE DATA           M   COPY public.profesor ("idProfesor", "nbProfesor", cedula, email) FROM stdin;
    public               postgres    false    218   ��       �          0    16483    salon 
   TABLE DATA           Z   COPY public.salon ("idSalon", piso, modulo, capacidad, status, "tipoDeSalon") FROM stdin;
    public               postgres    false    232   �       �          0    16469    seccion 
   TABLE DATA           M   COPY public.seccion (idseccion, "idProfesor", "cantEstudiantes") FROM stdin;
    public               postgres    false    228   ?�       �          0    16476    seccionHorario 
   TABLE DATA           v   COPY public."seccionHorario" ("IdSeccionHorario", "bloqueHorario", "idDiaSemana", "idSalon", "idSeccion") FROM stdin;
    public               postgres    false    230   \�       �          0    16517    tipoDeMobiliario 
   TABLE DATA           _   COPY public."tipoDeMobiliario" ("IdTipoDeMobiliario", "NbMobiliario", descripcion) FROM stdin;
    public               postgres    false    239   y�       �          0    16493    tipoDeSalon 
   TABLE DATA           I   COPY public."tipoDeSalon" ("idTipoDeSalon", "nbTipoDeSalon") FROM stdin;
    public               postgres    false    234   j�       �           0    0 !   bloqueHorario_IdBloqueHorario_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."bloqueHorario_IdBloqueHorario_seq"', 1, false);
          public               postgres    false    223            �           0    0 !   diaDeLaSemana_idDiaDeLaSemana_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."diaDeLaSemana_idDiaDeLaSemana_seq"', 1, false);
          public               postgres    false    219            �           0    0 9   elementoDeInfraestructura_idElementoDeInfraestructura_seq    SEQUENCE SET     j   SELECT pg_catalog.setval('public."elementoDeInfraestructura_idElementoDeInfraestructura_seq"', 1, false);
          public               postgres    false    240            �           0    0 1   estadoInfraestructura_idEstadoInfraestructura_seq    SEQUENCE SET     b   SELECT pg_catalog.setval('public."estadoInfraestructura_idEstadoInfraestructura_seq"', 1, false);
          public               postgres    false    242            �           0    0 !   horarioExamen_idHorarioExamen_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."horarioExamen_idHorarioExamen_seq"', 1, false);
          public               postgres    false    226            �           0    0 1   horarioProfesorPorDia_idHorarioProfesorPorDia_seq    SEQUENCE SET     b   SELECT pg_catalog.setval('public."horarioProfesorPorDia_idHorarioProfesorPorDia_seq"', 1, false);
          public               postgres    false    221            �           0    0 /   infraestructuraSalon_IdInfraestructuraSalon_seq    SEQUENCE SET     `   SELECT pg_catalog.setval('public."infraestructuraSalon_IdInfraestructuraSalon_seq"', 1, false);
          public               postgres    false    237            �           0    0 %   lugarInventario_idLugarInventario_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."lugarInventario_idLugarInventario_seq"', 1, false);
          public               postgres    false    235            �           0    0    materia_codigoMateria_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."materia_codigoMateria_seq"', 1, false);
          public               postgres    false    246            �           0    0    profesor_idProfesor_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."profesor_idProfesor_seq"', 1, false);
          public               postgres    false    217            �           0    0    salon_idSalon_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."salon_idSalon_seq"', 1, false);
          public               postgres    false    231            �           0    0 #   seccionHorario_IdSeccionHorario_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."seccionHorario_IdSeccionHorario_seq"', 1, false);
          public               postgres    false    229            �           0    0    seccion_idseccion_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.seccion_idseccion_seq', 1, false);
          public               postgres    false    227            �           0    0    tipoDeSalon_idTipoDeSalon_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."tipoDeSalon_idTipoDeSalon_seq"', 1, false);
          public               postgres    false    233                        2606    16559    Cargo Cargo_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Cargo"
    ADD CONSTRAINT "Cargo_pkey" PRIMARY KEY ("idCargo");
 >   ALTER TABLE ONLY public."Cargo" DROP CONSTRAINT "Cargo_pkey";
       public                 postgres    false    245            �           2606    16457     bloqueHorario bloqueHorario_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."bloqueHorario"
    ADD CONSTRAINT "bloqueHorario_pkey" PRIMARY KEY ("IdBloqueHorario");
 N   ALTER TABLE ONLY public."bloqueHorario" DROP CONSTRAINT "bloqueHorario_pkey";
       public                 postgres    false    224            �           2606    16441     diaDeLaSemana diaDeLaSemana_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."diaDeLaSemana"
    ADD CONSTRAINT "diaDeLaSemana_pkey" PRIMARY KEY ("idDiaDeLaSemana");
 N   ALTER TABLE ONLY public."diaDeLaSemana" DROP CONSTRAINT "diaDeLaSemana_pkey";
       public                 postgres    false    220            �           2606    16532 8   elementoDeInfraestructura elementoDeInfraestructura_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."elementoDeInfraestructura"
    ADD CONSTRAINT "elementoDeInfraestructura_pkey" PRIMARY KEY ("idElementoDeInfraestructura");
 f   ALTER TABLE ONLY public."elementoDeInfraestructura" DROP CONSTRAINT "elementoDeInfraestructura_pkey";
       public                 postgres    false    241            �           2606    16541 0   estadoInfraestructura estadoInfraestructura_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."estadoInfraestructura"
    ADD CONSTRAINT "estadoInfraestructura_pkey" PRIMARY KEY ("idEstadoInfraestructura");
 ^   ALTER TABLE ONLY public."estadoInfraestructura" DROP CONSTRAINT "estadoInfraestructura_pkey";
       public                 postgres    false    243            �           2606    16467     horarioExamen horarioExamen_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."horarioExamen"
    ADD CONSTRAINT "horarioExamen_pkey" PRIMARY KEY ("idHorarioExamen");
 N   ALTER TABLE ONLY public."horarioExamen" DROP CONSTRAINT "horarioExamen_pkey";
       public                 postgres    false    225            �           2606    16448 0   horarioProfesorPorDia horarioProfesorPorDia_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."horarioProfesorPorDia"
    ADD CONSTRAINT "horarioProfesorPorDia_pkey" PRIMARY KEY ("idHorarioProfesorPorDia");
 ^   ALTER TABLE ONLY public."horarioProfesorPorDia" DROP CONSTRAINT "horarioProfesorPorDia_pkey";
       public                 postgres    false    222            �           2606    16516 .   infraestructuraSalon infraestructuraSalon_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."infraestructuraSalon"
    ADD CONSTRAINT "infraestructuraSalon_pkey" PRIMARY KEY ("IdInfraestructuraSalon");
 \   ALTER TABLE ONLY public."infraestructuraSalon" DROP CONSTRAINT "infraestructuraSalon_pkey";
       public                 postgres    false    238            �           2606    16548    loginusuario loginUsuario_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.loginusuario
    ADD CONSTRAINT "loginUsuario_pkey" PRIMARY KEY (idusuario);
 J   ALTER TABLE ONLY public.loginusuario DROP CONSTRAINT "loginUsuario_pkey";
       public                 postgres    false    244            �           2606    16507 $   lugarInventario lugarInventario_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public."lugarInventario"
    ADD CONSTRAINT "lugarInventario_pkey" PRIMARY KEY ("idLugarInventario");
 R   ALTER TABLE ONLY public."lugarInventario" DROP CONSTRAINT "lugarInventario_pkey";
       public                 postgres    false    236                       2606    16568    materia materia_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.materia
    ADD CONSTRAINT materia_pkey PRIMARY KEY ("idMateria");
 >   ALTER TABLE ONLY public.materia DROP CONSTRAINT materia_pkey;
       public                 postgres    false    247            �           2606    16432    profesor profesor_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.profesor
    ADD CONSTRAINT profesor_pkey PRIMARY KEY ("idProfesor");
 @   ALTER TABLE ONLY public.profesor DROP CONSTRAINT profesor_pkey;
       public                 postgres    false    218            �           2606    16490    salon salon_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.salon
    ADD CONSTRAINT salon_pkey PRIMARY KEY ("idSalon");
 :   ALTER TABLE ONLY public.salon DROP CONSTRAINT salon_pkey;
       public                 postgres    false    232            �           2606    16481 "   seccionHorario seccionHorario_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."seccionHorario"
    ADD CONSTRAINT "seccionHorario_pkey" PRIMARY KEY ("IdSeccionHorario");
 P   ALTER TABLE ONLY public."seccionHorario" DROP CONSTRAINT "seccionHorario_pkey";
       public                 postgres    false    230            �           2606    16474    seccion seccion_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.seccion
    ADD CONSTRAINT seccion_pkey PRIMARY KEY (idseccion);
 >   ALTER TABLE ONLY public.seccion DROP CONSTRAINT seccion_pkey;
       public                 postgres    false    228            �           2606    16523 &   tipoDeMobiliario tipoDeMobiliario_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."tipoDeMobiliario"
    ADD CONSTRAINT "tipoDeMobiliario_pkey" PRIMARY KEY ("IdTipoDeMobiliario");
 T   ALTER TABLE ONLY public."tipoDeMobiliario" DROP CONSTRAINT "tipoDeMobiliario_pkey";
       public                 postgres    false    239            �           2606    16500    tipoDeSalon tipoDeSalon_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public."tipoDeSalon"
    ADD CONSTRAINT "tipoDeSalon_pkey" PRIMARY KEY ("idTipoDeSalon");
 J   ALTER TABLE ONLY public."tipoDeSalon" DROP CONSTRAINT "tipoDeSalon_pkey";
       public                 postgres    false    234            �      x������ � �      �   �   x�=��� D��*���0�|�� ���ױ����G:zJ��>[Pm����K�Z����ι
Q8O��D�;":_}Dt9Z�a'D�ã%��r�s� ��QC�R���J}�U�!eS<�io|W�A�~g���5�?�<M      �   L   x�3��)�K-�2��M,*2�9}3�,J��rL8�JSˀSΰ��"�B3����S��9]�s3���b���� ya      �   �  x��XMo9=ӿ�@ֈ,�N����f`Bld��^(vY��jj�MM<���|��s۫�ؾ�G7[��9E���^�{U�D,���ڪ�ja娳��W�w��~�ߌ��N6��mE�V*��Jz#�w��+�dg�\��t#�ӓ3q����;݆��uӑ�C|r��Ƽ�v��C��:�2�Y%��t�j��Qz�W���NO�b	� �ب��"��h%�W�Q�!rj:[9ju��#U��F�"k[����6� �ـ�h`���ڊ;�%��h��:�A8
0#R��U��jp��㵬OO��ԣ}��p�]� �j��7zG�EE\ �| ���)~��G�q��{�������B,=����59).�"ο'l(z�S%k�	r���1oFX���=X�BeZ'E��ZZ{��(��{����x>nĕ�M�!ု�өu�������Lދ�C�Ҡb���-�3N��&���8��Ҡ?�4������X[_�'i�<I�����9� N�˕���zCnM�Ҳ�cC�����I��T2�4�/x*���6Q�)����e�[�W�^�w�hk�	�E�$k4�o2��NS���]���j���[g;R}؅B)S 칸6H���bq���$ЎM�A�PK\3���ɨNV9��Q�t+*4C�J����DI�+��Q������%9����0�Os���>P(�?�8�>�[(U�� ���C�%9n3ݬ5����dD�N>
v
~��n��B�9�� 1��>`��R�����>����>)��@�|���m��~�(��M�����������1L����������~d%C�gge~�bҮ��w�˓� @����%Q��'�~K$��:��{�8��&vc�ۊ+�^D=�np>�	~^�a�
/QQ���026d����_�E�3iHmPv<k����"���
����c�b���wg1�i�9_4WcwL�x�R��0m5����1���$b �͚N>�����-�&\�.��ʬ�\$�3��qo7�r�+A���Nb_ףe�����q�1��~tɵ����B%GGU�� X���ܬ+Zar��#>�@W �9zuf���&T�m�F9:6����e�b�1<�N@\�v�h���~r\}��F*ʒ��Bȍ9��{>M~/�9�[�i�둰3L��Y��PRW�}��ԁ9q��_���A4��:���1rG}�~�����"M��R��6ŀ�k��>�|�f"��AוL�ŝl�Z���W�	��`Ս��R���F6Y;`���L��Ȕ�&�g����ۖga�gX\$f�����!`�Vu�^���H4�X����Y��xG�(��Vy<���ϺS�!���㥶7�3<4F��؏�/�rh����V�!sY�t�����e̚`�ǫ�^��m"��17��u�Q��"z�U����7�h6�cJ�n��ŧ��Yg��M�9xy�Ծq_��Դٮo�.]�^�+!7L �;ٶq�� ]��X`��5�^#̰���P������Zf3q���$,�R��㰣�US7X$o��uV	o��i@a��ޡ�ªQԦ��G�-����ſX�A�G�jI+�,l�h�2��Q��CiQ��J�K䛇%�)�>T���ū��b�Y�hxww��ߒ�A�{(����OCk�,�
�g��F�?e���� E��1�j�t�,�0p���pw��{8f�oj��x٦��A?�ڥ�.V����/�\��8�_�u�z�`�Zп�v|1�G6���ʛD��<?+�?�wepGnſm�Il�1�U�`����E�?Q��Χ��nV.x�r��[[���+����[��u���x3�n1�����x��ag����V{x��c��[2	��Ke�~�-�|󚌁GO6V����:?�-�K���L#���_7����MR�#��<���4�	�������o�Y�������p(�N�f�szrr�Dm1�      �   �  x�uT�n�@<��b>`�b���@H�8q�{7�g�yX��_�#�7��1�g�G�6�{�����P��.�֫/��[�B�S�#kvuf���NwV\'����1���LG�㚣i���\bgZ��~^��K`xue5[n�F��Q0��$O�x�ѫ��� i%�<�~ �k�	���|�nx�-�	t8� �f�|B���>�Hʥ��L}���� R/��p�4�|o�YZ��>����1���ʡ�é�@���y�Z��S2��'0��[;a��� �@M���sX�q��\]��Tud���1t�c�^�:���-���y�F}��(�h$�a��y���GH��.3n�d�y��@�b��0�i`�[�m��4�ܐ Թ�,�X�]��������h-yDe��C~��A-R�(v\e�b���Vr��qO6��LR�w��xŉ4�������x
�6������1���6@�X��(.�)�K1]I ���Ă��c2��v>  �&���h���F�e�?����M3������6�) �T}'x-���.c�	F�]�~[��PY����L]�e�EtmM;<b(�O��WA��6��fX�"&k�>��BIC��/��^m��|h%�����r�e'K��3�'2�(�^�P*����}(��ov�����{[g��Ir']6z�4�8�~̫���r      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x��Vˎ�6<�_�c��!>�:nv���pb��p4$r@I����G|�	�c)��h4��W������IF^+��*yJ�m7�ԍ>~5D�TpN9٘}{���F���?���Ɵ3ƨ$/�_z��#����R�՝Vf t����}���0���Ӎ�� ��T�e�`[��u/h9�I6�䴺�4q┥�����z�[��wщ���ߜ݃.
`͔���eƓ0d�ܶ����Yro��Ǯ6>��E���AN�+�t��N�p;�+A�8c�̉IYy��HF�7��� �Sr���=4:���kF��d�32���;)@�,�" V#FP.ЖG���������<2�%y]o_$?p`F�*O ��0��,�0����T�Nn�G��CrA1���5��Ao��2t��%^�F�3[��ȼ�bSF��c�a��v*44KNEJ~���s�]`L��+; ������m�9~�л ytH��ݡU���/v��+yr5e�P��Jpμd���P�;W�l�I~��瀨�Xibc�;�2���;���$�g[?�H�L��9�N�
��V��Ȕ�6[7LL޸=��1��nc-�[�uv՜a�i"�����!������Y�»$����>aa�1�2#w�vj�͹Q�Q�0������as��-����o�sVK��l�:s4y�4K�Q�ٝ6�O�*8VI�H�s�a:f���{�?��ߞU�#D&��{T��Utk�ۃ#��/��k\3�$oU�Y�&��� ��#<<f�j�i�[��",]*_V�/��^���S#h�����{��y���FȌf�Y����O^���E�UUE��e���ٍ�sJ�L�*sČ��r��R�m�s�6jV�IM���D��ۆ0�=��jJ���\z��j�i:���̳%��3>�a�N�my�����A���w 󂬯wc3wIJ��'�@��bq*�:����OKI��r'�?v7��h�.����n;�	�UR��3准\��[$
LW7��RΆ���U໢Mm>b�j�3�9 Y���;��$��i�_�~��|NF�.�_�E�-��Aϣ��\��c��t�J�R�T��@<b����&� ��Ӓ��<Hؗ$��j��A bE�����W��J�8�m{�ѓ$���U(���W�/_�>�+�_�b�ݫ-j�ZcX�p"'�_����*���$'�?%s���� �s������6����臹�����H�>�SI��\a綈՟Kh����V%�֮5�i�R!1�������o      �   �   x�]��JC1��s�b���^�,[�U��ъ�����A���E0Oo�ąf��̗10P�2
�.���K9���|
d�r�JЋe�}
�\�S�3�k�k�XAO>�Í�5z�d�}�N]&ˡ���0��T�_��֎$�:':s�w�
8��\������޳o~���B����f���K���/J>M�����fa���ˮ#%��Y���褸-2�=t�u]��j      �   B   x��40�4��� .K#tctTs���F���&�`3,�����LPb���� &�'C      �      x������ � �      �      x������ � �      �   �	  x��Y�r�:]S_�p�l˒���<��k\�oV��@H��$xABg7���]d1�]jv��9��rf���F������iq�s-��*+Q>h����g3�Z~c�*;��Z�e��hї���{V�?a�׬ǳ��Q�5�L�/BoU���H�ʎi|���/!{��L͎g���j�����z#�~y����-�9�ӥ*�8u<;/�«�M�A���� w�Y�ܟ�.e���t�W|=nȸ���E�E���=^��$��֬���]������r<[����n��T��$�J�deX�Kq��� +o�.�jӴ
�[�@'Fܷ�86&N�K��;�]78�Jk�
i�~��;)MO��0]W��u�h�OW��t-���U�~�������	����U++U\+.[F�r������]�t�8�M����LP�˭fmeM�W�?�]��7b]{�X�0��ܦA�)�U#[����\߾����Tǰ�E�%�3[�l�'��w�t��ً�V�ae��Җk���g/�H�b(�>�c�|F�\�6`}1z���O�	Od�؛z`��,#F+S�bc��g�acU|R��B�@��Î���M��1��Z.Y�<n�ً⚵�.��� �͆�!8�`��vz���3�q9��wL�����4�}vR\��Oz�:�~�R�-2�,� �d����>̟�Y�Q�Fh���F��u��Z������b���߄�3��+G!�jd�h�'ka��]�6|0��[��D7)c��M�cb�>��t����@�ģ����A��=EWkܞ�:�a�X�8��20�Q�S�r��rQ/qٝ�=�W0�WT�ԝ�Q�u�W�C.:W��-��U�ߣ��ƴ
V���
�v�;������Z�ۊ�K`�l؄k_e�ʐ�5LW��c0i%3��K>��)�z�x��I���zXrs4�j�����ŕm�ءp�(@�,D�o���w����E�^ʛg�����m�(o�䘫t ��I��Ŗ��,�1+�*+K�i����^:0׽�m�AV�g��s���C����J�SOͳ!*�C���O�9j� �R�Ė��6�%�Q������`k�K�!�_�_�F����/��t5��C|%��PXYN*��q%v�Qq%�")97��H���⎭q�뀏bk4  x��ѫ�� ��k�qh��QGf�'�c�"���
:��@J5I>T�ڑ�� j�'��0�t�rm������5E�AE"�m�h��[�6���o��=��w��5ST�!�p���T���I�|�ۋ�N]*��T��P�ӦS�4� `�bе(*Fl#DV�8%t��NbC�mr`-t�b�����GQ��������G�n��{�����c��@�Q����Ϋ�j��DCg����,�D'� aOGư^Ohh��
�F����L�����Yt�Cs\�q�&ۍB0\�
�\v�_H��2��OTҎ�^S�`��޲�r3��߲��*�-V^���O�Wy� ��6�����.���P�[�K':Iub�;T��p#^��Ȋ
����N�I�����)�#E�1�pQl��rqe�#B��!4U�xY��R��c"����W��d ��̠�?�*���дa<��"��eM��(l��uK�'�[p�f��x%�ՇE�.�"�5�s1Oj.I����)4@v ���c>������M >��=�xN�L�I^`~���X���I���f��4�i~��P���0�yLJ���8t��
q�HFq�M�gK�����*oc'�o
^	�\�V�*� �/$��ޛ�?�Jܨvb��w�e����s����u�Z˭��ˉ��Ʒ���A��� Y����JO�
��s����I���	/����K��؆��Q���4�B_p�����i�`�G\�c�n\�f&Z��K2�[8\ҋO8-����4IT�a����;l8` X%$��|#����ʺi��q����}Z�B8o��F������<�9�C����d|ƄrT��Qx҄�e
Ə�<��j�L�0R$6jP~�ӡ�M��<w,�k�t�a��ۗ,:HA��?��^(�j� ���c�s�9��vnn�mغ�ok���~9��$+a�2�ǖ<O�c5���.~d�<U����=��Nҁ��(�di�É�+R��xbˈ����n�iO��{�q��y��1ɉ�`~y�7^�oG�3�֚IW������j'k �=pg�;��Wv�l�i��� ��gղЕ��Ʀ����ߔ�?�:O^>�w��Rf@+�Q�Ս�|�=�W��k��G��m"�B�|2��g��)�����M�2�ס[�<ƣ��M��o�]�v���ժ�6߼&y4��r�TA�W�����zBn��V�N���v��TrǬo�c�d�ai�s.��?�NԿO|GK(��ɍ��@��%��?�]��yvti�zO�G�1n��F�_�ug_OZ�l6�?Fhr���k/%�Ub7��Α�&�����x6��^&	      �      x������ � �     