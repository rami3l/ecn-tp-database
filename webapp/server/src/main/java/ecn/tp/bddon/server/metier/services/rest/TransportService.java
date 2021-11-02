package ecn.tp.bddon.server.metier.services.rest;

import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.postgres.Driver;
import ecn.tp.bddon.server.metier.dto.postgres.Truck;
import ecn.tp.bddon.server.metier.dto.postgres.Unavailability;
import ecn.tp.bddon.server.metier.dto.postgres.creations.UnavailabilityToSave;
import ecn.tp.bddon.server.metier.dto.postgres.details.DriverDetailed;
import ecn.tp.bddon.server.metier.repository.DriverRestRepository;
import ecn.tp.bddon.server.metier.repository.TruckRestRepository;
import ecn.tp.bddon.server.metier.repository.UnavailabilityRestRepository;
import lombok.NonNull;

@Service
public class TransportService {

    @Resource
    private TruckRestRepository truckRestRepository;

    @Resource
    private DriverRestRepository driverRestRepository;

    @Resource
    private UnavailabilityRestRepository unavailabilityRestRepository;

    public Iterable<Truck> getTrucks() {
        return truckRestRepository.findAll();
    }

    public Truck getTruck(@NonNull String licensePlate) {
        Optional<Truck> truck = truckRestRepository.findById(licensePlate);
        if (truck.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return truck.get();
    }

    public Unavailability getUnavailability(@NonNull String licensePlate, int id) {
        List<Unavailability> unavailabilities = getTruck(licensePlate).getUnavailabilities();
        List<Unavailability> unavailabilitesMatchingId = unavailabilities.stream()
                .filter(unavailability -> unavailability.getId() == id).toList();
        if (unavailabilitesMatchingId.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return unavailabilitesMatchingId.get(0);
    }

    public Iterable<Unavailability> getUnavailabilities(String licensePlate) {
        return getTruck(licensePlate).getUnavailabilities();
    }

    public int save(@NonNull String licensePlate, UnavailabilityToSave unavailabilityToSave) {
        Unavailability unavailability = new Unavailability();
        unavailability.setStartDate(unavailabilityToSave.getStartDate());
        unavailability.setEndDate(unavailabilityToSave.getEndDate());
        unavailability.setComments(unavailabilityToSave.getComment());
        unavailability.setTruck(getTruck(licensePlate));
        unavailabilityRestRepository.save(unavailability);
        return unavailability.getId();
    }

    public void deleteUnavailability(int id) {
        unavailabilityRestRepository.deleteById(id);
    }

    public Driver getAssignedDriverIfExists(String licensePlate) {
        Optional<Driver> driver = driverRestRepository.findByDefaultTruck_licensePlate(licensePlate);
        return driver.orElse(null);
    }

    public Iterable<Driver> getDrivers() {
        return driverRestRepository.findAll();
    }

    public Driver getDriver(int driverId) {
        Optional<Driver> driver = driverRestRepository.findById(driverId);
        if (driver.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return driver.get();
    }

    public DriverDetailed getDriverDetailed(int driverId) {
        return new DriverDetailed(getDriver(driverId));
    }

}
