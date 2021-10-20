-- Q11. Add a new truck driver.
 BEGIN;


INSERT INTO public.driver(first_name, last_name, default_truck)
VALUES ('Pierre',
        'KIMOUS',
        NULL); -- ! No truck info provided, oops!


INSERT INTO public.certified_for(driver, truck_type)
VALUES (
                (
                        select driver_id
                        from driver
                        where first_name ilike 'pierre'
                                and last_name ilike 'kimous'
                ),
                1
        ),
        (
                (
                        select driver_id
                        from driver
                        where first_name ilike 'pierre'
                                and last_name ilike 'kimous'
                ),
                2
        );

END;