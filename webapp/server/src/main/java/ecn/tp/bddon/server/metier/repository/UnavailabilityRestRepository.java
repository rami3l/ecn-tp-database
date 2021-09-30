package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.Unavailability;

public interface UnavailabilityRestRepository extends CrudRepository<Unavailability, String> {

}
