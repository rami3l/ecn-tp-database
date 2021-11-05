package ecn.tp.bddon.server.metier.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.SupportedBy;
import ecn.tp.bddon.server.metier.dto.postgres.id_classes.SupportedById;

public interface SupportedByRestRepository extends CrudRepository<SupportedBy, SupportedById> {
    public List<SupportedBy> findAllByMissionId(int missionId);
}
