package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.TruckType;

public interface TruckTypeRestRepository extends CrudRepository<TruckType, Integer> {

}
