package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.Order;

public interface OrderRestRepository extends CrudRepository<Order, Integer> {

}