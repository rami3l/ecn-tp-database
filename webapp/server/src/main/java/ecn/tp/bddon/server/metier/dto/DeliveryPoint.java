package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client", uniqueConstraints = @UniqueConstraint(columnNames = { "delivery_point_id" }))
@Data
@NoArgsConstructor
public class DeliveryPoint implements Serializable {

    @Id
    @Column(name = "delivery_point_id")
    protected int id;

    @OneToOne
    @JoinColumn(name = "address")
    protected Address address;

    @ManyToOne
    @JoinColumn(name = "client")
    protected Client client;

}
