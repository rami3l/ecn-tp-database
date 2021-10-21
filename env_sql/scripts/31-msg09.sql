-- Q9. Add the triggers on stock when we create, cancel or modify an order.
 BEGIN;


CREATE OR REPLACE FUNCTION public.stock_update() RETURNS trigger LANGUAGE 'plpgsql' NOT LEAKPROOF AS $BODY$
  -- new :: supported_by, influence :: stock
declare
  stock_loading_point integer; -- loading_point concerned by the change
  stock_product integer; -- product concerned by the change
  quantity_change integer; -- quantity change of the product
begin
  -- get the loading_point concerned by the change
  select loading_point from mission m
  where m.mission_id = (case when tg_op = 'DELETE' then old.mission else new.mission end)
  into stock_loading_point;

  -- get the product concerned by the change and the quantity change
  select product, quantity from order_content o_c
  where o_c.order_content_id = (case when tg_op = 'DELETE' then old.order_content else new.order_content end)
  into stock_product, quantity_change;

  -- if the quantity doesn't already exists, we initialize it
  if(not exists( select 1 from stock s where s.loading_point = stock_loading_point and s.product = stock_product )) then
    insert into stock(loading_point, product, quantity)
    values (stock_loading_point, stock_product, 0);
  end if;
  -- update the quantity of the product in the loading_point
  update stock as s
    set quantity = s.quantity + (case
      when tg_op = 'INSERT' then -quantity_change
      when tg_op = 'DELETE' or (tg_op = 'UPDATE' and not new.is_delivered) then quantity_change
      else 0
    end)
    where s.product = stock_product and s.loading_point = stock_loading_point;
  RETURN null;
end;

$BODY$;


ALTER FUNCTION public.stock_update() OWNER TO postgres;


DROP TRIGGER IF EXISTS stock_update on public.supported_by;

CREATE TRIGGER stock_update AFTER
DELETE  -- we update the stock when we remove an order_content from a mission (delete the supported_by)...
OR UPDATE OF signature_time  -- ... or when we validate that the delivery is not done (when we sign, leaving is_delivered to false)...
OR INSERT ON public.supported_by -- ... or where we add an order_content to a mission
FOR EACH ROW EXECUTE FUNCTION public.stock_update();

END;