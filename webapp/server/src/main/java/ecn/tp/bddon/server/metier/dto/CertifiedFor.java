package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import ecn.tp.bddon.server.metier.dto.id_classes.CertifiedForId;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "certified_for")
@IdClass(CertifiedForId.class)
@Data
@NoArgsConstructor
public class CertifiedFor implements Serializable {

    @Id
    @Column(name = "driver")
    private int driverId;

    @Id
    @Column(name = "truck_type")
    private int truckTypeId;

}
