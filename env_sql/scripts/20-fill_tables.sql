-- Initialization
BEGIN;

INSERT INTO
    public.address (address_line, zipcode, city)
VALUES
    -- Loading points
    ('5 allée Beltegeuse', NULL, 'Soumoulou'),
    ('15 rue des rochers', NULL, 'Metz'),
    ('10 boulevard des marins', NULL, 'Nice'),
    -- Clients
    ('12 Boulevard Wezemir', 75012, 'Paris'),
    -- KAEDE
    ('1 Cours Saint Pierre', 33000, 'Bordeaux'),
    -- KUROMU
    ('24 Rue du pont', 49000, 'Angers'),
    -- KASUMI
    -- Delivery points
    -- KAEDE
    ('5 allée des pinsons', NULL, 'Pau'),
    ('25 rue des tulipes', NULL, 'Bayonne'),
    ('2 rue des plantes', NULL, 'Marseille'),
    ('67 rue des 5 portes', NULL, 'Brest'),
    -- KUROMU
    ('8 rue des marchands', NULL, 'Tarbes'),
    ('1 rue de la braderie', NULL, 'Lille'),
    ('32 impasse de lumières', NULL, 'Lyon'),
    -- KASUMI
    ('14 rue de la tour', NULL, 'Narbonne'),
    ('7 allée des 3 saules', NULL, 'Reims');

INSERT INTO
    public.client (abbrev, name, address)
VALUES
    ('KAEDE', NULL, 4),
    ('KUROMU', NULL, 5),
    ('KASUMI', NULL, 6);

INSERT INTO
    public.delivery_point (client, address)
VALUES
    -- KAEDE
    ('KAEDE', 7),
    ('KAEDE', 8),
    ('KAEDE', 9),
    ('KAEDE', 10),
    -- KUROMU
    ('KUROMU', 11),
    ('KUROMU', 12),
    ('KUROMU', 13),
    -- KASUMI
    ('KASUMI', 14),
    ('KASUMI', 15);

INSERT INTO
    public.truck_type(truck_type_name)
VALUES
    ('frigorifique'),
    ('double essieu');

INSERT INTO
    public.truck(license_plate)
VALUES
    ('AC-543-AG'),
    ('AD-671-KA'),
    ('AH-126-GG'),
    ('AM-654-TU'),
    ('BA-865-PF'),
    ('BA-921-AA'),
    ('CK-221-KW'),
    ('CL-128-TR'),
    ('CN-225-AB');

INSERT INTO
    public.unavailability(truck, comments)
VALUES
    ('BA-921-AA', 'Au garage pour réparation');

INSERT INTO
    public.driver(
        first_name,
        last_name,
        default_truck
    )
VALUES
    ('Arthur', 'DENT', 'AC-543-AG'),
    ('Henry', 'LE ROC''H', 'BA-865-PF'),
    ('Nathalie', 'DUPUIS', 'AH-126-GG'),
    ('Jacques', 'WEBER', 'BA-921-AA'),
    ('David', 'EMOUCHET', 'AD-671-KA'),
    ('Alexandra', 'CE''NEDRA', 'CN-225-AB');

INSERT INTO
    public.loading_point(address)
VALUES
    (1),
    (2),
    (3);

INSERT INTO
    public.product(name)
VALUES
    ('pomme'),
    ('pomme de terre'),
    ('poire'),
    ('kiwi'),
    ('poireau'),
    ('mandarine'),
    ('orange');

INSERT INTO
    public."order"(client)
VALUES
    ('KAEDE'),
    ('KASUMI'),
    ('KUROMU'),
    ('KASUMI'),
    ('KUROMU');

INSERT INTO
    public.order_content(
        "order",
        product,
        quantity,
        desired_delivery_date,
        delivery_point
    )
VALUES
    (1, 1, 500, '2021-11-15', 1),
    (1, 2, 800, '2021-11-15', 1),
    (2, 3, 200, '2021-11-15', 8),
    (3, 4, 100, '2021-11-17', 7),
    (4, 5, 200, '2021-11-18', 8),
    (4, 2, 600, '2021-11-18', 8),
    (5, 6, 200, '2021-11-22', 6),
    (5, 7, 400, '2021-11-22', 6);

INSERT INTO
    public.mission(
        driver,
        truck,
        loading_point,
        loading_time
    )
VALUES
    (1, 'AC-543-AG', 1, '2021-11-15 06:00:00'),
    (6, 'CN-225-AB', 1, '2021-11-18 08:00:00');

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