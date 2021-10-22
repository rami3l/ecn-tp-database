package ecn.tp.bddon.server.metier.dto.postgres;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "truck")
@Data
@NoArgsConstructor
public class Truck implements Serializable {

    @Id
    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "truck_type")
    private TruckType truckType;

    @JsonIgnore
    @OneToMany(mappedBy = "truck")
    private List<Unavailability> unavailabilities = new ArrayList<>();

}
