package com.findotechnet.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoArticulo.
 */
@Entity
@Table(name = "tipo_articulo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoArticulo extends AbstractAuditingEntity<Long> {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipoArticuloSequence")
    @SequenceGenerator(name = "tipoArticuloSequence", sequenceName = "tp_art_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "desc_tp_art", length = 100, nullable = false, unique = true)
    private String descTpArt;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TipoArticulo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescTpArt() {
        return this.descTpArt;
    }

    public TipoArticulo descTpArt(String descTpArt) {
        this.setDescTpArt(descTpArt);
        return this;
    }

    public void setDescTpArt(String descTpArt) {
        this.descTpArt = descTpArt;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoArticulo)) {
            return false;
        }
        return getId() != null && getId().equals(((TipoArticulo) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoArticulo{" +
            "id=" + getId() +
            ", descTpArt='" + getDescTpArt() + "'" +
            "}";
    }
}
