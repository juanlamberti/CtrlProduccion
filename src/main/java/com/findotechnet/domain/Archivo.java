package com.findotechnet.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Archivo.
 */
@Entity
@Table(name = "archivo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Archivo extends AbstractAuditingEntity<Long> {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "archivoSequence")
    @SequenceGenerator(name = "archivoSequence", sequenceName = "arc_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 1000)
    @Column(name = "nombre_arc", length = 1000, nullable = false)
    private String nombreArc;

    @NotNull
    @Size(max = 20)
    @Column(name = "estado_arc", length = 20, nullable = false)
    private String estadoArc;

    @NotNull
    @Size(max = 100)
    @Column(name = "tipo_arc", length = 100, nullable = false)
    private String tipoArc;

    @Lob
    @Column(name = "archivo_arc", nullable = false)
    private byte[] archivoArc;

    @NotNull
    @Column(name = "archivo_arc_content_type", nullable = false)
    private String archivoArcContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Archivo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreArc() {
        return this.nombreArc;
    }

    public Archivo nombreArc(String nombreArc) {
        this.setNombreArc(nombreArc);
        return this;
    }

    public void setNombreArc(String nombreArc) {
        this.nombreArc = nombreArc;
    }

    public String getEstadoArc() {
        return this.estadoArc;
    }

    public Archivo estadoArc(String estadoArc) {
        this.setEstadoArc(estadoArc);
        return this;
    }

    public void setEstadoArc(String estadoArc) {
        this.estadoArc = estadoArc;
    }

    public String getTipoArc() {
        return this.tipoArc;
    }

    public Archivo tipoArc(String tipoArc) {
        this.setTipoArc(tipoArc);
        return this;
    }

    public void setTipoArc(String tipoArc) {
        this.tipoArc = tipoArc;
    }

    public byte[] getArchivoArc() {
        return this.archivoArc;
    }

    public Archivo archivoArc(byte[] archivoArc) {
        this.setArchivoArc(archivoArc);
        return this;
    }

    public void setArchivoArc(byte[] archivoArc) {
        this.archivoArc = archivoArc;
    }

    public String getArchivoArcContentType() {
        return this.archivoArcContentType;
    }

    public Archivo archivoArcContentType(String archivoArcContentType) {
        this.archivoArcContentType = archivoArcContentType;
        return this;
    }

    public void setArchivoArcContentType(String archivoArcContentType) {
        this.archivoArcContentType = archivoArcContentType;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Archivo)) {
            return false;
        }
        return getId() != null && getId().equals(((Archivo) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Archivo{" +
            "id=" + getId() +
            ", nombreArc='" + getNombreArc() + "'" +
            ", estadoArc='" + getEstadoArc() + "'" +
            ", tipoArc='" + getTipoArc() + "'" +
            ", archivoArc='" + getArchivoArc() + "'" +
            ", archivoArcContentType='" + getArchivoArcContentType() + "'" +
            "}";
    }
}
