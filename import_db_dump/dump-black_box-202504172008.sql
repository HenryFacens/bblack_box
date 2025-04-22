--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Ubuntu 17.4-1.pgdg22.04+2)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg22.04+2)

-- Started on 2025-04-17 20:08:52 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- CREATE SCHEMA public;

-- ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3575 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 922 (class 1247 OID 16695)
-- Name: enum_BannedUsers_reason; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."enum_BannedUsers_reason" AS ENUM (
    'post',
    'comentario',
    'outros'
);


ALTER TYPE public."enum_BannedUsers_reason" OWNER TO admin;

--
-- TOC entry 901 (class 1247 OID 16523)
-- Name: enum_InteracoesReporte_tipo; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."enum_InteracoesReporte_tipo" AS ENUM (
    'like',
    'dislike'
);


ALTER TYPE public."enum_InteracoesReporte_tipo" OWNER TO admin;

--
-- TOC entry 877 (class 1247 OID 16410)
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_users_role AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.enum_users_role OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 245 (class 1259 OID 16702)
-- Name: BannedUsers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."BannedUsers" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "UserNameBanned" character varying(255) NOT NULL,
    "banExpiryDate" timestamp with time zone NOT NULL,
    reason public."enum_BannedUsers_reason" NOT NULL,
    "reporteId" integer,
    "blockCount" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BannedUsers" OWNER TO admin;

--
-- TOC entry 244 (class 1259 OID 16701)
-- Name: BannedUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."BannedUsers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BannedUsers_id_seq" OWNER TO admin;

--
-- TOC entry 3576 (class 0 OID 0)
-- Dependencies: 244
-- Name: BannedUsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."BannedUsers_id_seq" OWNED BY public."BannedUsers".id;


--
-- TOC entry 235 (class 1259 OID 16559)
-- Name: ComentarioReporte; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."ComentarioReporte" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "reporteId" integer NOT NULL,
    comentario character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."ComentarioReporte" OWNER TO admin;

--
-- TOC entry 234 (class 1259 OID 16558)
-- Name: ComentarioReporte_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."ComentarioReporte_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComentarioReporte_id_seq" OWNER TO admin;

--
-- TOC entry 3577 (class 0 OID 0)
-- Dependencies: 234
-- Name: ComentarioReporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."ComentarioReporte_id_seq" OWNED BY public."ComentarioReporte".id;


--
-- TOC entry 233 (class 1259 OID 16540)
-- Name: InteracoesReporte; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."InteracoesReporte" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "reporteId" integer NOT NULL,
    tipo public."enum_InteracoesReporte_tipo" NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."InteracoesReporte" OWNER TO admin;

--
-- TOC entry 232 (class 1259 OID 16539)
-- Name: InteracoesReporte_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."InteracoesReporte_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."InteracoesReporte_id_seq" OWNER TO admin;

--
-- TOC entry 3578 (class 0 OID 0)
-- Dependencies: 232
-- Name: InteracoesReporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."InteracoesReporte_id_seq" OWNED BY public."InteracoesReporte".id;


--
-- TOC entry 217 (class 1259 OID 16404)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO admin;

--
-- TOC entry 229 (class 1259 OID 16501)
-- Name: categoria; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    "categoriasReporte" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.categoria OWNER TO admin;

--
-- TOC entry 228 (class 1259 OID 16500)
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_id_seq OWNER TO admin;

--
-- TOC entry 3579 (class 0 OID 0)
-- Dependencies: 228
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;


--
-- TOC entry 243 (class 1259 OID 16648)
-- Name: deleteUser; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."deleteUser" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "userNameToBeDeleted" character varying(255) NOT NULL,
    motivo character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."deleteUser" OWNER TO admin;

--
-- TOC entry 242 (class 1259 OID 16647)
-- Name: deleteUser_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."deleteUser_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."deleteUser_id_seq" OWNER TO admin;

--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 242
-- Name: deleteUser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."deleteUser_id_seq" OWNED BY public."deleteUser".id;


