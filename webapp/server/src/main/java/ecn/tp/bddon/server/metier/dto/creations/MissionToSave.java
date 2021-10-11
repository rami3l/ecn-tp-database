package ecn.tp.bddon.server.metier.dto.creations;

import lombok.Data;

@Data
public class MissionToSave {

    private String loadingTime;
    private int loadingPointId;
    private int driverId;
    private String truckId;

}
