package com.findotechnet.service.criteria;

import java.io.Serial;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.findotechnet.domain.Parametro} entity. This class is used
 * in {@link com.findotechnet.web.rest.ParametroResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /parametros?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ParametroCriteria extends AbstractCriteria {

    @Serial
    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter codigoParam;

    private StringFilter descParam;

    private StringFilter valorParam;

    private StringFilter editCteSNParam;

    private LongFilter tipoId;

    private Boolean distinct;

    public ParametroCriteria() {}

    public ParametroCriteria(ParametroCriteria other) {
        super(other);
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.codigoParam = other.optionalCodigoParam().map(StringFilter::copy).orElse(null);
        this.descParam = other.optionalDescParam().map(StringFilter::copy).orElse(null);
        this.valorParam = other.optionalValorParam().map(StringFilter::copy).orElse(null);
        this.editCteSNParam = other.optionalEditCteSNParam().map(StringFilter::copy).orElse(null);
        this.tipoId = other.optionalTipoId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public ParametroCriteria copy() {
        return new ParametroCriteria(this);
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

    public StringFilter getCodigoParam() {
        return codigoParam;
    }

    public Optional<StringFilter> optionalCodigoParam() {
        return Optional.ofNullable(codigoParam);
    }

    public StringFilter codigoParam() {
        if (codigoParam == null) {
            setCodigoParam(new StringFilter());
        }
        return codigoParam;
    }

    public void setCodigoParam(StringFilter codigoParam) {
        this.codigoParam = codigoParam;
    }

    public StringFilter getDescParam() {
        return descParam;
    }

    public Optional<StringFilter> optionalDescParam() {
        return Optional.ofNullable(descParam);
    }

    public StringFilter descParam() {
        if (descParam == null) {
            setDescParam(new StringFilter());
        }
        return descParam;
    }

    public void setDescParam(StringFilter descParam) {
        this.descParam = descParam;
    }

    public StringFilter getValorParam() {
        return valorParam;
    }

    public Optional<StringFilter> optionalValorParam() {
        return Optional.ofNullable(valorParam);
    }

    public StringFilter valorParam() {
        if (valorParam == null) {
            setValorParam(new StringFilter());
        }
        return valorParam;
    }

    public void setValorParam(StringFilter valorParam) {
        this.valorParam = valorParam;
    }

    public StringFilter getEditCteSNParam() {
        return editCteSNParam;
    }

    public Optional<StringFilter> optionalEditCteSNParam() {
        return Optional.ofNullable(editCteSNParam);
    }

    public StringFilter editCteSNParam() {
        if (editCteSNParam == null) {
            setEditCteSNParam(new StringFilter());
        }
        return editCteSNParam;
    }

    public void setEditCteSNParam(StringFilter editCteSNParam) {
        this.editCteSNParam = editCteSNParam;
    }

    public LongFilter getTipoId() {
        return tipoId;
    }

    public Optional<LongFilter> optionalTipoId() {
        return Optional.ofNullable(tipoId);
    }

    public LongFilter tipoId() {
        if (tipoId == null) {
            setTipoId(new LongFilter());
        }
        return tipoId;
    }

    public void setTipoId(LongFilter tipoId) {
        this.tipoId = tipoId;
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
        final ParametroCriteria that = (ParametroCriteria) o;
        if (!super.equals(o)) {
            return false;
        }
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(codigoParam, that.codigoParam) &&
            Objects.equals(descParam, that.descParam) &&
            Objects.equals(valorParam, that.valorParam) &&
            Objects.equals(editCteSNParam, that.editCteSNParam) &&
            Objects.equals(tipoId, that.tipoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, codigoParam, descParam, valorParam, editCteSNParam, tipoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParametroCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalCodigoParam().map(f -> "codigoParam=" + f + ", ").orElse("") +
            optionalDescParam().map(f -> "descParam=" + f + ", ").orElse("") +
            optionalValorParam().map(f -> "valorParam=" + f + ", ").orElse("") +
            optionalEditCteSNParam().map(f -> "editCteSNParam=" + f + ", ").orElse("") +
            optionalTipoId().map(f -> "tipoId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        super.toString() +
        "}";
    }
}
