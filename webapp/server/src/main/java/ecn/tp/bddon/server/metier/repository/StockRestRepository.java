package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import ecn.tp.bddon.server.metier.dto.Stock;

public interface StockRestRepository extends CrudRepository<Stock, Integer> {

    @Query("SELECT SUM(s.quantity) FROM Stock s WHERE productId= :id")
    public Integer getProductQuantity(@Param("id") int id);

}
