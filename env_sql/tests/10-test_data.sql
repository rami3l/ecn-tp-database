/* This test suite verifies that all the info has been correctly imported
 * into the database.
 */
select
    *
from
    truck;

select
    *
from
    driver;

select
    address_line,
    upper(city)
from
    address
    join loading_point on address_id = address;

select
    abbrev,
    client_address.address_line,
    client_address.zipcode,
    client_address.city,
    delivery_address.address_line as "Dépot de livraison",
    delivery_address.city
from
    client
    join delivery_point on client = abbrev
    join address as delivery_address on delivery_point.address = address_id
    join address as client_address on client.address = client_address.address_id;

select
    product.name,
    quantity,
    desired_delivery_date,
    address_line,
    city
from
    order_content
    join product on product_id = product
    join delivery_point on delivery_point = delivery_point_id
    join address on delivery_point.address = address_id;

select
    first_name,
    last_name,
    loading_address.address_line as "Quai de chargement",
    loading_address.city,
    loading_time,
    "order".client,
    delivery_address.address_line as "Dépôt",
    delivery_address.city,
    planned_delivery_time,
    product.name,
    quantity
from
    mission
    join driver on driver = driver_id
    join loading_point on loading_point = loading_point_id
    join address as loading_address on loading_address.address_id = loading_point.address
    join supported_by on mission = mission_id
    join order_content on order_content = order_content_id
    join product on product = product_id
    join delivery_point on delivery_point = delivery_point_id
    join address as delivery_address on delivery_address.address_id = delivery_point.address
    join "order" on "order" = order_id;