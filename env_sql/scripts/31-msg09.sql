-- Q9. Add the triggers on stock when we create, cancel or modify an order.

CREATE OR REPLACE FUNCTION public.stock_update() RETURNS trigger LANGUAGE 'plpgsql' NOT LEAKPROOF AS $BODY$
begin
-- new :: order_content, influence :: stock
update stock as s
set quantity = s.quantity + (case
 when tg_op = 'INSERT' then -new.quantity
 when tg_op = 'UPDATE' then old.quantity - new.quantity
 when tg_op = 'DELETE' then old.quantity
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


CREATE TRIGGER stock_update AFTER
DELETE
OR
UPDATE
OR
INSERT ON public.order_content
FOR EACH ROW EXECUTE FUNCTION public.stock_update();

