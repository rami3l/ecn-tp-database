package ecn.tp.bddon.server.metier.dto.id_classes;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CertifiedForId implements Serializable {

    private int driverId;
    private int truckTypeId;

}
