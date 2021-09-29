/** Q3 : le camion AC-543-AG est mis en réparation, et il “faudrait
 *  informer le service clientèle ou la logistique s'il a une
 * commande prévue d'ici fin novembre”.
 */
BEGIN;

-- Marquer le camion concerné comme non opérationnel.
INSERT INTO
    unavailability(truck, end_date, comments)
VALUES ('AC-543-AG', '2021-10-30', 'Au garage pour réparation');

-- Mettre à jour les missions dont le temps de livraison prévu est dans un domaine spécifique.
UPDATE
    mission
SET
    truck = NULL
FROM
    supported_by
WHERE
    mission = mission_id
    AND truck = 'AC-543-AG'
    AND extract(
        year
        from
            planned_delivery_time
    ) = 2021
    AND extract(
        month
        from
            planned_delivery_time
    ) BETWEEN 9
    AND 11;

END;