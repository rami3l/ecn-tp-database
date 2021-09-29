package ecn.tp.bddon.server.metier.services;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.Client;
import ecn.tp.bddon.server.metier.dto.DeliveryPoint;
import ecn.tp.bddon.server.metier.dto.LoadingPoint;
import ecn.tp.bddon.server.metier.repository.DeliveryPointRestRepository;
import ecn.tp.bddon.server.metier.repository.LoadingPointRestRepository;

@Service
public class PlacesService {

    @Resource
    private LoadingPointRestRepository loadingPointRestRepository;

    @Resource
    private DeliveryPointRestRepository deliveryPointRestRepository;

    @Resource
    private ClientService clientService;

    public Iterable<LoadingPoint> getLoadingPoints() {
        return loadingPointRestRepository.findAll();
    }

    public Iterable<DeliveryPoint> getDeliveryPoints() {
        return deliveryPointRestRepository.findAll();
    }

    public Iterable<DeliveryPoint> getDeliveryPoints(Client client) {
        return deliveryPointRestRepository.getDeliveryPointsByClient(client);
    }

    public Iterable<DeliveryPoint> getDeliveryPoints(String clientAbbrev) {
        return deliveryPointRestRepository.getDeliveryPointsByClient(clientService.getClient(clientAbbrev));
    }

}
