-- Creation
BEGIN;

CREATE TABLE IF NOT EXISTS public."order" (
    order_id serial,
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
    delivery_point_id serial,
    address integer,
    client character varying,
    PRIMARY KEY (delivery_point_id)
);

CREATE TABLE IF NOT EXISTS public.order_content (
    order_content_id serial,
    quantity integer,
    desired_delivery_date date,
    product integer,
    "order" integer,
    delivery_point integer,
    PRIMARY KEY (order_content_id)
);

CREATE TABLE IF NOT EXISTS public.product (
    product_id serial,
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
    mission_id serial,
    loading_time timestamp without time zone,
    loading_point integer,
    driver integer,
    truck character varying,
    PRIMARY KEY (mission_id)
);

CREATE TABLE IF NOT EXISTS public.loading_point (
    loading_point_id serial,
    address integer,
    PRIMARY KEY (loading_point_id)
);

CREATE TABLE IF NOT EXISTS public.driver (
    driver_id serial,
    first_name character varying,
    last_name character varying,
    default_truck character varying,
    PRIMARY KEY (driver_id)
);

CREATE TABLE IF NOT EXISTS public.truck (
    license_plate character varying NOT NULL,
    PRIMARY KEY (license_plate)
);

CREATE TABLE IF NOT EXISTS public.unavailability (
    unavailability_id serial,
    truck character varying,
    start_date date,
    end_date date,
    comments character varying,
    PRIMARY KEY (unavailability_id)
);

CREATE TABLE IF NOT EXISTS public.address (
    address_id serial,
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
    public.unavailability
ADD
    FOREIGN KEY (truck) REFERENCES public.truck (license_plate) NOT VALID;

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

END;