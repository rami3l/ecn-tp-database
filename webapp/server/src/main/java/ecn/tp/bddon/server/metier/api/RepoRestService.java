package ecn.tp.bddon.server.metier.api;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ecn.tp.bddon.server.metier.dto.Client;
import ecn.tp.bddon.server.metier.dto.DeliveryPoint;
import ecn.tp.bddon.server.metier.dto.Product;
import ecn.tp.bddon.server.metier.services.ClientService;
import ecn.tp.bddon.server.metier.services.PlacesService;
import ecn.tp.bddon.server.metier.services.StockService;

@RestController
public class RepoRestService {

    @Resource
    private StockService stockService;

    @Resource
    private ClientService clientService;

    @Resource
    private PlacesService placesService;

    @GetMapping("/products")
    public Iterable<Product> getProducts() {
        return stockService.getProducts();
    }

    @GetMapping("/clients")
    public Iterable<Client> getClients() {
        return clientService.getClients();
    }

    @GetMapping("/clients/{abbrev}")
    public Client getClient(@PathVariable("abbrev") String abbrev) {
        return clientService.getClient(abbrev);
    }

    @GetMapping("/clients/{abbrev}/deliverypoints")
    public Iterable<DeliveryPoint> getDeliveryPointsByClient(@PathVariable("abbrev") String clientAbbrev) {
        return placesService.getDeliveryPoints(clientAbbrev);
    }

    @GetMapping("/deliverypoints")
    public Iterable<DeliveryPoint> getDeliveryPoints() {
        return placesService.getDeliveryPoints();
    }

}
