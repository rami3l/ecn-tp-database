package ecn.tp.bddon.server.metier.dto.postgres.creations;

import lombok.Data;

@Data
public class SchedulingToSave {

    private String cron;
    private String email;

}
