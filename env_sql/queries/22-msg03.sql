-- Q3. Trouver les missions du camion 'AC-453-AG' dont le temps de livraison prévu est dans un domaine spécifique.

select mission_id,
       order_id,
       client,
       name,
       quantity,
       desired_delivery_date
from order_content
join product on product = product_id
join "order" on "order" = order_id
join supported_by on order_content = order_content_id
join mission on mission = mission_id
where truck = 'AC-543-AG'
    and extract(year
                from planned_delivery_time) = 2021
    and extract(month
                from planned_delivery_time) between 9 and 11
order by mission_id,
         order_id;

