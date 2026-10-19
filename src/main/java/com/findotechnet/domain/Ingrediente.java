package com.findotechnet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ingrediente.
 */
@Entity
@Table(name = "ingrediente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ingrediente extends AbstractAuditingEntity<Long> {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ingredienteSequence")
    @SequenceGenerator(name = "ingredienteSequence", sequenceName = "ing_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "cantidad_ing", nullable = false)
    private Float cantidadIng;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "unidadPresentacionArt", "tipoArt" }, allowSetters = true)
    private Articulo articulo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "unidadPresentacionArt", "tipoArt" }, allowSetters = true)
    private Articulo insumo;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ingrediente id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCantidadIng() {
        return this.cantidadIng;
    }

    public Ingrediente cantidadIng(Float cantidadIng) {
        this.setCantidadIng(cantidadIng);
        return this;
    }

    public void setCantidadIng(Float cantidadIng) {
        this.cantidadIng = cantidadIng;
    }

    public Articulo getArticulo() {
        return this.articulo;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public Ingrediente articulo(Articulo articulo) {
        this.setArticulo(articulo);
        return this;
    }

    public Articulo getInsumo() {
        return this.insumo;
    }

    public void setInsumo(Articulo articulo) {
        this.insumo = articulo;
    }

    public Ingrediente insumo(Articulo articulo) {
        this.setInsumo(articulo);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ingrediente)) {
            return false;
        }
        return getId() != null && getId().equals(((Ingrediente) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ingrediente{" +
            "id=" + getId() +
            ", cantidadIng=" + getCantidadIng() +
            "}";
    }
}
