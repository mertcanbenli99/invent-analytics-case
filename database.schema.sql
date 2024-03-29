--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'WIN1252';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.book OWNER TO postgres;

--
-- Name: book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_id_seq OWNER TO postgres;

--
-- Name: book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_id_seq OWNED BY public.book.id;


--
-- Name: borrowed_book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.borrowed_book (
    id integer NOT NULL,
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    borrow_date timestamp without time zone DEFAULT now() NOT NULL,
    return_date timestamp without time zone,
    score integer DEFAULT '-1'::integer NOT NULL,
    returned boolean DEFAULT false NOT NULL
);


ALTER TABLE public.borrowed_book OWNER TO postgres;

--
-- Name: borrowed_book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.borrowed_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.borrowed_book_id_seq OWNER TO postgres;

--
-- Name: borrowed_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.borrowed_book_id_seq OWNED BY public.borrowed_book.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: book id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq'::regclass);


--
-- Name: borrowed_book id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrowed_book ALTER COLUMN id SET DEFAULT nextval('public.borrowed_book_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: borrowed_book PK_4c9f6ded12afd45e3b2492f3b58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrowed_book
    ADD CONSTRAINT "PK_4c9f6ded12afd45e3b2492f3b58" PRIMARY KEY (id);


--
-- Name: book PK_a3afef72ec8f80e6e5c310b28a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: IDX_4c9f6ded12afd45e3b2492f3b5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_4c9f6ded12afd45e3b2492f3b5" ON public.borrowed_book USING btree (id);


--
-- Name: IDX_a3afef72ec8f80e6e5c310b28a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_a3afef72ec8f80e6e5c310b28a" ON public.book USING btree (id);


--
-- Name: IDX_cace4a159ff9f2512dd4237376; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON public."user" USING btree (id);


--
-- Name: borrowed_book FK_81f8be6a38b92884b3f15f7df88; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrowed_book
    ADD CONSTRAINT "FK_81f8be6a38b92884b3f15f7df88" FOREIGN KEY (book_id) REFERENCES public.book(id) ON DELETE CASCADE;


--
-- Name: borrowed_book FK_b1209045307365edfbd5eaa0b33; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrowed_book
    ADD CONSTRAINT "FK_b1209045307365edfbd5eaa0b33" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

