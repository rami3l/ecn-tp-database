package ecn.tp.bddon.server.metier.services;

import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.Mission;
import ecn.tp.bddon.server.metier.dto.OrderContent;
import ecn.tp.bddon.server.metier.repository.MissionRestRepository;

@Service
public class MissionService {

    @Resource
    private MissionRestRepository missionRestRepository;

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

    public Iterable<OrderContent> getOrderContents(int missionId) {
        return getMission(missionId).getSupports().stream().map(support -> support.getOrderContent()).toList();
    }

}
