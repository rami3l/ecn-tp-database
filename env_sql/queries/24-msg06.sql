-- Q6 : trouver les missions de Henry LE ROC’H à partir de décembre.
select
    mission_id
from
    mission
    join driver on driver = driver_id
where
    first_name ilike 'henry'
    and last_name ilike 'le roc''h'
    and date(loading_time) >= '2021-12-01' :: date;