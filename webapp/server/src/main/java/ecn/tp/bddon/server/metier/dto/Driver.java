package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
    protected int id;

    @Column(name = "first_name")
    protected String firtsName;

    @Column(name = "last_name")
    protected String lastName;

    @OneToOne
    @JoinColumn(name = "default_truck")
    protected Truck defaultTruck;

}
