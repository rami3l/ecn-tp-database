package ecn.tp.bddon.server.metier.dto.postgres.creations;

import lombok.Data;

@Data
public class UnavailabilityToSave {

    private String startDate;
    private String endDate;
    private String comment;

}
