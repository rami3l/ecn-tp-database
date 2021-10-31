package ecn.tp.bddon.server.metier.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ecn.tp.bddon.server.metier.dto.postgres.Driver;

public interface DriverRestRepository extends CrudRepository<Driver, Integer> {

    public Optional<Driver> findByDefaultTruck_licensePlate(String licensePlate);

}
