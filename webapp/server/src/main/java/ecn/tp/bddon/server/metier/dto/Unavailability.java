package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "unavailability")
@Data
@NoArgsConstructor
public class Unavailability implements Serializable {

    @Id
    @Column(name = "unavailability_id")
    private String unavailabilityId;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column
    private String comments;

    @JoinColumn(name = "truck")
    private Truck truck;

}
