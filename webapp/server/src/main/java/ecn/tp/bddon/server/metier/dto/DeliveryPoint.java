package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "delivery_point")
@Data
@NoArgsConstructor
public class DeliveryPoint implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "delivery_point_id")
    private int id;

    @OneToOne
    @JoinColumn
    private Address address;

    @ManyToOne
    @JoinColumn
    private Client client;

}
