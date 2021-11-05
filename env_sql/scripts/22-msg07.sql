/** Q7 : Ajouter une mission avec:
 * - Chauffeur : Jacques WEBER
 * - Commande : Société KUROMU du 17/11.
 * - Le quai de chargement : celui de Nice.  
 * - Temps du chargement : 7h00 
 */
BEGIN;

INSERT INTO
    public.mission(
        driver,
        truck,
        loading_point,
        loading_time
    )
VALUES
    (4, 'BA-921-AA', 3, '2021-11-17 07:00:00');

INSERT INTO
    public.supported_by(
        mission,
        order_content,
        planned_delivery_time,
        is_delivered
    )
VALUES
    (
        3,
        4,
        -- Le problème c'est que l'on ne sais pas cette livraison est à quelle heure.
        NULL,
        FALSE
    );

END;