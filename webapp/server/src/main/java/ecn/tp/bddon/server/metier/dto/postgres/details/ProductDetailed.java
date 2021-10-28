package ecn.tp.bddon.server.metier.dto.postgres.details;

import java.util.List;

import ecn.tp.bddon.server.metier.dto.postgres.Product;
import ecn.tp.bddon.server.metier.dto.postgres.Stock;
import lombok.Data;
import lombok.NonNull;

@Data
public class ProductDetailed {

    private int id;
    private String name;
    private List<Stock> stocks;

    public ProductDetailed(@NonNull Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.stocks = product.getStocks();
    }

}
