package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "loading_point")
@Data
@NoArgsConstructor
public class LoadingPoint implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "loading_point_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "address")
    private Address address;

    @JsonIgnore
    @OneToMany(mappedBy = "loadingPointId", fetch = FetchType.LAZY)
    private List<Stock> stocks = new ArrayList<>();

}
