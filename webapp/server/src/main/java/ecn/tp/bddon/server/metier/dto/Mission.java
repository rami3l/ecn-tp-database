package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mission")
@Data
@NoArgsConstructor
public class Mission implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "mission_id")
    private int id;

    @Column(name = "loading_time")
    private String loadingTime;

    @ManyToOne
    @JoinColumn(name = "loading_point")
    private LoadingPoint loadingPoint;

    @ManyToOne
    @JoinColumn(name = "driver")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "truck")
    private Truck truck;

    @JsonIgnore
    @OneToMany(mappedBy = "mission")
    private List<SupportedBy> supports = new ArrayList<>();

}
