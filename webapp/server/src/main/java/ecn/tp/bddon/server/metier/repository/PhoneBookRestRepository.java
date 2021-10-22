package ecn.tp.bddon.server.metier.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import ecn.tp.bddon.server.metier.dto.mongo.PhoneBook;

public interface PhoneBookRestRepository extends MongoRepository<PhoneBook, String> {

}
