package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client", uniqueConstraints = @UniqueConstraint(columnNames = { "abbrev" }))
@Data
@NoArgsConstructor
public class Client implements Serializable {

    @Id
    protected String abbrev;

    protected String name;

    @OneToOne
    @JoinColumn(name = "address")
    protected Address address;

}
