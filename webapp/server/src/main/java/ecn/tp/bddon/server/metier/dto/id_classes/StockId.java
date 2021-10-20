package ecn.tp.bddon.server.metier.dto.id_classes;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockId implements Serializable {

    private int loadingPointId;
    private int productId;

}
