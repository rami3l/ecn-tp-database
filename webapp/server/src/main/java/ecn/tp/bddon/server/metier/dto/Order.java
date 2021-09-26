package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client", uniqueConstraints = @UniqueConstraint(columnNames = { "order_id" }))
@Data
@NoArgsConstructor
public class Order implements Serializable {

    @Id
    @Column(name = "order_id")
    protected int id;

    @ManyToOne
    @JoinColumn(name = "client")
    protected Client client;

}
