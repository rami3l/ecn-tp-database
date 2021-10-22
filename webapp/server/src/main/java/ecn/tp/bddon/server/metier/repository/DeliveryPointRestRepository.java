package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.Client;
import ecn.tp.bddon.server.metier.dto.postgres.DeliveryPoint;

public interface DeliveryPointRestRepository extends CrudRepository<DeliveryPoint, Integer> {

    public Iterable<DeliveryPoint> getDeliveryPointsByClient(Client client);
}
