package ecn.tp.bddon.server.metier.services;

import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.Mission;
import ecn.tp.bddon.server.metier.dto.SupportedBy;
import ecn.tp.bddon.server.metier.dto.creations.MissionToSave;
import ecn.tp.bddon.server.metier.dto.creations.SupportedByToSave;
import ecn.tp.bddon.server.metier.dto.id_classes.SupportedById;
import ecn.tp.bddon.server.metier.repository.MissionRestRepository;
import ecn.tp.bddon.server.metier.repository.SupportedByRestRepository;

@Service
public class MissionService {

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
        supportedByRestRepository.save(supportedBy);
    }

    public void deleteSupportedBy(int orderContentId, int missionId) {
        supportedByRestRepository.deleteById(new SupportedById(orderContentId, missionId));
    }

}
