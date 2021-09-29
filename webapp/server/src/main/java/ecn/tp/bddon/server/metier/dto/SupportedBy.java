package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ecn.tp.bddon.server.metier.dto.idClasses.SupportedById;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "supported_by")
@IdClass(SupportedById.class)
@Data
@NoArgsConstructor
public class SupportedBy implements Serializable {

    @Column(name = "planned_delivery_time")
    private String plannedDeliveryTime;

    @Column(name = "signature_time")
    private String signatureTime;

    @Column(name = "is_delivered")
    private boolean isDelivered;

    @Id
    @ManyToOne
    @JoinColumn(name = "order_content")
    private OrderContent orderContent;

    @Id
    @ManyToOne
    @JoinColumn(name = "mission")
    private Mission mission;

}
