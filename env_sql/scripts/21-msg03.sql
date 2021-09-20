/** Q3 : le camion AC-543-AG est mis en réparation, et il “faudrait
 *  informer le service clientèle ou la logistique s'il a une
 * commande prévue d'ici fin novembre”.
 */
BEGIN;

-- Marquer le camion concerné comme non opérationnel.
UPDATE
    truck
SET
    is_functional = FALSE,
    comments = 'au garage pour réparation'
WHERE
    license_plate = 'AC-543-AG';

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
    ) >= 9
    AND extract(
        month
        from
            planned_delivery_time
    ) <= 11;

END;