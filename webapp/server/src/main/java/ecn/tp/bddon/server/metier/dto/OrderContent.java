package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_content")
@Data
@NoArgsConstructor
public class OrderContent implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "order_content_id")
    private int id;

    private int quantity;

    @Column(name = "desired_delivery_date")
    private String desiredDeliveryDate;

    @ManyToOne
    @JoinColumn(name = "product")
    private Product product;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order")
    private Order order;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "delivery_point")
    private DeliveryPoint deliveryPoint;

}
