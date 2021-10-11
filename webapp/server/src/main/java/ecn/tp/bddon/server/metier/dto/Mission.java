package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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

    public void setLoadingTime(String timestamp) {
        try {
            SimpleDateFormat DATE_TIME_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = DATE_TIME_FORMAT.parse(timestamp);
            this.loadingTime = new Timestamp(date.getTime());
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
    }

}
