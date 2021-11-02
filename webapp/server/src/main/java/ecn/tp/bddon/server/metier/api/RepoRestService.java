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

import ecn.tp.bddon.server.metier.dto.mongo.PhoneBook;
import ecn.tp.bddon.server.metier.dto.postgres.Client;
import ecn.tp.bddon.server.metier.dto.postgres.DeliveryPoint;
import ecn.tp.bddon.server.metier.dto.postgres.Driver;
import ecn.tp.bddon.server.metier.dto.postgres.LoadingPoint;
import ecn.tp.bddon.server.metier.dto.postgres.Mission;
import ecn.tp.bddon.server.metier.dto.postgres.Order;
import ecn.tp.bddon.server.metier.dto.postgres.OrderContent;
import ecn.tp.bddon.server.metier.dto.postgres.Product;
import ecn.tp.bddon.server.metier.dto.postgres.Scheduling;
import ecn.tp.bddon.server.metier.dto.postgres.SupportedBy;
import ecn.tp.bddon.server.metier.dto.postgres.Truck;
import ecn.tp.bddon.server.metier.dto.postgres.TruckType;
import ecn.tp.bddon.server.metier.dto.postgres.Unavailability;
import ecn.tp.bddon.server.metier.dto.postgres.creations.MissionToSave;
import ecn.tp.bddon.server.metier.dto.postgres.creations.SchedulingToSave;
import ecn.tp.bddon.server.metier.dto.postgres.creations.SupportedByToSave;
import ecn.tp.bddon.server.metier.dto.postgres.creations.UnavailabilityToSave;
import ecn.tp.bddon.server.metier.dto.postgres.details.ClientDetailed;
import ecn.tp.bddon.server.metier.dto.postgres.details.DriverDetailed;
import ecn.tp.bddon.server.metier.dto.postgres.details.OrderContentDetailed;
import ecn.tp.bddon.server.metier.dto.postgres.details.OrderDetailed;
import ecn.tp.bddon.server.metier.dto.postgres.details.ProductDetailed;
import ecn.tp.bddon.server.metier.services.StockListingService;
import ecn.tp.bddon.server.metier.services.rest.ClientService;
import ecn.tp.bddon.server.metier.services.rest.MissionService;
import ecn.tp.bddon.server.metier.services.rest.OrderService;
import ecn.tp.bddon.server.metier.services.rest.PhoneBookService;
import ecn.tp.bddon.server.metier.services.rest.PlacesService;
import ecn.tp.bddon.server.metier.services.rest.StockService;
import ecn.tp.bddon.server.metier.services.rest.TransportService;

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
    @Resource
    private PhoneBookService phoneBookService;
    @Resource
    private StockListingService stockListingService;

    @GetMapping("/products")
    public Iterable<Product> getProducts() {
        return stockService.getProducts();
    }

    @GetMapping("/products/{id}")
    public ProductDetailed getProduct(@PathVariable("id") int productId) {
        return stockService.getProduct(productId);
    }

    @GetMapping("/products/{id}/quantity")
    public int getProductQuantity(@PathVariable("id") int productId) {
        return stockService.getProductQuantity(productId);
    }

    @GetMapping("/products/{id}/quantity/{loadingpoint}")
    public int getProductQuantityByLoadingPoint(@PathVariable("id") int productId,
            @PathVariable("loadingpoint") int loadingPointId) {
        return stockService.getProductQuantityByLoadingPoint(productId, loadingPointId);
    }

    @GetMapping("/clients")
    public Iterable<Client> getClients() {
        return clientService.getClients();
    }

    @GetMapping("/clients/{abbrev}")
    public ClientDetailed getClient(@PathVariable String abbrev) {
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

    @GetMapping("/trucks/{licensePlate}")
    public Truck getTruck(@PathVariable String licensePlate) {
        return transportService.getTruck(licensePlate);
    }

    @GetMapping("/trucks/{licensePlate}/unavailabilities")
    public Iterable<Unavailability> getUnavailabilities(@PathVariable String licensePlate) {
        return transportService.getUnavailabilities(licensePlate);
    }

    @GetMapping("/trucks/{licensePlate}/unavailabilities/{id}")
    public Unavailability getUnavailability(@PathVariable String licensePlate, @PathVariable int id) {
        return transportService.getUnavailability(licensePlate, id);
    }

    @PostMapping("/trucks/{licenseplate}/unavailabilities")
    @ResponseStatus(HttpStatus.CREATED)
    public int createUnavailability(@PathVariable("licenseplate") String licensePlate,
            @RequestBody UnavailabilityToSave unavailability) {
        return transportService.save(licensePlate, unavailability);
    }

    @DeleteMapping("/unavailabilities/{id}")
    public void deleteUnavailability(@PathVariable int id) {
        transportService.deleteUnavailability(id);
    }

    @GetMapping("/trucks/{licenseplate}/driver")
    public Driver getAssignedDriverIfExists(@PathVariable("licenseplate") String licensePlate) {
        return transportService.getAssignedDriverIfExists(licensePlate);
    }

    @GetMapping("/trucktypes/{id}")
    public TruckType getAssignedDriverIfExists(@PathVariable int id) {
        return transportService.getTruckType(id);
    }

    @GetMapping("/drivers")
    public Iterable<Driver> getDrivers() {
        return transportService.getDrivers();
    }

    @GetMapping("/drivers/{id}")
    public DriverDetailed getDriver(@PathVariable("id") int driverId) {
        return transportService.getDriverDetailed(driverId);
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
    public void deleteSupportedBy(@PathVariable int orderContentId, @PathVariable int missionId) {
        missionService.deleteSupportedBy(orderContentId, missionId);
    }

    @PostMapping("/supportedby")
    @ResponseStatus(HttpStatus.CREATED)
    public void createSupportedBy(@RequestBody SupportedByToSave supportedBy) {
        missionService.save(supportedBy);
    }

    @GetMapping("/phonebooks")
    public Iterable<PhoneBook> getPhoneBooks() {
        return phoneBookService.getPhoneBooks();
    }

    /**
     * Endpoint to schedule sending of the listing
     * 
     * @param scheduling: object containing the email to send the listing to, and
     *                    the cron expression of the scheduling
     * @return the id of the scheduled action
     */
    @PostMapping("/scheduledsendings")
    @ResponseStatus(HttpStatus.CREATED)
    public int scheduleSending(@RequestBody SchedulingToSave scheduling) {
        return stockListingService.scheduleSending(scheduling);
    }

    /**
     * Endpoint to cancel a scheduled sending
     * 
     * @param id: the id of the scheduled sending to cancel
     */
    @DeleteMapping("/scheduledsendings/{id}")
    public void removeScheduledSending(@PathVariable int id) {
        stockListingService.cancelSending(id);
    }

    /**
     * Endpoint to get all scheduled sendings
     * 
     * @return the list of all scheduled sendings (email & cron expression)
     */
    @GetMapping("/scheduledsendings")
    public Iterable<Scheduling> getScheduledSendingList() {
        return stockListingService.getScheduledSendingList();
    }

    /**
     * Endpoint to get the specified scheduled sending
     * 
     * @param id: id of the scheduled sending to get
     * @return the scheduled sending (email & cron expression)
     */
    @GetMapping("/scheduledsendings/{id}")
    public Scheduling getScheduledSending(@PathVariable int id) {
        return stockListingService.getScheduledSending(id);
    }

    /**
     * Endpoint to send the listing to the specified email address
     * 
     * @param email: email address to send the listing to
     */
    @PutMapping("/sendlisting/{email}")
    public void sendListing(@PathVariable String email) {
        stockListingService.sendListingTo(email);
    }

}
