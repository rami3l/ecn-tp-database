package ecn.tp.bddon.server.metier.dto.postgres;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "driver")
@Data
@NoArgsConstructor
public class Driver implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "driver_id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToOne
    @JoinColumn(name = "default_truck")
    private Truck defaultTruck;

    @JsonIgnore
    @OneToMany(mappedBy = "driverId", fetch = FetchType.LAZY)
    private List<CertifiedFor> certifications = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "driver", fetch = FetchType.LAZY)
    private List<Mission> missions = new ArrayList<>();

}
