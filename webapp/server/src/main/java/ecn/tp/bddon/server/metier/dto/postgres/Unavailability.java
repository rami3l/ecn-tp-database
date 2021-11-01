package ecn.tp.bddon.server.metier.dto.postgres;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ecn.tp.bddon.server.utils.DateParser;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "unavailability")
@Data
@NoArgsConstructor
public class Unavailability implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "unavailability_id")
    private int id;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column
    private String comments;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "truck")
    private Truck truck;

    public void setStartDate(String date) {
        this.startDate = DateParser.parseSqlDate(date);
    }

    public void setEndDate(String date) {
        this.endDate = DateParser.parseSqlDate(date);
    }

}
