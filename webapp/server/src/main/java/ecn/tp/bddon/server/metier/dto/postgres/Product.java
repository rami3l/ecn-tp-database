package ecn.tp.bddon.server.metier.dto.postgres;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
public class Product implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "product_id")
    private int id;

    private String name;

    @OneToMany(mappedBy = "productId", fetch = FetchType.LAZY)
    private List<Stock> stocks = new ArrayList<>();

}
