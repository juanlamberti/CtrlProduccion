package com.findotechnet.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.math.BigDecimal;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Articulo.
 */
@Entity
@Table(name = "articulo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Articulo extends AbstractAuditingEntity<Long> {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "articuloSequence")
    @SequenceGenerator(name = "articuloSequence", sequenceName = "art_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 500)
    @Column(name = "desc_art", length = 500, nullable = false, unique = true)
    private String descArt;

    @Size(max = 65000)
    @Column(name = "receta_art", length = 65000)
    private String recetaArt;

    @DecimalMin(value = "0")
    @Column(name = "unidad_generar_art")
    private Float unidadGenerarArt;

    @DecimalMin(value = "0")
    @Column(name = "merma_preparacion_art")
    private Float mermaPreparacionArt;

    @DecimalMin(value = "0")
    @Column(name = "peso_art")
    private Float pesoArt;

    @DecimalMin(value = "0")
    @Column(name = "presentacion_compra_art")
    private Float presentacionCompraArt;

    @DecimalMin(value = "0")
    @Column(name = "valor_presentacion_art", precision = 21, scale = 2, nullable = false)
    private BigDecimal valorPresentacionArt;

    @ManyToOne()
    private Unidad unidadPresentacionArt;

    @ManyToOne(optional = false)
    @NotNull
    private TipoArticulo tipoArt;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Articulo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescArt() {
        return this.descArt;
    }

    public Articulo descArt(String descArt) {
        this.setDescArt(descArt);
        return this;
    }

    public void setDescArt(String descArt) {
        this.descArt = descArt;
    }

    public String getRecetaArt() {
        return this.recetaArt;
    }

    public Articulo recetaArt(String recetaArt) {
        this.setRecetaArt(recetaArt);
        return this;
    }

    public void setRecetaArt(String recetaArt) {
        this.recetaArt = recetaArt;
    }

    public Float getUnidadGenerarArt() {
        return this.unidadGenerarArt;
    }

    public Articulo unidadGenerarArt(Float unidadGenerarArt) {
        this.setUnidadGenerarArt(unidadGenerarArt);
        return this;
    }

    public void setUnidadGenerarArt(Float unidadGenerarArt) {
        this.unidadGenerarArt = unidadGenerarArt;
    }

    public Float getMermaPreparacionArt() {
        return this.mermaPreparacionArt;
    }

    public Articulo mermaPreparacionArt(Float mermaPreparacionArt) {
        this.setMermaPreparacionArt(mermaPreparacionArt);
        return this;
    }

    public void setMermaPreparacionArt(Float mermaPreparacionArt) {
        this.mermaPreparacionArt = mermaPreparacionArt;
    }

    public Float getPesoArt() {
        return this.pesoArt;
    }

    public Articulo pesoArt(Float pesoArt) {
        this.setPesoArt(pesoArt);
        return this;
    }

    public void setPesoArt(Float pesoArt) {
        this.pesoArt = pesoArt;
    }

    public Float getPresentacionCompraArt() {
        return this.presentacionCompraArt;
    }

    public Articulo presentacionCompraArt(Float presentacionCompraArt) {
        this.setPresentacionCompraArt(presentacionCompraArt);
        return this;
    }

    public void setPresentacionCompraArt(Float presentacionCompraArt) {
        this.presentacionCompraArt = presentacionCompraArt;
    }

    public BigDecimal getValorPresentacionArt() {
        return this.valorPresentacionArt;
    }

    public Articulo valorPresentacionArt(BigDecimal valorPresentacionArt) {
        this.setValorPresentacionArt(valorPresentacionArt);
        return this;
    }

    public void setValorPresentacionArt(BigDecimal valorPresentacionArt) {
        this.valorPresentacionArt = valorPresentacionArt;
    }

    public Unidad getUnidadPresentacionArt() {
        return this.unidadPresentacionArt;
    }

    public void setUnidadPresentacionArt(Unidad unidad) {
        this.unidadPresentacionArt = unidad;
    }

    public Articulo unidadPresentacionArt(Unidad unidad) {
        this.setUnidadPresentacionArt(unidad);
        return this;
    }

    public TipoArticulo getTipoArt() {
        return this.tipoArt;
    }

    public void setTipoArt(TipoArticulo tipoArticulo) {
        this.tipoArt = tipoArticulo;
    }

    public Articulo tipoArt(TipoArticulo tipoArticulo) {
        this.setTipoArt(tipoArticulo);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Articulo)) {
            return false;
        }
        return getId() != null && getId().equals(((Articulo) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Articulo{" +
            "id=" + getId() +
            ", descArt='" + getDescArt() + "'" +
            ", recetaArt='" + getRecetaArt() + "'" +
            ", unidadGenerarArt=" + getUnidadGenerarArt() +
            ", mermaPreparacionArt=" + getMermaPreparacionArt() +
            ", pesoArt=" + getPesoArt() +
            ", presentacionCompraArt=" + getPresentacionCompraArt() +
            ", valorPresentacionArt=" + getValorPresentacionArt() +
            "}";
    }
}
