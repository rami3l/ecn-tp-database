package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client", uniqueConstraints = @UniqueConstraint(columnNames = { "license_plate" }))
@Data
@NoArgsConstructor
public class Truck implements Serializable {

    @Id
    @Column(name = "license_plate")
    protected String licensePlate;

    @Column(name = "is_functional")
    protected boolean isFunctional;

    protected String comment;

}
