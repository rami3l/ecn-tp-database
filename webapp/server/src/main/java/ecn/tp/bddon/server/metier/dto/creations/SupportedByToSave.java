package ecn.tp.bddon.server.metier.dto.creations;

import lombok.Data;

@Data
public class SupportedByToSave {

    private String plannedDeliveryTime;
    private int orderContentId;
    private int missionId;

}
