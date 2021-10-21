-- Q9. Add the triggers on stock when we create, cancel or modify an order.
 BEGIN;


CREATE OR REPLACE FUNCTION public.stock_update() RETURNS trigger LANGUAGE 'plpgsql' NOT LEAKPROOF AS $BODY$
begin
-- new :: supported_by, influence :: stock
update stock as s
set quantity = s.quantity + (case
 when tg_op = 'INSERT' then -o.quantity
 when tg_op = 'DELETE' then o.quantity
 when tg_op = 'UPDATE' and not new.is_delivered then o.quantity
 else 0
 end)
from product p, order_content o, supported_by sup, mission m
where o.product = product_id
  and product_id = s.product
  and sup.order_content = order_content_id
  and sup.mission = mission_id
  and s.loading_point = m.loading_point;

return new;
end;
$BODY$;


ALTER FUNCTION public.stock_update() OWNER TO postgres;


DROP TRIGGER IF EXISTS stock_update on public.supported_by;

CREATE TRIGGER stock_update AFTER
DELETE
OR
UPDATE OF signature_time
OR
INSERT ON public.supported_by
FOR EACH ROW EXECUTE FUNCTION public.stock_update();

END;