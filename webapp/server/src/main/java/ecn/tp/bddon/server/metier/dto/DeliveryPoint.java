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

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @JoinColumn(name = "address")
    private Address address;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "client")
    private Client client;

}
