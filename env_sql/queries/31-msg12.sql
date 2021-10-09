-- Q12. Find all activities of Henry LE ROC’H in 2021.

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
join driver on driver = driver_id
where first_name ilike 'henry'
    and last_name ilike 'le roc''h'
    and extract(year
                from planned_delivery_time) = 2021
order by order_id;