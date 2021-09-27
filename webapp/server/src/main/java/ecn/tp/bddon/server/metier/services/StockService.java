package ecn.tp.bddon.server.metier.services;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.Product;
import ecn.tp.bddon.server.metier.repository.ProductRestRepository;

@Service
public class StockService {

    @Resource
    private ProductRestRepository productRestRepository;

    public Iterable<Product> getProducts() {
        return productRestRepository.findAll();
    }

}
