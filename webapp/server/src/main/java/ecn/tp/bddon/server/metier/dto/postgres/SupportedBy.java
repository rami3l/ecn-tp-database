package ecn.tp.bddon.server.metier.dto.postgres;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import ecn.tp.bddon.server.metier.dto.postgres.id_classes.SupportedById;
import ecn.tp.bddon.server.utils.DateParser;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "supported_by")
@IdClass(SupportedById.class)
@Data
@NoArgsConstructor
public class SupportedBy implements Serializable {

    @Column(name = "planned_delivery_time")
    private Timestamp plannedDeliveryTime;

    @Column(name = "signature_time")
    private Timestamp signatureTime;

    @Column(name = "is_delivered")
    private boolean delivered;

    @Id
    @Column(name = "order_content")
    private int orderContentId;

    @Id
    @Column(name = "mission")
    private int missionId;

    public void setPlannedDeliveryTime(String date) {
        this.plannedDeliveryTime = DateParser.getTimeStampFromStringDate(date);
    }

    public void setSignatureTime(String date) {
        this.signatureTime = DateParser.getTimeStampFromStringDate(date);
    }

}
