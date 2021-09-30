package ecn.tp.bddon.server.metier.services;

import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.Driver;
import ecn.tp.bddon.server.metier.dto.Truck;
import ecn.tp.bddon.server.metier.dto.Unavailability;
import ecn.tp.bddon.server.metier.repository.DriverRestRepository;
import ecn.tp.bddon.server.metier.repository.TruckRestRepository;

@Service
public class TransportService {

    @Resource
    private TruckRestRepository truckRestRepository;

    @Resource
    private DriverRestRepository driverRestRepository;

    public Iterable<Truck> getTrucks() {
        return truckRestRepository.findAll();
    }

    public Truck getTruck(String licensePlate) {
        Optional<Truck> truck = truckRestRepository.findById(licensePlate);
        if (truck.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return truck.get();
    }

    public Iterable<Unavailability> getUnavailabilities(String licensePlate) {
        return getTruck(licensePlate).getUnavailabilities();
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

}
