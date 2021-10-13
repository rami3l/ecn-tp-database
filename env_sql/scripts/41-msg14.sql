-- Q14. Add certification infor for Alexandra Ce'Nedra.
BEGIN;

INSERT INTO public.certified_for(driver, truck_type)
VALUES (
                (
                        select driver_id
                        from driver
                        where first_name ilike 'Alexandra'
                                and last_name ilike 'Ce''Nedra'
                ),
                1
        ),
        (
                (
                        select driver_id
                        from driver
                        where first_name ilike 'Alexandra'
                                and last_name ilike 'Ce''Nedra'
                ),
                2
        );

END;