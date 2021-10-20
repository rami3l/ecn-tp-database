-- Q15. Add certification infor for David Emouchet.
BEGIN;

INSERT INTO public.certified_for(driver, truck_type)
VALUES (
                (
                        select driver_id
                        from driver
                        where first_name ilike 'David'
                                and last_name ilike 'Emouchet'
                ),
                1
        );

END;