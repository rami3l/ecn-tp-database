package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client", uniqueConstraints = @UniqueConstraint(columnNames = { "driver_id" }))
@Data
@NoArgsConstructor
public class Driver implements Serializable {

    @Id
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
