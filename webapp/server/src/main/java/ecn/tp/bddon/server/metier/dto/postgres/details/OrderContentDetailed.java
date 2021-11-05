package ecn.tp.bddon.server.metier.dto.postgres.details;

import ecn.tp.bddon.server.metier.dto.postgres.DeliveryPoint;
import ecn.tp.bddon.server.metier.dto.postgres.Order;
import ecn.tp.bddon.server.metier.dto.postgres.OrderContent;
import ecn.tp.bddon.server.metier.dto.postgres.Product;
import lombok.Data;
import lombok.NonNull;

@Data
public class OrderContentDetailed {

    private int id;
    private int quantity;
    private String desiredDeliveryDate;
    private Product product;
    private Order order;
    private DeliveryPoint deliveryPoint;

    public OrderContentDetailed(@NonNull OrderContent orderContent) {
        this.id = orderContent.getId();
        this.quantity = orderContent.getQuantity();
        this.desiredDeliveryDate = orderContent.getDesiredDeliveryDate();
        this.product = orderContent.getProduct();
        this.order = orderContent.getOrder();
        this.deliveryPoint = orderContent.getDeliveryPoint();
    }

}
