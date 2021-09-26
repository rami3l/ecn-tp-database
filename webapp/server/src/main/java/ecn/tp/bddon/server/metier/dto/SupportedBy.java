package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "supported_by")
@Data
@NoArgsConstructor
public class SupportedBy implements Serializable {

    @Column(name = "planned_delivery_time")
    protected String plannedDeliveryTime;

    @Column(name = "signature_time")
    protected String signatureTime;

    @Column(name = "is_delivered")
    protected boolean isDelivered;

    @Id
    @ManyToOne
    @JoinColumn(name = "order_content")
    protected OrderContent orderContent;

    @Id
    @ManyToOne
    @JoinColumn
    protected Mission mission;

}
