/** Q2 : Je n'arrive pas à savoir qui utilise quel camion. Vous pouvez me sortir ça ?
 */
select first_name,
       last_name,
       truck
from public.mission
join driver on driver=driver_id;