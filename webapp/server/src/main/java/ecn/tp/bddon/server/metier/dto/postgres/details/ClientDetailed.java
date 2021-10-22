package ecn.tp.bddon.server.metier.dto.postgres.details;

import ecn.tp.bddon.server.metier.dto.postgres.Address;
import ecn.tp.bddon.server.metier.dto.postgres.Client;
import lombok.Data;
import lombok.NonNull;

@Data
public class ClientDetailed {

    private String abbrev;
    private String name;
    private Address address;

    public ClientDetailed(@NonNull Client client) {
        this.abbrev = client.getAbbrev();
        this.name = client.getName();
        this.address = client.getAddress();
    }

}
