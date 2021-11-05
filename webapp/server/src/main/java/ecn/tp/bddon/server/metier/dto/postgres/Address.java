package ecn.tp.bddon.server.metier.dto.postgres;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "address")
@Data
@NoArgsConstructor
public class Address implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "address_id")
    private int id;

    @Column(name = "address_line")
    private String addressLine;

    private String zipcode;

    private String city;

}
