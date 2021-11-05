package ecn.tp.bddon.server.metier.services.rest;

import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.postgres.Mission;
import ecn.tp.bddon.server.metier.dto.postgres.SupportedBy;
import ecn.tp.bddon.server.metier.dto.postgres.creations.MissionToSave;
import ecn.tp.bddon.server.metier.dto.postgres.creations.SupportedByToSave;
import ecn.tp.bddon.server.metier.dto.postgres.id_classes.SupportedById;
import ecn.tp.bddon.server.metier.repository.MissionRestRepository;
import ecn.tp.bddon.server.metier.repository.SupportedByRestRepository;

@Service
public class MissionService {

    public static final int MISSION_OK = 1;
    public static final int MISSION_KO = -1;
    public static final int MISSION_BEGUN = 2;
    public static final int MISSION_NOT_BEGUN = 0;

    @Resource
    private MissionRestRepository missionRestRepository;
    @Resource
    private SupportedByRestRepository supportedByRestRepository;
    @Resource
    private PlacesService placesService;
    @Resource
    private TransportService transportService;

    public Iterable<Mission> getMissions() {
        return missionRestRepository.findAll();
    }

    public Mission getMission(int missionId) {
        Optional<Mission> mission = missionRestRepository.findById(missionId);
        if (mission.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return mission.get();
    }

    public Iterable<SupportedBy> getSupports(int missionId) {
        return supportedByRestRepository.findAllByMissionId(missionId);
    }

    public int save(MissionToSave missionToSave) {
        return save(missionToSave, null);
    }

    public int save(MissionToSave missionToSave, Integer id) {
        Mission mission = new Mission();
        if (id != null) {
            mission.setId(id);
        }
        mission.setLoadingTime(missionToSave.getLoadingTime());
        mission.setLoadingPoint(placesService.getLoadingPoint(missionToSave.getLoadingPointId()));
        mission.setDriver(transportService.getDriver(missionToSave.getDriverId()));
        String licencePlate = missionToSave.getTruckId();
        if (licencePlate != null) {
            mission.setTruck(transportService.getTruck(licencePlate));
        }
        missionRestRepository.save(mission);
        return mission.getId();
    }

    public void save(SupportedByToSave supportedByToSave) {
        SupportedBy supportedBy = new SupportedBy();
        supportedBy.setPlannedDeliveryTime(supportedByToSave.getPlannedDeliveryTime());
        supportedBy.setOrderContentId(supportedByToSave.getOrderContentId());
        supportedBy.setMissionId(supportedByToSave.getMissionId());
        supportedBy.setDelivered(supportedByToSave.isDelivered());
        supportedBy.setSignatureTime(supportedByToSave.getSignatureTime());
        supportedByRestRepository.save(supportedBy);
    }

    public void deleteSupportedBy(int orderContentId, int missionId) {
        supportedByRestRepository.deleteById(new SupportedById(orderContentId, missionId));
    }

    public int isMissionFinished(int id) {
        int nbSupportFinished = 0;
        List<SupportedBy> supports = supportedByRestRepository.findAllByMissionId(id);
        for (SupportedBy support : supports) {
            if (support.getSignatureTime() != null) {
                nbSupportFinished++;
            }
        }
        if (0 < nbSupportFinished && nbSupportFinished < supports.size()) {
            return MISSION_BEGUN;
        }
        if (nbSupportFinished == 0) {
            return MISSION_NOT_BEGUN;
        }
        for (SupportedBy support : supports) {
            if (support.getSignatureTime() != null && !support.isDelivered()) {
                return MISSION_KO;
            }
        }
        return MISSION_OK;
    }

}
