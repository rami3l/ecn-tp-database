package ecn.tp.bddon.server.metier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import ecn.tp.bddon.server.metier.dto.postgres.Stock;
import ecn.tp.bddon.server.metier.dto.postgres.id_classes.StockId;

public interface StockRestRepository extends CrudRepository<Stock, StockId> {

    @Query("SELECT SUM(s.quantity) FROM Stock s WHERE productId= :id")
    public Integer getProductQuantity(@Param("id") int id);

    public Optional<Stock> findByLoadingPointIdAndProductId(int loadingPointId, int productId);

}
