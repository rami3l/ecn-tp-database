BEGIN;

INSERT INTO
    public.product(name)
VALUES
    ('melon'),
    ('fraise');

INSERT INTO
    public.stock (product, loading_point, quantity)
VALUES
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'melon'
        ),
        1,
        850
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'pomme de terre'
        ),
        1,
        12450
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'fraise'
        ),
        1,
        75
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'poireau'
        ),
        1,
        300
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'orange'
        ),
        1,
        150
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'pomme de terre'
        ),
        2,
        32700
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'fraise'
        ),
        2,
        100
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'kiwi'
        ),
        2,
        400
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'poireau'
        ),
        2,
        400
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'melon'
        ),
        3,
        550
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'pomme de terre'
        ),
        3,
        8350
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'fraise'
        ),
        3,
        235
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'kiwi'
        ),
        3,
        650
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'mandarine'
        ),
        3,
        150
    ),
    (
        (
            select
                product_id
            from
                product
            where
                lower(name) = 'poireau'
        ),
        3,
        250
    );

END;