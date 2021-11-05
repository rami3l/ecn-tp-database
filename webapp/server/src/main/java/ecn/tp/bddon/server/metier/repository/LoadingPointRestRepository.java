package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.LoadingPoint;

public interface LoadingPointRestRepository extends CrudRepository<LoadingPoint, Integer> {

}
