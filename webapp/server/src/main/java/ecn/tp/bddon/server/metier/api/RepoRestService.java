package ecn.tp.bddon.server.metier.api;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ecn.tp.bddon.server.metier.dto.Client;
import ecn.tp.bddon.server.metier.dto.DeliveryPoint;
import ecn.tp.bddon.server.metier.dto.Driver;
import ecn.tp.bddon.server.metier.dto.Mission;
import ecn.tp.bddon.server.metier.dto.Order;
import ecn.tp.bddon.server.metier.dto.OrderContent;
import ecn.tp.bddon.server.metier.dto.Product;
import ecn.tp.bddon.server.metier.dto.SupportedBy;
import ecn.tp.bddon.server.metier.dto.Truck;
import ecn.tp.bddon.server.metier.dto.Unavailability;
import ecn.tp.bddon.server.metier.dto.details.ClientDetailed;
import ecn.tp.bddon.server.metier.dto.details.OrderContentDetailed;
import ecn.tp.bddon.server.metier.services.ClientService;
import ecn.tp.bddon.server.metier.services.MissionService;
import ecn.tp.bddon.server.metier.services.OrderService;
import ecn.tp.bddon.server.metier.services.PlacesService;
import ecn.tp.bddon.server.metier.services.StockService;
import ecn.tp.bddon.server.metier.services.TransportService;

@RestController
public class RepoRestService {

    @Resource
    private StockService stockService;
    @Resource
    private ClientService clientService;
    @Resource
    private PlacesService placesService;
    @Resource
    private TransportService transportService;
    @Resource
    private OrderService orderService;
    @Resource
    private MissionService missionService;

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

    @GetMapping("/trucks")
    public Iterable<Truck> getTrucks() {
        return transportService.getTrucks();
    }

    @GetMapping("/trucks/{licenseplate}/unavailabilities")
    public Iterable<Unavailability> getUnavailabilities(@PathVariable("licenseplate") String licensePlate) {
        return transportService.getUnavailabilities(licensePlate);
    }

    @GetMapping("/drivers")
    public Iterable<Driver> getDrivers() {
        return transportService.getDrivers();
    }

    @GetMapping("/drivers/{id}")
    public Driver getDriver(@PathVariable("id") int driverId) {
        return transportService.getDriver(driverId);
    }

    @GetMapping("/orders")
    public Iterable<Order> getOrders() {
        return orderService.getOrders();
    }

    @GetMapping("/orders/{id}")
    public Order getOrder(@PathVariable("id") int orderId) {
        return orderService.getOrder(orderId);
    }

    @GetMapping("/ordercontents")
    public Iterable<OrderContent> getOrderContents() {
        return orderService.getOrderContents();
    }

    @GetMapping("/ordercontents/{id}")
    public OrderContentDetailed getOrderContentDetailed(@PathVariable("id") int orderContentId) {
        return orderService.getOrderContentDetailed(orderContentId);
    }

    @GetMapping("/missions")
    public Iterable<Mission> getMissions() {
        return missionService.getMissions();
    }

    @GetMapping("/missions/{id}")
    public Mission getMission(@PathVariable("id") int missionId) {
        return missionService.getMission(missionId);
    }

    @GetMapping("/missions/{id}/supports")
    public Iterable<SupportedBy> getMissionOrderContents(@PathVariable("id") int missionId) {
        return missionService.getSupports(missionId);
    }

}
