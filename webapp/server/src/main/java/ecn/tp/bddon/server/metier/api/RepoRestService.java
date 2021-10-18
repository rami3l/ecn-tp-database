package ecn.tp.bddon.server.metier.api;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ecn.tp.bddon.server.metier.dto.Client;
import ecn.tp.bddon.server.metier.dto.DeliveryPoint;
import ecn.tp.bddon.server.metier.dto.Driver;
import ecn.tp.bddon.server.metier.dto.LoadingPoint;
import ecn.tp.bddon.server.metier.dto.Mission;
import ecn.tp.bddon.server.metier.dto.Order;
import ecn.tp.bddon.server.metier.dto.OrderContent;
import ecn.tp.bddon.server.metier.dto.Product;
import ecn.tp.bddon.server.metier.dto.SupportedBy;
import ecn.tp.bddon.server.metier.dto.Truck;
import ecn.tp.bddon.server.metier.dto.Unavailability;
import ecn.tp.bddon.server.metier.dto.creations.MissionToSave;
import ecn.tp.bddon.server.metier.dto.creations.SupportedByToSave;
import ecn.tp.bddon.server.metier.dto.details.ClientDetailed;
import ecn.tp.bddon.server.metier.dto.details.OrderContentDetailed;
import ecn.tp.bddon.server.metier.dto.details.OrderDetailed;
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
    public ClientDetailed getClient(@PathVariable("abbrev") String abbrev) {
        return clientService.getClientDetailed(abbrev);
    }

    @GetMapping("/clients/{abbrev}/deliverypoints")
    public Iterable<DeliveryPoint> getDeliveryPointsByClient(@PathVariable("abbrev") String clientAbbrev) {
        return placesService.getDeliveryPoints(clientAbbrev);
    }

    @GetMapping("/deliverypoints")
    public Iterable<DeliveryPoint> getDeliveryPoints() {
        return placesService.getDeliveryPoints();
    }

    @GetMapping("/loadingpoints")
    public Iterable<LoadingPoint> getLoadingPoints() {
        return placesService.getLoadingPoints();
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

    @GetMapping("/orders/details")
    public Iterable<OrderDetailed> getOrdersDetailed() {
        return orderService.getOrdersDetailed();
    }

    @GetMapping("/orders/{id}")
    public OrderDetailed getOrder(@PathVariable("id") int orderId) {
        return orderService.getOrderDetailed(orderId);
    }

    @GetMapping("/orders/{id}/ordercontents")
    public Iterable<OrderContent> getOrderContentsByOrder(@PathVariable("id") int orderId) {
        return orderService.getOrderContentsByOrder(orderId);
    }

    @GetMapping("/orders/{id}/ordercontents/details")
    public Iterable<OrderContentDetailed> getOrderContentsDetailedByOrder(@PathVariable("id") int orderId) {
        return orderService.getOrderContentsDetailedByOrder(orderId);
    }

    @GetMapping("/ordercontents")
    public Iterable<OrderContent> getOrderContents() {
        return orderService.getOrderContents();
    }

    @GetMapping("/ordercontents/details")
    public Iterable<OrderContentDetailed> getOrderContentsDetailed() {
        return orderService.getOrderContentsDetailed();
    }

    @GetMapping("/ordercontents/unsupported/details")
    public Iterable<OrderContentDetailed> getOrderContentsNotSupportedDetailed() {
        return orderService.getOrderContentsUnsupportedOrUndeliveredDetailed();
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

    @PutMapping("/missions/{id}")
    @ResponseStatus(HttpStatus.OK)
    public int updateMission(@PathVariable("id") int id, @RequestBody MissionToSave mission) {
        return missionService.save(mission, id);
    }

    @PostMapping("/missions")
    @ResponseStatus(HttpStatus.CREATED)
    public int createMission(@RequestBody MissionToSave mission) {
        return missionService.save(mission);
    }

    @DeleteMapping("/supportedby/{orderContentId}/{missionId}")
    public void deleteSupportedBy(@PathVariable("orderContentId") int orderContentId,
            @PathVariable("missionId") int missionId) {
        missionService.deleteSupportedBy(orderContentId, missionId);
    }

    @PostMapping("/supportedby")
    @ResponseStatus(HttpStatus.CREATED)
    public void createSupportedBy(@RequestBody SupportedByToSave supportedBy) {
        missionService.save(supportedBy);
    }

}
