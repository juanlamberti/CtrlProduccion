package com.findotechnet.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoParametro.
 */
@Entity
@Table(name = "tipo_parametro")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoParametro extends AbstractAuditingEntity<Long> {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipoParametroSequence")
    @SequenceGenerator(name = "tipoParametroSequence", sequenceName = "tp_param_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "codigo_tp_param", length = 20, nullable = false, unique = true)
    private String codigoTpParam;

    @NotNull
    @Size(max = 300)
    @Column(name = "desc_tp_param", length = 300, nullable = false)
    private String descTpParam;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TipoParametro id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoTpParam() {
        return this.codigoTpParam;
    }

    public TipoParametro codigoTpParam(String codigoTpParam) {
        this.setCodigoTpParam(codigoTpParam);
        return this;
    }

    public void setCodigoTpParam(String codigoTpParam) {
        this.codigoTpParam = codigoTpParam;
    }

    public String getDescTpParam() {
        return this.descTpParam;
    }

    public TipoParametro descTpParam(String descTpParam) {
        this.setDescTpParam(descTpParam);
        return this;
    }

    public void setDescTpParam(String descTpParam) {
        this.descTpParam = descTpParam;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoParametro)) {
            return false;
        }
        return getId() != null && getId().equals(((TipoParametro) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoParametro{" +
            "id=" + getId() +
            ", codigoTpParam='" + getCodigoTpParam() + "'" +
            ", descTpParam='" + getDescTpParam() + "'" +
            "}";
    }
}
