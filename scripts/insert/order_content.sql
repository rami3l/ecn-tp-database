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