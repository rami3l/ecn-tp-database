-- Q11. Add a new truck driver.
 BEGIN;


INSERT INTO public.driver(first_name, last_name, default_truck)
VALUES ('Pierre',
        'KIMOUS',
        NULL); -- ! No truck info provided, oops!

END;