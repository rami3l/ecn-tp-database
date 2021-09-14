-- Creation
BEGIN;

CREATE TABLE IF NOT EXISTS public."order" (
    order_id integer NOT NULL,
    client character varying,
    PRIMARY KEY (order_id)
);

CREATE TABLE IF NOT EXISTS public.client (
    abbrev character varying NOT NULL,
    name character varying,
    address integer,
    PRIMARY KEY (abbrev)
);

CREATE TABLE IF NOT EXISTS public.delivery_point (
    delivery_point_id integer NOT NULL,
    address integer,
    client character varying,
    PRIMARY KEY (delivery_point_id)
);

CREATE TABLE IF NOT EXISTS public.order_content (
    order_content_id integer NOT NULL,
    quantity integer,
    desired_delivery_date date,
    product integer,
    "order" integer,
    delivery_point integer,
    PRIMARY KEY (order_content_id)
);

CREATE TABLE IF NOT EXISTS public.product (
    product_id integer NOT NULL,
    name character varying,
    PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS public.supported_by (
    planned_delivery_time timestamp without time zone,
    signature_time timestamp without time zone,
    is_delivered boolean,
    order_content integer NOT NULL,
    mission integer NOT NULL,
    PRIMARY KEY (order_content, mission)
);

CREATE TABLE IF NOT EXISTS public.mission (
    mission_id integer NOT NULL,
    loading_time timestamp without time zone,
    loading_point integer,
    driver integer,
    truck character varying,
    PRIMARY KEY (mission_id)
);

CREATE TABLE IF NOT EXISTS public.loading_point (
    loading_point_id integer NOT NULL,
    address integer,
    PRIMARY KEY (loading_point_id)
);

CREATE TABLE IF NOT EXISTS public.driver (
    driver_id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    default_truck character varying,
    PRIMARY KEY (driver_id)
);

CREATE TABLE IF NOT EXISTS public.truck (
    license_plate character varying NOT NULL,
    is_functional boolean,
    comments character varying,
    PRIMARY KEY (license_plate)
);

CREATE TABLE IF NOT EXISTS public.address (
    address_id integer NOT NULL,
    address_line character varying,
    zipcode character varying,
    city character varying,
    PRIMARY KEY (address_id)
);

ALTER TABLE
    public."order"
ADD
    FOREIGN KEY (client) REFERENCES public.client (abbrev) NOT VALID;

ALTER TABLE
    public.delivery_point
ADD
    FOREIGN KEY (client) REFERENCES public.client (abbrev) NOT VALID;

ALTER TABLE
    public.order_content
ADD
    FOREIGN KEY ("order") REFERENCES public."order" (order_id) NOT VALID;

ALTER TABLE
    public.order_content
ADD
    FOREIGN KEY (product) REFERENCES public.product (product_id) NOT VALID;

ALTER TABLE
    public.order_content
ADD
    FOREIGN KEY (delivery_point) REFERENCES public.delivery_point (delivery_point_id) NOT VALID;

ALTER TABLE
    public.supported_by
ADD
    FOREIGN KEY (order_content) REFERENCES public.order_content (order_content_id) NOT VALID;

ALTER TABLE
    public.supported_by
ADD
    FOREIGN KEY (mission) REFERENCES public.mission (mission_id) NOT VALID;

ALTER TABLE
    public.mission
ADD
    FOREIGN KEY (loading_point) REFERENCES public.loading_point (loading_point_id) NOT VALID;

ALTER TABLE
    public.mission
ADD
    FOREIGN KEY (driver) REFERENCES public.driver (driver_id) NOT VALID;

ALTER TABLE
    public.mission
ADD
    FOREIGN KEY (truck) REFERENCES public.truck (license_plate) NOT VALID;

ALTER TABLE
    public.driver
ADD
    FOREIGN KEY (default_truck) REFERENCES public.truck (license_plate) NOT VALID;

ALTER TABLE
    public.delivery_point
ADD
    FOREIGN KEY (address) REFERENCES public.address (address_id) NOT VALID;

ALTER TABLE
    public.client
ADD
    FOREIGN KEY (address) REFERENCES public.address (address_id) NOT VALID;

ALTER TABLE
    public.loading_point
ADD
    FOREIGN KEY (address) REFERENCES public.address (address_id) NOT VALID;

-- END;
-- Initialization
INSERT INTO
    public.address (address_id, address_line, zipcode, city)
VALUES
    -- Loading points
    (1, '5 allée Beltegeuse', NULL, 'Soumoulou'),
    (2, '15 rue des rochers', NULL, 'Metz'),
    (3, '10 boulevard des marins', NULL, 'Nice'),
    -- Clients
    (4, '12 Boulevard Wezemir', '75012', 'Paris'),
    -- KAEDE
    (5, '1 Cours Saint Pierre', '33000', 'Bordeaux'),
    -- KUROMU
    (6, '24 Rue du pont', '49000', 'Angers'),
    -- KASUMI
    -- Delivery points
    -- KAEDE
    (7, '12 Boulevard Wezemir', NULL, 'Pau'),
    (8, '25 rue des tulipes', NULL, 'Bayonne'),
    (9, '2 rue des plantes', NULL, 'Marseille'),
    (10, '67 rue des 5 portes', NULL, 'Brest'),
    -- KUROMU
    (11, '8 rue des marchands', NULL, 'Tarbes'),
    (12, '1 rue de la braderie', NULL, 'Lille'),
    (13, '32 impasse de lumières', NULL, 'Lyon'),
    -- KASUMI
    (14, '14 rue de la tour', NULL, 'Narbonne'),
    (15, '7 allée des 3 saules', NULL, 'Reims');

INSERT INTO
    public.client (abbrev, name, address)
VALUES
    ('KAEDE', NULL, 4),
    ('KUROMU', NULL, 5),
    ('KASUMI', NULL, 6);

INSERT INTO
    public.delivery_point (delivery_point_id, client, address)
VALUES
    -- KAEDE
    (1, 'KAEDE', 7),
    (2, 'KAEDE', 8),
    (3, 'KAEDE', 9),
    (4, 'KAEDE', 10),
    -- KUROMU
    (5, 'KUROMU', 11),
    (6, 'KUROMU', 12),
    (7, 'KUROMU', 13),
    -- KASUMI
    (8, 'KASUMI', 14),
    (9, 'KASUMI', 15);

INSERT INTO
    public.truck(license_plate, is_functional, comments)
VALUES
    ('AC-543-AG', TRUE, NULL),
    ('AD-671-KA', TRUE, NULL),
    ('AH-126-GG', TRUE, NULL),
    ('AM-654-TU', TRUE, NULL),
    ('BA-865-PF', TRUE, NULL),
    ('BA-921-AA', FALSE, 'au garage pour réparation'),
    ('CK-221-KW', TRUE, NULL),
    ('CL-128-TR', TRUE, NULL),
    ('CN-225-AB', TRUE, NULL);

INSERT INTO
    public.driver(
        driver_id,
        first_name,
        last_name,
        default_truck
    )
VALUES
    (1, 'Arthur', 'DENT', 'AC-543-AG'),
    (2, 'Henry', 'LE ROC''H', 'BA-865-PF'),
    (3, 'Nathalie', 'DUPUIS', 'AH-126-GG'),
    (4, 'Jacques', 'WEBER', 'BA-921-AA'),
    (5, 'David', 'EMOUCHET', 'AD-671-KA'),
    (6, 'Alexandra', 'CE''NEDRA', 'CN-225-AB');

INSERT INTO
    public.loading_point(loading_point_id, address)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

INSERT INTO
    public.product(product_id, name)
VALUES
    (1, 'pomme'),
    (2, 'pomme de terre'),
    (3, 'poire'),
    (4, 'kiwi'),
    (5, 'poireau'),
    (6, 'mandarine'),
    (7, 'orange');

INSERT INTO
    public."order"(order_id, client)
VALUES
    (1, 'KAEDE'),
    (2, 'KASUMI'),
    (3, 'KUROMU'),
    (4, 'KASUMI'),
    (5, 'KUROMU');

INSERT INTO
    public.order_content(
        order_content_id,
        "order",
        product,
        quantity,
        desired_delivery_date,
        delivery_point
    )
VALUES
    (1, 1, 1, 500, '2021-11-15', 1),
    (2, 1, 2, 800, '2021-11-15', 1),
    (3, 2, 3, 200, '2021-11-15', 8),
    (4, 3, 4, 100, '2021-11-17', 7),
    (5, 4, 5, 200, '2021-11-18', 8),
    (6, 4, 2, 600, '2021-11-18', 8),
    (7, 5, 6, 200, '2021-11-22', 6),
    (8, 5, 7, 400, '2021-11-22', 6);

INSERT INTO
    public.mission(
        mission_id,
        driver,
        truck,
        loading_point,
        loading_time
    )
VALUES
    (1, 1, NULL, 1, '2021-11-15 06:00:00'),
    (2, 6, NULL, 1, '2021-11-18 08:00:00');

INSERT INTO
    public.supported_by(
        mission,
        order_content,
        planned_delivery_time,
        is_delivered
    )
VALUES
    (1, 1, '2021-11-15 08:00:00', FALSE),
    (1, 2, '2021-11-15 08:00:00', FALSE),
    (1, 3, '2021-11-15 14:00:00', FALSE),
    (2, 5, '2021-11-18 14:00:00', FALSE),
    (2, 6, '2021-11-18 14:00:00', FALSE);

END;