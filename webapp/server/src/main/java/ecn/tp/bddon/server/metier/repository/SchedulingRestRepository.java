package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.Scheduling;

public interface SchedulingRestRepository extends CrudRepository<Scheduling, Integer> {

}
