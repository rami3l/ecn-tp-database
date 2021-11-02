package ecn.tp.bddon.server.metier.dto.postgres.details;

import java.util.List;

import ecn.tp.bddon.server.metier.dto.postgres.CertifiedFor;
import ecn.tp.bddon.server.metier.dto.postgres.Driver;
import ecn.tp.bddon.server.metier.dto.postgres.Truck;
import lombok.Data;
import lombok.NonNull;

@Data
public class DriverDetailed {

    private int id;
    private String firstName;
    private String lastName;
    private Truck defaultTruck;
    private List<CertifiedFor> certifications;

    public DriverDetailed(@NonNull Driver driver) {
        this.id = driver.getId();
        this.firstName = driver.getFirstName();
        this.lastName = driver.getLastName();
        this.defaultTruck = driver.getDefaultTruck();
        this.certifications = driver.getCertifications();
    }

}
