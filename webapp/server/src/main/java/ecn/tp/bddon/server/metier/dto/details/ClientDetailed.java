package ecn.tp.bddon.server.metier.dto.details;

import ecn.tp.bddon.server.metier.dto.Address;
import ecn.tp.bddon.server.metier.dto.Client;
import lombok.Data;

@Data
public class ClientDetailed {

    private String abbrev;
    private String name;
    private Address address;

    public ClientDetailed(Client client) {
        this.abbrev = client.getAbbrev();
        this.name = client.getName();
        this.address = client.getAddress();
    }

}
