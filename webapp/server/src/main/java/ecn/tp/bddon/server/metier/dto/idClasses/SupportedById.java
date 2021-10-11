package ecn.tp.bddon.server.metier.dto.idClasses;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupportedById implements Serializable {

    private int orderContentId;
    private int missionId;

}
