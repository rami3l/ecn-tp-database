package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.Truck;

public interface TruckRestRepository extends CrudRepository<Truck, String> {

}
