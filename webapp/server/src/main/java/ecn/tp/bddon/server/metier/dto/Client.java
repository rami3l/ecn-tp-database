package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client")
@Data
@NoArgsConstructor
public class Client implements Serializable {

    @Id
    protected String abbrev;

    protected String name;

    @OneToOne
    @JoinColumn
    protected Address address;

}