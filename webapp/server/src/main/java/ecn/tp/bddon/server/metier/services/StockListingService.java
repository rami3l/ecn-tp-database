package ecn.tp.bddon.server.metier.services;

import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.postgres.Address;
import ecn.tp.bddon.server.metier.dto.postgres.LoadingPoint;
import ecn.tp.bddon.server.metier.dto.postgres.Product;
import ecn.tp.bddon.server.metier.dto.postgres.Scheduling;
import ecn.tp.bddon.server.metier.dto.postgres.creations.SchedulingToSave;
import ecn.tp.bddon.server.metier.repository.SchedulingRestRepository;
import ecn.tp.bddon.server.metier.services.rest.PlacesService;
import ecn.tp.bddon.server.metier.services.rest.StockService;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class StockListingService {

    @Resource
    private StockService stockService;
    @Resource
    private PlacesService placesService;
    @Resource
    private SchedulingService schedulingService;
    @Resource
    private EmailService emailService;
    @Resource
    private SchedulingRestRepository schedulingRestRepository;

    private String listing = "";

    private void generateListing() {
        StringBuilder listingBuilder = new StringBuilder();
        Iterable<Product> products = stockService.getProducts();
        Iterable<LoadingPoint> loadingPoints = placesService.getLoadingPoints();
        for (var loadingPoint : loadingPoints) {
            Address a = loadingPoint.getAddress();
            listingBuilder.append(a.getAddressLine() + " - ").append(a.getZipcode() != null ? a.getZipcode() + " " : "")
                    .append(a.getCity() + " :<ul>");
            for (var product : products) {
                int quantity = stockService.getProductQuantityByLoadingPoint(product.getId(), loadingPoint.getId());
                listingBuilder.append("<li>" + product.getName() + " : " + quantity + " Kg</li>");
            }
            listingBuilder.append("</ul>");
        }
        listing = listingBuilder.toString();
    }

    public String getListing() {
        generateListing();
        return listing;
    }

    public String getCachedListing() {
        return listing;
    }

    /**
     * Schedule sending of the listing by email and save this new scheduling to the
     * database
     * 
     * @param schedulingToCreate : Object containing the email address to send the
     *                           listing to, and the cron expression of the
     *                           scheduling
     * @return the id of task created
     */
    public int scheduleSending(SchedulingToSave schedulingToCreate) {
        if (!schedulingService.isValid(schedulingToCreate.getCron())
                || !emailService.isValid(schedulingToCreate.getEmail())) {
            // TODO: lever erreur
            return -1;
        }
        Scheduling scheduling = new Scheduling();
        scheduling.setEmail(schedulingToCreate.getEmail());
        scheduling.setCron(schedulingToCreate.getCron());
        schedulingRestRepository.save(scheduling);
        return scheduleSending(scheduling.getId(), scheduling.getEmail(), scheduling.getCron());
    }

    /**
     * Schedule sending of the listing by email
     * 
     * @param scheduling : Object containing the email address to send the listing
     *                   to, the cron expression of the scheduling, and the id of
     *                   the task to create
     * @return the id of task created
     */
    public int scheduleSending(Scheduling scheduling) {
        return scheduleSending(scheduling.getId(), scheduling.getEmail(), scheduling.getCron());
    }

    private int scheduleSending(int taskId, String email, String cronExpression) {
        log.info("Scheduling sending of the listing to {} with cron expression \"{}\"", email, cronExpression);
        try {
            return schedulingService.addTask(taskId, () -> sendListingTo(email), cronExpression);
        } catch (Exception e) {
            log.error("Scheduling has failed :", e);
            return -1;
        }
    }

    /**
     * Send the listing to the specified email address.
     * 
     * @param email the email address to send the listing to
     */
    public void sendListingTo(String email) {
        String body = getListing();
        String subject = "[BIFORU - stock] available product quantities by loadingpoint";
        emailService.email(email, subject, body);
    }

    /**
     * Cancel a scheduled sending of the listing
     * 
     * @param id: id of the scheduled sending to cancel
     * @return a boolean indicating if a scheduled sending has effectively been
     *         cancelled
     */
    public boolean cancelSending(int id) {
        schedulingRestRepository.deleteById(id);
        return schedulingService.removeTask(id);
    }

    /**
     * 
     * @return all sendings that have been scheduled
     */
    public Iterable<Scheduling> getScheduledSendingList() {
        return schedulingRestRepository.findAll();
    }

    /**
     * 
     * @param id: id of the scheduled sending to get informations about
     * @return the scheduled sending if it exits
     */
    public Scheduling getScheduledSending(int id) {
        Optional<Scheduling> scheduling = schedulingRestRepository.findById(id);
        if (scheduling.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return scheduling.get();
    }

    @PostConstruct
    private void initTasks() {
        getScheduledSendingList().forEach(this::scheduleSending);
    }

}
