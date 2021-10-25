package ecn.tp.bddon.server.metier.services;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.postgres.LoadingPoint;
import ecn.tp.bddon.server.metier.dto.postgres.Product;
import ecn.tp.bddon.server.metier.services.rest.PlacesService;
import ecn.tp.bddon.server.metier.services.rest.StockService;

@Service
public class StockListingService {

    @Resource
    private StockService stockService;
    @Resource
    private PlacesService placesService;

    private String listing = "";

    private void generateListing() {
        listing = "";
        Iterable<Product> products = stockService.getProducts();
        Iterable<LoadingPoint> loadingPoints = placesService.getLoadingPoints();
        loadingPoints.forEach(loadingPoint -> {
            listing += loadingPoint.getAddress().getAddressLine() + " :\n";
            products.forEach(product -> {
                int quantity = stockService.getProductQuantityByLoadingPoint(product.getId(), loadingPoint.getId());
                listing += product.getName() + " : " + quantity + " Kg\n";
            });
            listing += "\n\n";
        });
    }

    public String getListing() {
        generateListing();
        return listing;
    }

}
