package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import ecn.tp.bddon.server.metier.dto.id_classes.StockId;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stock")
@IdClass(StockId.class)
@Data
@NoArgsConstructor
public class Stock implements Serializable {

    @Id
    @Column(name = "loading_point")
    private int loadingPointId;

    @Id
    @Column(name = "product")
    private int productId;

    private int quantity;

}
