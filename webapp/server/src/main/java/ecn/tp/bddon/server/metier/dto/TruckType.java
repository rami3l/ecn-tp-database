package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "truck_type")
@Data
@NoArgsConstructor
public class TruckType implements Serializable {

    @Id
    @Column(name = "truck_type_id")
    private String id;

    @Column(name = "truck_type_name")
    private String truckTypeName;

}
