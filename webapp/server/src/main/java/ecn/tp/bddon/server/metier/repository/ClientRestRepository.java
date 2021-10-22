package ecn.tp.bddon.server.metier.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.Client;

public interface ClientRestRepository extends CrudRepository<Client, String> {

    public Optional<Client> findByAbbrevIgnoreCase(String abbrev);

}
