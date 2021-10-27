package ecn.tp.bddon.server.metier.dto.postgres.creations;

import lombok.Data;

@Data
public class SchedulingToCreate {

    private String cron;
    private String email;

}
