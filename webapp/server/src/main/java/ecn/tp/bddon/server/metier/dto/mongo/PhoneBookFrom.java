package ecn.tp.bddon.server.metier.dto.mongo;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@NoArgsConstructor
@Data
public class PhoneBookFrom {
    private String firstName;
    private String lastName;
}
