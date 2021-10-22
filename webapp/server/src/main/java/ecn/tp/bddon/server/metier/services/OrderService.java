package ecn.tp.bddon.server.metier.services;

import java.util.Optional;
import java.util.stream.StreamSupport;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.postgres.Order;
import ecn.tp.bddon.server.metier.dto.postgres.OrderContent;
import ecn.tp.bddon.server.metier.dto.postgres.details.OrderContentDetailed;
import ecn.tp.bddon.server.metier.dto.postgres.details.OrderDetailed;
import ecn.tp.bddon.server.metier.repository.OrderContentRestRepository;
import ecn.tp.bddon.server.metier.repository.OrderRestRepository;

@Service
public class OrderService {

    @Resource
    private OrderRestRepository orderRestRepository;
    @Resource
    private OrderContentRestRepository orderContentRestRepository;

    public Iterable<Order> getOrders() {
        return orderRestRepository.findAll();
    }

    public Order getOrder(int orderId) {
        Optional<Order> order = orderRestRepository.findById(orderId);
        if (order.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return order.get();
    }

    public Iterable<OrderDetailed> getOrdersDetailed() {
        return StreamSupport.stream(getOrders().spliterator(), true).map(OrderDetailed::new).toList();
    }

    public OrderDetailed getOrderDetailed(int orderId) {
        return new OrderDetailed(getOrder(orderId));
    }

    public Iterable<OrderContent> getOrderContents() {
        return orderContentRestRepository.findAll();
    }

    public OrderContent getOrderContent(int id) {
        Optional<OrderContent> orderContent = orderContentRestRepository.findById(id);
        if (orderContent.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return orderContent.get();
    }

    public Iterable<OrderContentDetailed> getOrderContentsDetailed() {
        return StreamSupport.stream(getOrderContents().spliterator(), true).map(OrderContentDetailed::new).toList();
    }

    public Iterable<OrderContent> getOrderContentsByOrder(int orderId) {
        return orderContentRestRepository.findByOrder_id(orderId);
    }

    public Iterable<OrderContentDetailed> getOrderContentsDetailedByOrder(int orderId) {
        return StreamSupport.stream(getOrderContentsByOrder(orderId).spliterator(), true).map(OrderContentDetailed::new)
                .toList();
    }

    public OrderContentDetailed getOrderContentDetailed(int id) {
        return new OrderContentDetailed(getOrderContent(id));
    }

    public Iterable<OrderContentDetailed> getOrderContentsUnsupportedOrUndeliveredDetailed() {
        return StreamSupport.stream(orderContentRestRepository.findAllUnsupportedOrUndelivered().spliterator(), true)
                .map(OrderContentDetailed::new).toList();
    }

}
