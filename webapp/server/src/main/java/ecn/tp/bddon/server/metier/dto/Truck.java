package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "truck")
@Data
@NoArgsConstructor
public class Truck implements Serializable {

    @Id
    @Column(name = "license_plate")
    private String licensePlate;

}
