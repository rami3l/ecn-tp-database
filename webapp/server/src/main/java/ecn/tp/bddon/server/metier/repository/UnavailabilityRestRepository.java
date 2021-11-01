package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.Unavailability;

public interface UnavailabilityRestRepository extends CrudRepository<Unavailability, Integer> {

}
