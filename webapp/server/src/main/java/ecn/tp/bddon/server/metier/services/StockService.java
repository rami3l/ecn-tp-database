package ecn.tp.bddon.server.metier.services;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.Product;
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

    public int getProductQuantity(int id) {
        Integer quantity = stockRestRepository.getProductQuantity(id);
        return quantity == null ? 0 : quantity;
    }

}
