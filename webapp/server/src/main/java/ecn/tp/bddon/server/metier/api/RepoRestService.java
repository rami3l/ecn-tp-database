package ecn.tp.bddon.server.metier.api;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ecn.tp.bddon.server.metier.dto.Product;
import ecn.tp.bddon.server.metier.services.StockService;

@RestController
public class RepoRestService {

    @Resource
    private StockService stockService;

    @GetMapping("/products")
    public Iterable<Product> getProducts() {
        return stockService.getProducts();
    }

}
