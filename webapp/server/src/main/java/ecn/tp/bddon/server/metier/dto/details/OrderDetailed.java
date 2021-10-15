package ecn.tp.bddon.server.metier.dto.details;

import ecn.tp.bddon.server.metier.dto.Order;
import lombok.Data;
import lombok.NonNull;

@Data
public class OrderDetailed {

    private int id;
    private ClientDetailed client;

    public OrderDetailed(@NonNull Order order) {
        this.id = order.getId();
        this.client = new ClientDetailed(order.getClient());
    }
}
