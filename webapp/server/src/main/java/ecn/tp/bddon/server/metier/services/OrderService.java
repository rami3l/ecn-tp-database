package ecn.tp.bddon.server.metier.services;

import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.Order;
import ecn.tp.bddon.server.metier.dto.OrderContent;
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
}
