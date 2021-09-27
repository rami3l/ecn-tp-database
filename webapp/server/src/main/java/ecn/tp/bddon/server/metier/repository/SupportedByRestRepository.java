package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.Client;
import ecn.tp.bddon.server.metier.dto.idClasses.SupportedById;

public interface SupportedByRestRepository extends CrudRepository<Client, SupportedById> {

}
