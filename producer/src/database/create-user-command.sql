-- Table: public.user

-- DROP TABLE public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    email text COLLATE pg_catalog."default",
    CONSTRAINT "user_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to admin;