package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client", uniqueConstraints = @UniqueConstraint(columnNames = { "product_id" }))
@Data
@NoArgsConstructor
public class Product implements Serializable {

    @Id
    @Column(name = "product_id")
    protected String id;

    protected String name;

}