--
-- TOC entry 225 (class 1259 OID 16458)
-- Name: incident_images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.incident_images (
    id integer NOT NULL,
    url character varying(255) NOT NULL,
    "incidentId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.incident_images OWNER TO admin;

--
-- TOC entry 224 (class 1259 OID 16457)
-- Name: incident_images_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.incident_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.incident_images_id_seq OWNER TO admin;

--
-- TOC entry 3581 (class 0 OID 0)
-- Dependencies: 224
-- Name: incident_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.incident_images_id_seq OWNED BY public.incident_images.id;


--
-- TOC entry 223 (class 1259 OID 16439)
-- Name: incidents; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.incidents (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "userId" integer,
    "locationId" integer,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.incidents OWNER TO admin;

--
-- TOC entry 222 (class 1259 OID 16438)
-- Name: incidents_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.incidents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.incidents_id_seq OWNER TO admin;

--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 222
-- Name: incidents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.incidents_id_seq OWNED BY public.incidents.id;


--
-- TOC entry 237 (class 1259 OID 16578)
-- Name: link_compartilhado; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.link_compartilhado (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    "reporteId" integer NOT NULL,
    expiracao timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usado boolean DEFAULT false NOT NULL
);


ALTER TABLE public.link_compartilhado OWNER TO admin;

--
-- TOC entry 236 (class 1259 OID 16577)
-- Name: link_compartilhado_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.link_compartilhado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.link_compartilhado_id_seq OWNER TO admin;

--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 236
-- Name: link_compartilhado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.link_compartilhado_id_seq OWNED BY public.link_compartilhado.id;


--
-- TOC entry 221 (class 1259 OID 16430)
-- Name: locations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    latitude numeric(10,7),
    longitude numeric(10,7),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.locations OWNER TO admin;

--
-- TOC entry 220 (class 1259 OID 16429)
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO admin;

--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 220
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- TOC entry 239 (class 1259 OID 16595)
-- Name: notifications; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "reporteId" integer NOT NULL,
    message character varying(255) NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.notifications OWNER TO admin;

--
-- TOC entry 238 (class 1259 OID 16594)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO admin;

--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 238
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 241 (class 1259 OID 16617)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO admin;

--
-- TOC entry 240 (class 1259 OID 16616)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO admin;

--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 240
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- TOC entry 227 (class 1259 OID 16486)
-- Name: reporte; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reporte (
    id integer NOT NULL,
    "fotoPerfil" character varying(255) NOT NULL,
    "nomePerfil" character varying(255) NOT NULL,
    "horarioReporte" timestamp with time zone NOT NULL,
    "localizacaoReporte" character varying(255) NOT NULL,
    "descricaoReporte" character varying(255) NOT NULL,
    "imagemReporte" character varying(255) NOT NULL,
    "avaliacaoReporte" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "categoriaReporte" character varying(255) DEFAULT 'Não classificado'::character varying NOT NULL,
    "statusReporte" character varying(255) DEFAULT 'Pendente'::character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.reporte OWNER TO admin;

--
-- TOC entry 226 (class 1259 OID 16485)
-- Name: reporte_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reporte_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reporte_id_seq OWNER TO admin;

--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 226
-- Name: reporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reporte_id_seq OWNED BY public.reporte.id;


--
-- TOC entry 231 (class 1259 OID 16510)
-- Name: status; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.status (
    id integer NOT NULL,
    "statusReporte" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.status OWNER TO admin;

--
-- TOC entry 230 (class 1259 OID 16509)
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_id_seq OWNER TO admin;

--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 230
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- TOC entry 219 (class 1259 OID 16416)
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'user'::public.enum_users_role NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    cpf character varying(255),
    birthdate character varying(255),
    address character varying(255),
    cep character varying(255),
    bairro character varying(255),
    localidade character varying(255),
    uf character varying(255),
    "locationId" integer,
    "fotoPerfil" character varying(255)
);


ALTER TABLE public.users OWNER TO admin;

--
-- TOC entry 218 (class 1259 OID 16415)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO admin;

--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3341 (class 2604 OID 16705)
-- Name: BannedUsers id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."BannedUsers" ALTER COLUMN id SET DEFAULT nextval('public."BannedUsers_id_seq"'::regclass);


--
-- TOC entry 3330 (class 2604 OID 16562)
-- Name: ComentarioReporte id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ComentarioReporte" ALTER COLUMN id SET DEFAULT nextval('public."ComentarioReporte_id_seq"'::regclass);


--
-- TOC entry 3329 (class 2604 OID 16543)
-- Name: InteracoesReporte id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."InteracoesReporte" ALTER COLUMN id SET DEFAULT nextval('public."InteracoesReporte_id_seq"'::regclass);


--
-- TOC entry 3323 (class 2604 OID 16504)
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);


--
-- TOC entry 3340 (class 2604 OID 16651)
-- Name: deleteUser id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."deleteUser" ALTER COLUMN id SET DEFAULT nextval('public."deleteUser_id_seq"'::regclass);


--
-- TOC entry 3315 (class 2604 OID 16461)
-- Name: incident_images id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.incident_images ALTER COLUMN id SET DEFAULT nextval('public.incident_images_id_seq'::regclass);


--
-- TOC entry 3312 (class 2604 OID 16442)
-- Name: incidents id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.incidents ALTER COLUMN id SET DEFAULT nextval('public.incidents_id_seq'::regclass);


--
-- TOC entry 3331 (class 2604 OID 16581)
-- Name: link_compartilhado id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.link_compartilhado ALTER COLUMN id SET DEFAULT nextval('public.link_compartilhado_id_seq'::regclass);


--
-- TOC entry 3309 (class 2604 OID 16433)
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- TOC entry 3335 (class 2604 OID 16598)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 3339 (class 2604 OID 16620)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 3318 (class 2604 OID 16489)
-- Name: reporte id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reporte ALTER COLUMN id SET DEFAULT nextval('public.reporte_id_seq'::regclass);


--
-- TOC entry 3326 (class 2604 OID 16513)
-- Name: status id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- TOC entry 3305 (class 2604 OID 16419)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3569 (class 0 OID 16702)
-- Dependencies: 245
-- Data for Name: BannedUsers; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public."BannedUsers" VALUES (1, 1, 'teste2', '2025-04-22 20:24:04.477-03', 'post', 13, 1, '2025-04-15 20:24:04.477-03', '2025-04-15 20:24:04.477-03');


--
-- TOC entry 3559 (class 0 OID 16559)
-- Dependencies: 235
-- Data for Name: ComentarioReporte; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3557 (class 0 OID 16540)
-- Dependencies: 233
-- Data for Name: InteracoesReporte; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public."InteracoesReporte" VALUES (10, 29, 17, 'like', '2025-04-17 14:19:31.236-03', '2025-04-17 14:19:31.236-03');
INSERT INTO public."InteracoesReporte" VALUES (11, 29, 18, 'like', '2025-04-17 14:19:36.759-03', '2025-04-17 14:19:36.759-03');
INSERT INTO public."InteracoesReporte" VALUES (12, 29, 19, 'dislike', '2025-04-17 14:19:43.277-03', '2025-04-17 14:19:43.277-03');


--
-- TOC entry 3541 (class 0 OID 16404)
-- Dependencies: 217
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public."SequelizeMeta" VALUES ('20250316162238-create-users.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250316211338-create-locations.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250316211359-create-incidents.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250316211415-create-incident-images.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250326175529-add-cpf-and-location-to-user.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250326180127-add-cpf-and-location-to-user.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250326180245-add-cpf-and-location-to-user.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250326222918-add-cpf-and-location-to-user.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250401224159-remove-cep-from-users.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250401224244-remove-locationId-from-users.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250401224407-create-address-from-users-column.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250401224807-create-necessary-fields-for-register.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250401225753-add-locationId-to-users.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250408133109-remove-unique-birthdate.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250409133417-create-reporte-forms.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250409182531-add-categoria-status-to-reporte.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250409185107-add-categoria-column.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250410124314-add-status-column.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250410140801-add-fotoPerfil-to-users.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250410142432-remove-unique-fotoperfil.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250410165758-create-interacoes-reporte.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250410175525-create-comentario-reporte.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250410233916-create-link-compartilhado.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250411125630-add-usado-to-link-compartilhado.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250411162456-add-notification.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250411172153-add-userId-to-reporte.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250411173938-rename-reportId-to-reporteId.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250414143819-add-externo-role.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250414170238-create-refresh-token.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250415125356-add-unique-constraint-to-nome.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250415131739-migration-create-deleteUser.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250415173445-remove-username-reference.js');
INSERT INTO public."SequelizeMeta" VALUES ('20250415175656-add-banned-users.js');


--
-- TOC entry 3553 (class 0 OID 16501)
-- Dependencies: 229
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.categoria VALUES (1, 'Infraestrutura Urbana', '2025-04-09 15:52:15.692-03', '2025-04-09 15:52:15.692-03');
INSERT INTO public.categoria VALUES (2, 'Limpeza e Meio Ambiente', '2025-04-09 15:52:15.692-03', '2025-04-09 15:52:15.692-03');
INSERT INTO public.categoria VALUES (3, 'Segurança Pública', '2025-04-09 15:52:15.692-03', '2025-04-09 15:52:15.692-03');
INSERT INTO public.categoria VALUES (4, 'Transporte e Mobilidade', '2025-04-09 15:52:15.692-03', '2025-04-09 15:52:15.692-03');
INSERT INTO public.categoria VALUES (5, 'Outros', '2025-04-09 15:52:15.692-03', '2025-04-09 15:52:15.692-03');


--
-- TOC entry 3567 (class 0 OID 16648)
-- Dependencies: 243
-- Data for Name: deleteUser; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public."deleteUser" VALUES (31, 1, 'teste', 'Usuário realizou um total de 4 posts ofensivos, tendo sido aplicado os bans, portanto, banido seguindo a política de uso da plataforma.', '2025-04-15 14:36:10.562-03', '2025-04-15 14:36:10.562-03');


--
-- TOC entry 3549 (class 0 OID 16458)
-- Dependencies: 225
-- Data for Name: incident_images; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.incident_images VALUES (1, 'http://example.com/image1.jpg', 1, '2025-03-18 13:59:04.282-03', '2025-03-18 13:59:04.282-03');
INSERT INTO public.incident_images VALUES (2, 'http://example.com/image2.jpg', 1, '2025-03-18 13:59:04.282-03', '2025-03-18 13:59:04.282-03');


--
-- TOC entry 3547 (class 0 OID 16439)
-- Dependencies: 223
-- Data for Name: incidents; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.incidents VALUES (1, 'Incidente de teste', 1, 1, '2025-03-18 13:59:04.276-03', '2025-03-18 13:59:04.276-03');


--
-- TOC entry 3561 (class 0 OID 16578)
-- Dependencies: 237
-- Data for Name: link_compartilhado; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3545 (class 0 OID 16430)
-- Dependencies: 221
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.locations VALUES (1, 'Rua das Flores, 123', -23.5505200, -46.6333080, '2025-03-18 13:59:04.267-03', '2025-03-18 13:59:04.267-03');


--
-- TOC entry 3563 (class 0 OID 16595)
-- Dependencies: 239
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3565 (class 0 OID 16617)
-- Dependencies: 241
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.refresh_tokens VALUES (31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ0ODk0NDIwLCJleHAiOjE3NDU0OTkyMjB9.v_UqXhOaoSm7uXBdlsWnQy5iBXZvCsjtTNW0sLlCfYY', 1, '2025-04-24 09:53:40.81-03', '2025-04-17 09:53:40.81-03', '2025-04-17 09:53:40.81-03');
INSERT INTO public.refresh_tokens VALUES (97, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTc0NDkxMzE0NiwiZXhwIjoxNzQ1NTE3OTQ2fQ.xxtyZ_QLXEuw26TK3aKNwQ3zSjPYAWuSHCoA9xqeC0g', 30, '2025-04-24 15:05:46.754-03', '2025-04-17 15:05:46.754-03', '2025-04-17 15:05:46.754-03');
INSERT INTO public.refresh_tokens VALUES (98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImlhdCI6MTc0NDkzMDA0NCwiZXhwIjoxNzQ1NTM0ODQ0fQ.ePOKaYxw051qLKhCd54S78vYLMw3LM-YlgCQUjUolMM', 29, '2025-04-24 19:47:24.016-03', '2025-04-17 19:47:24.016-03', '2025-04-17 19:47:24.016-03');


--
-- TOC entry 3551 (class 0 OID 16486)
-- Dependencies: 227
-- Data for Name: reporte; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.reporte VALUES (17, 'fotosPerfil/image copy.png', 'Eduardo', '2025-04-17 14:11:45.252-03', 'Rua André Hurtado Garcia', 'Buraco Novo', 'uploads/1744909905237-580743585.png', NULL, '2025-04-17 14:11:45.252-03', '2025-04-17 14:11:45.252-03', 'Infraestrutura Urbana', 'Pendente', 29);
INSERT INTO public.reporte VALUES (18, 'fotosPerfil/image copy.png', 'Eduardo', '2025-04-17 14:13:58.561-03', 'Rua Facens', 'De novo esse buraco', 'uploads/1744910038538-983517151.png', NULL, '2025-04-17 14:13:58.562-03', '2025-04-17 14:13:58.562-03', 'Infraestrutura Urbana', 'Pendente', 29);
INSERT INTO public.reporte VALUES (19, 'fotosPerfil/image copy.png', 'Eduardo', '2025-04-17 14:14:46.028-03', 'Jardim Judith', 'Ponte caída. Já caíram 2 caminhões', 'uploads/1744910086015-932755585.png', NULL, '2025-04-17 14:14:46.028-03', '2025-04-17 14:14:46.028-03', 'Infraestrutura Urbana', 'Pendente', 29);


--
-- TOC entry 3555 (class 0 OID 16510)
-- Dependencies: 231
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.status VALUES (1, 'Pendente', '2025-04-10 09:44:56.211-03', '2025-04-10 09:44:56.211-03');
INSERT INTO public.status VALUES (2, 'Em andamento', '2025-04-10 09:44:56.211-03', '2025-04-10 09:44:56.211-03');
INSERT INTO public.status VALUES (3, 'Resolvido', '2025-04-10 09:44:56.211-03', '2025-04-10 09:44:56.211-03');
INSERT INTO public.status VALUES (4, 'Fechado sem solução', '2025-04-10 09:44:56.211-03', '2025-04-10 09:44:56.211-03');


--
-- TOC entry 3543 (class 0 OID 16416)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.users VALUES (1, 'admin2', 'admin2@blackbox.com', '$2a$10$w8ocZkGtkH/cugC7qreA6.f9Gof8WkHYh3xXvt/5igk8Hh5U739iG', 'admin', '2025-03-18 13:56:25.355-03', '2025-04-04 14:25:33.759-03', NULL, '18/09/1994', NULL, '18047203', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (29, 'Eduardo', 'eduwmaldaner@gmail.com', '$2a$10$8B9Vz7yy92g1MxuIdFTUIexo8wkr1wKs/0o1V9v8gbXpDXA4tONbG', 'user', '2025-04-17 14:11:13.823-03', '2025-04-17 14:11:13.823-03', '37323096812', '06/02/2004', 'Rua André Hurtado Garcia', '18047203', 'Jardim Judith', 'Sorocaba', 'SP', NULL, 'fotosPerfil/image copy.png');
INSERT INTO public.users VALUES (30, 'Teste', 'teste@blackbox.com', '$2a$10$3Vg.1UyJKfB0.md0g6sdGO.7w1xKW9mJQk2jFXUBag3KPKyWnyYhC', 'user', '2025-04-17 15:05:32.391-03', '2025-04-17 15:05:32.391-03', '40159094020', '09/08/1987', 'Rua André Hurtado Garcia', '18047203', 'Jardim Judith', 'Sorocaba', 'SP', NULL, 'fotosPerfil/image copy 3.png');


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 244
-- Name: BannedUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."BannedUsers_id_seq"', 1, true);


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 234
-- Name: ComentarioReporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."ComentarioReporte_id_seq"', 5, true);


--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 232
-- Name: InteracoesReporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."InteracoesReporte_id_seq"', 12, true);


--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 228
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.categoria_id_seq', 7, true);


--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 242
-- Name: deleteUser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."deleteUser_id_seq"', 31, true);


--
-- TOC entry 3595 (class 0 OID 0)
-- Dependencies: 224
-- Name: incident_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.incident_images_id_seq', 2, true);


--
-- TOC entry 3596 (class 0 OID 0)
-- Dependencies: 222
-- Name: incidents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.incidents_id_seq', 1, true);


--
-- TOC entry 3597 (class 0 OID 0)
-- Dependencies: 236
-- Name: link_compartilhado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.link_compartilhado_id_seq', 2, true);


--
-- TOC entry 3598 (class 0 OID 0)
-- Dependencies: 220
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.locations_id_seq', 1, true);


--
-- TOC entry 3599 (class 0 OID 0)
-- Dependencies: 238
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.notifications_id_seq', 4, true);


--
-- TOC entry 3600 (class 0 OID 0)
-- Dependencies: 240
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 98, true);


--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 226
-- Name: reporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reporte_id_seq', 19, true);


--
-- TOC entry 3602 (class 0 OID 0)
-- Dependencies: 230
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.status_id_seq', 4, true);


--
-- TOC entry 3603 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 30, true);


--
-- TOC entry 3383 (class 2606 OID 16707)
-- Name: BannedUsers BannedUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."BannedUsers"
    ADD CONSTRAINT "BannedUsers_pkey" PRIMARY KEY (id);


--
-- TOC entry 3369 (class 2606 OID 16564)
-- Name: ComentarioReporte ComentarioReporte_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ComentarioReporte"
    ADD CONSTRAINT "ComentarioReporte_pkey" PRIMARY KEY (id);


--
-- TOC entry 3365 (class 2606 OID 16545)
-- Name: InteracoesReporte InteracoesReporte_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."InteracoesReporte"
    ADD CONSTRAINT "InteracoesReporte_pkey" PRIMARY KEY (id);


--
-- TOC entry 3343 (class 2606 OID 16408)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3361 (class 2606 OID 16508)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- TOC entry 3381 (class 2606 OID 16655)
-- Name: deleteUser deleteUser_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."deleteUser"
    ADD CONSTRAINT "deleteUser_pkey" PRIMARY KEY (id);


--
-- TOC entry 3357 (class 2606 OID 16465)
-- Name: incident_images incident_images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.incident_images
    ADD CONSTRAINT incident_images_pkey PRIMARY KEY (id);


--
-- TOC entry 3355 (class 2606 OID 16446)
-- Name: incidents incidents_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT incidents_pkey PRIMARY KEY (id);


--
-- TOC entry 3371 (class 2606 OID 16585)
-- Name: link_compartilhado link_compartilhado_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.link_compartilhado
    ADD CONSTRAINT link_compartilhado_pkey PRIMARY KEY (id);


--
-- TOC entry 3373 (class 2606 OID 16587)
-- Name: link_compartilhado link_compartilhado_token_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.link_compartilhado
    ADD CONSTRAINT link_compartilhado_token_key UNIQUE (token);


--
-- TOC entry 3353 (class 2606 OID 16437)
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- TOC entry 3375 (class 2606 OID 16603)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 3377 (class 2606 OID 16622)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3379 (class 2606 OID 16624)
-- Name: refresh_tokens refresh_tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key UNIQUE (token);


--
-- TOC entry 3359 (class 2606 OID 16495)
-- Name: reporte reporte_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reporte
    ADD CONSTRAINT reporte_pkey PRIMARY KEY (id);


--
-- TOC entry 3363 (class 2606 OID 16517)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- TOC entry 3345 (class 2606 OID 16632)
-- Name: users unique_nome_constraint; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_nome_constraint UNIQUE (nome);


--
-- TOC entry 3367 (class 2606 OID 16557)
-- Name: InteracoesReporte unique_user_reporte_interaction; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."InteracoesReporte"
    ADD CONSTRAINT unique_user_reporte_interaction UNIQUE ("userId", "reporteId");


--
-- TOC entry 3347 (class 2606 OID 16472)
-- Name: users users_cpf_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_cpf_key UNIQUE (cpf);


--
-- TOC entry 3349 (class 2606 OID 16428)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3351 (class 2606 OID 16426)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3390 (class 2606 OID 16570)
-- Name: ComentarioReporte ComentarioReporte_reporteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ComentarioReporte"
    ADD CONSTRAINT "ComentarioReporte_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES public.reporte(id) ON DELETE CASCADE;


--
-- TOC entry 3391 (class 2606 OID 16565)
-- Name: ComentarioReporte ComentarioReporte_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ComentarioReporte"
    ADD CONSTRAINT "ComentarioReporte_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3388 (class 2606 OID 16551)
-- Name: InteracoesReporte InteracoesReporte_reporteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."InteracoesReporte"
    ADD CONSTRAINT "InteracoesReporte_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES public.reporte(id) ON DELETE CASCADE;


--
-- TOC entry 3389 (class 2606 OID 16546)
-- Name: InteracoesReporte InteracoesReporte_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."InteracoesReporte"
    ADD CONSTRAINT "InteracoesReporte_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3387 (class 2606 OID 16466)
-- Name: incident_images incident_images_incidentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.incident_images
    ADD CONSTRAINT "incident_images_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES public.incidents(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3385 (class 2606 OID 16452)
-- Name: incidents incidents_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT "incidents_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3386 (class 2606 OID 16447)
-- Name: incidents incidents_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT "incidents_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3392 (class 2606 OID 16588)
-- Name: link_compartilhado link_compartilhado_reporteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.link_compartilhado
    ADD CONSTRAINT "link_compartilhado_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES public.reporte(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3393 (class 2606 OID 16609)
-- Name: notifications notifications_reportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_reportId_fkey" FOREIGN KEY ("reporteId") REFERENCES public.reporte(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3394 (class 2606 OID 16604)
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3395 (class 2606 OID 16625)
-- Name: refresh_tokens refresh_tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3384 (class 2606 OID 16480)
-- Name: users users_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-04-17 20:08:52 -03

--
-- PostgreSQL database dump complete
--

