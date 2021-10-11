package ecn.tp.bddon.server.metier.services;

import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.Mission;
import ecn.tp.bddon.server.metier.dto.SupportedBy;
import ecn.tp.bddon.server.metier.repository.MissionRestRepository;
import ecn.tp.bddon.server.metier.repository.SupportedByRestRepository;

@Service
public class MissionService {

    @Resource
    private MissionRestRepository missionRestRepository;
    @Resource
    private SupportedByRestRepository supportedByRestRepository;

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

}
