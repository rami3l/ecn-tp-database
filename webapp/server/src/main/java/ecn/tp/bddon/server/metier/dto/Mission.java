package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
    @JoinColumn
    private Driver driver;

    @ManyToOne
    @JoinColumn
    private Truck truck;

}
