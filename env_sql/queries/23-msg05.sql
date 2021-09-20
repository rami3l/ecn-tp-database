-- Q5 : trouver les “commandes en cours pour novembre/décembre” et “si une livraison est programmée”.
select
    order_id,
    client,
    name,
    quantity,
    desired_delivery_date,
    mission is not null as "programmed"
from
    order_content
    join product on product = product_id
    join "order" on "order" = order_id
    left join supported_by on order_content = order_content_id
where
    extract(
        year
        from
            desired_delivery_date
    ) = 2021
    and extract(
        month
        from
            desired_delivery_date
    ) between 11
    and 12
order by
    order_id;