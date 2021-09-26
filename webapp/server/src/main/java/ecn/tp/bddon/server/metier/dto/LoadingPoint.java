package ecn.tp.bddon.server.metier.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
    protected String id;

    @OneToOne
    @JoinColumn
    protected Address address;

}
