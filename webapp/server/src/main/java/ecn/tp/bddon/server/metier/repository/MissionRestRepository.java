package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.Mission;

public interface MissionRestRepository extends CrudRepository<Mission, Integer> {

}
