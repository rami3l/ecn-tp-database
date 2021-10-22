package ecn.tp.bddon.server.metier.services;

import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ecn.tp.bddon.server.metier.dto.postgres.Client;
import ecn.tp.bddon.server.metier.dto.postgres.details.ClientDetailed;
import ecn.tp.bddon.server.metier.repository.ClientRestRepository;

@Service
public class ClientService {

    @Resource
    private ClientRestRepository clientRestRepository;

    public Client getClient(String abbrev) {
        Optional<Client> client = clientRestRepository.findByAbbrevIgnoreCase(abbrev);
        if (client.isEmpty()) {
            // TODO: lever erreur 404
            return null;
        }
        return client.get();
    }

    public Iterable<Client> getClients() {
        return clientRestRepository.findAll();
    }

    public ClientDetailed getClientDetailed(String abbrev) {
        return new ClientDetailed(getClient(abbrev));
    }

}
