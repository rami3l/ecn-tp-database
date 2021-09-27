package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.Client;

public interface MissionRestRepository extends CrudRepository<Client, Integer> {

}
