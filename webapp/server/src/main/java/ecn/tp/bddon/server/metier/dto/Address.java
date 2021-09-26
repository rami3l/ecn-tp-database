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
@Table(name = "client", uniqueConstraints = @UniqueConstraint(columnNames = { "address_id" }))
@Data
@NoArgsConstructor
public class Address implements Serializable {

    @Id
    @Column(name = "address_id")
    protected String id;

    @Column(name = "address_line")
    protected String addressLine;

    protected String zipcode;

    protected String city;

}
