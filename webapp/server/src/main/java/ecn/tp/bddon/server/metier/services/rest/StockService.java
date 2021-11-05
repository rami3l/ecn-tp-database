package ecn.tp.bddon.server.metier.services.rest;

import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.postgres.Product;
import ecn.tp.bddon.server.metier.dto.postgres.Stock;
import ecn.tp.bddon.server.metier.dto.postgres.details.ProductDetailed;
import ecn.tp.bddon.server.metier.repository.ProductRestRepository;
import ecn.tp.bddon.server.metier.repository.StockRestRepository;

@Service
public class StockService {

    @Resource
    private ProductRestRepository productRestRepository;
    @Resource
    private StockRestRepository stockRestRepository;

    public Iterable<Product> getProducts() {
        return productRestRepository.findAll();
    }

    public ProductDetailed getProduct(int id) {
        Optional<Product> product = productRestRepository.findById(id);
        if (product.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return new ProductDetailed(product.get());
    }

    public int getProductQuantity(int id) {
        Integer quantity = stockRestRepository.getProductQuantity(id);
        return quantity == null ? 0 : quantity;
    }

    public int getProductQuantityByLoadingPoint(int id, int loadingPointId) {
        Optional<Stock> stock = stockRestRepository.findByLoadingPointIdAndProductId(loadingPointId, id);
        return stock.isEmpty() ? 0 : stock.get().getQuantity();
    }

}
