package ecn.tp.bddon.server.metier.dto.postgres.creations;

import lombok.Data;

@Data
public class SupportedByToSave {

    private String plannedDeliveryTime;
    private int orderContentId;
    private int missionId;
    private boolean delivered;
    private String signatureTime;

}
