package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.OrderContent;

public interface OrderContentRestRepository extends CrudRepository<OrderContent, Integer> {

    @Query(value = "select * from order_content where order_content_id not in ( select order_content from supported_by where signature_time is NULL or is_delivered = true)", nativeQuery = true)
    Iterable<OrderContent> findAllUnsupportedOrUndelivered();

    // Iterable<OrderContent> findAll_OrderContentId_NotInSupportedBy();
}
