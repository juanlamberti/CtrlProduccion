package com.findotechnet.service.criteria;

import java.io.Serial;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.findotechnet.domain.Archivo} entity. This class is used
 * in {@link com.findotechnet.web.rest.ArchivoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /archivos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ArchivoCriteria extends AbstractCriteria {

    @Serial
    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nombreArc;

    private StringFilter estadoArc;

    private StringFilter tipoArc;

    private Boolean distinct;

    public ArchivoCriteria() {}

    public ArchivoCriteria(ArchivoCriteria other) {
        super(other);
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.nombreArc = other.optionalNombreArc().map(StringFilter::copy).orElse(null);
        this.estadoArc = other.optionalEstadoArc().map(StringFilter::copy).orElse(null);
        this.tipoArc = other.optionalTipoArc().map(StringFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public ArchivoCriteria copy() {
        return new ArchivoCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public Optional<LongFilter> optionalId() {
        return Optional.ofNullable(id);
    }

    public LongFilter id() {
        if (id == null) {
            setId(new LongFilter());
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNombreArc() {
        return nombreArc;
    }

    public Optional<StringFilter> optionalNombreArc() {
        return Optional.ofNullable(nombreArc);
    }

    public StringFilter nombreArc() {
        if (nombreArc == null) {
            setNombreArc(new StringFilter());
        }
        return nombreArc;
    }

    public void setNombreArc(StringFilter nombreArc) {
        this.nombreArc = nombreArc;
    }

    public StringFilter getEstadoArc() {
        return estadoArc;
    }

    public Optional<StringFilter> optionalEstadoArc() {
        return Optional.ofNullable(estadoArc);
    }

    public StringFilter estadoArc() {
        if (estadoArc == null) {
            setEstadoArc(new StringFilter());
        }
        return estadoArc;
    }

    public void setEstadoArc(StringFilter estadoArc) {
        this.estadoArc = estadoArc;
    }

    public StringFilter getTipoArc() {
        return tipoArc;
    }

    public Optional<StringFilter> optionalTipoArc() {
        return Optional.ofNullable(tipoArc);
    }

    public StringFilter tipoArc() {
        if (tipoArc == null) {
            setTipoArc(new StringFilter());
        }
        return tipoArc;
    }

    public void setTipoArc(StringFilter tipoArc) {
        this.tipoArc = tipoArc;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public Optional<Boolean> optionalDistinct() {
        return Optional.ofNullable(distinct);
    }

    public Boolean distinct() {
        if (distinct == null) {
            setDistinct(true);
        }
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ArchivoCriteria that = (ArchivoCriteria) o;
        if (!super.equals(o)) {
            return false;
        }
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nombreArc, that.nombreArc) &&
            Objects.equals(estadoArc, that.estadoArc) &&
            Objects.equals(tipoArc, that.tipoArc) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, nombreArc, estadoArc, tipoArc, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ArchivoCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalNombreArc().map(f -> "nombreArc=" + f + ", ").orElse("") +
            optionalEstadoArc().map(f -> "estadoArc=" + f + ", ").orElse("") +
            optionalTipoArc().map(f -> "tipoArc=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        super.toString() +
        "}";
    }
}
