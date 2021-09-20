BEGIN;

CREATE TABLE IF NOT EXISTS public.stock (
    product integer NOT NULL,
    loading_point integer NOT NULL,
    quantity integer,
    PRIMARY KEY (product, loading_point)
);

ALTER TABLE
    public.stock
ADD
    FOREIGN KEY (product) REFERENCES public.product (product_id) NOT VALID;

ALTER TABLE
    public.stock
ADD
    FOREIGN KEY (loading_point) REFERENCES public.loading_point (loading_point_id) NOT VALID;

END;