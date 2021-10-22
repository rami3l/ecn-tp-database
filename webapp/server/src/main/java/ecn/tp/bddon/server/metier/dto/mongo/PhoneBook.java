package ecn.tp.bddon.server.metier.dto.mongo;

import java.util.Map;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document("phonebook")
@NoArgsConstructor
@Data
public class PhoneBook {
    @Id
    private String id;
    private Map<String, String> from;
    private Map<String, String>[] data;
}
