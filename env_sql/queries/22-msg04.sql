-- Q4 : Touver des camions non attribué à quelqu'un dans la liste des camions
select
    license_plate
from
    driver
    right join truck on license_plate = default_truck
where
    driver_id is null;