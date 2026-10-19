package com.findotechnet.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Parametro.
 */
@Entity
@Table(name = "parametro")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Parametro extends AbstractAuditingEntity<Long> {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "parametroSequence")
    @SequenceGenerator(name = "parametroSequence", sequenceName = "param_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "codigo_param", length = 20, nullable = false, unique = true)
    private String codigoParam;

    @NotNull
    @Size(max = 500)
    @Column(name = "desc_param", length = 500, nullable = false)
    private String descParam;

    @Size(max = 32000)
    @Column(name = "valor_param", length = 32000)
    private String valorParam;

    @Lob
    @Column(name = "archivo_param")
    private byte[] archivoParam;

    @Column(name = "archivo_param_content_type")
    private String archivoParamContentType;

    @NotNull
    @Size(max = 2)
    @Column(name = "edit_cte_sn_param", length = 2, nullable = false)
    private String editCteSNParam;

    @ManyToOne(fetch = FetchType.LAZY)
    private TipoParametro tipo;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Parametro id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoParam() {
        return this.codigoParam;
    }

    public Parametro codigoParam(String codigoParam) {
        this.setCodigoParam(codigoParam);
        return this;
    }

    public void setCodigoParam(String codigoParam) {
        this.codigoParam = codigoParam;
    }

    public String getDescParam() {
        return this.descParam;
    }

    public Parametro descParam(String descParam) {
        this.setDescParam(descParam);
        return this;
    }

    public void setDescParam(String descParam) {
        this.descParam = descParam;
    }

    public String getValorParam() {
        return this.valorParam;
    }

    public Parametro valorParam(String valorParam) {
        this.setValorParam(valorParam);
        return this;
    }

    public void setValorParam(String valorParam) {
        this.valorParam = valorParam;
    }

    public byte[] getArchivoParam() {
        return this.archivoParam;
    }

    public Parametro archivoParam(byte[] archivoParam) {
        this.setArchivoParam(archivoParam);
        return this;
    }

    public void setArchivoParam(byte[] archivoParam) {
        this.archivoParam = archivoParam;
    }

    public String getArchivoParamContentType() {
        return this.archivoParamContentType;
    }

    public Parametro archivoParamContentType(String archivoParamContentType) {
        this.archivoParamContentType = archivoParamContentType;
        return this;
    }

    public void setArchivoParamContentType(String archivoParamContentType) {
        this.archivoParamContentType = archivoParamContentType;
    }

    public String getEditCteSNParam() {
        return this.editCteSNParam;
    }

    public Parametro editCteSNParam(String editCteSNParam) {
        this.setEditCteSNParam(editCteSNParam);
        return this;
    }

    public void setEditCteSNParam(String editCteSNParam) {
        this.editCteSNParam = editCteSNParam;
    }

    public TipoParametro getTipo() {
        return this.tipo;
    }

    public void setTipo(TipoParametro tipoParametro) {
        this.tipo = tipoParametro;
    }

    public Parametro tipo(TipoParametro tipoParametro) {
        this.setTipo(tipoParametro);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parametro)) {
            return false;
        }
        return getId() != null && getId().equals(((Parametro) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Parametro{" +
            "id=" + getId() +
            ", codigoParam='" + getCodigoParam() + "'" +
            ", descParam='" + getDescParam() + "'" +
            ", valorParam='" + getValorParam() + "'" +
            ", archivoParam='" + getArchivoParam() + "'" +
            ", archivoParamContentType='" + getArchivoParamContentType() + "'" +
            ", editCteSNParam='" + getEditCteSNParam() + "'" +
            "}";
    }
}
