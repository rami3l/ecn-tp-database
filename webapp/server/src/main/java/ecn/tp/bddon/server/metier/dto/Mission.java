package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ecn.tp.bddon.server.utils.DateParser;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mission")
@Data
@NoArgsConstructor
public class Mission implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mission_id")
    private int id;

    @Column(name = "loading_time")
    private Timestamp loadingTime;

    @ManyToOne
    @JoinColumn(name = "loading_point")
    private LoadingPoint loadingPoint;

    @ManyToOne
    @JoinColumn(name = "driver")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "truck")
    private Truck truck;

    public void setLoadingTime(String date) {
        this.loadingTime = DateParser.getTimeStampFromStringDate(date);
    }

}
