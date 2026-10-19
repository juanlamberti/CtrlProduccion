package com.findotechnet.service.criteria;

import java.io.Serial;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.findotechnet.domain.TipoParametro} entity. This class is used
 * in {@link com.findotechnet.web.rest.TipoParametroResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tipo-parametros?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoParametroCriteria extends AbstractCriteria {

    @Serial
    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter codigoTpParam;

    private StringFilter descTpParam;

    private Boolean distinct;

    public TipoParametroCriteria() {}

    public TipoParametroCriteria(TipoParametroCriteria other) {
        super(other);
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.codigoTpParam = other.optionalCodigoTpParam().map(StringFilter::copy).orElse(null);
        this.descTpParam = other.optionalDescTpParam().map(StringFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public TipoParametroCriteria copy() {
        return new TipoParametroCriteria(this);
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

    public StringFilter getCodigoTpParam() {
        return codigoTpParam;
    }

    public Optional<StringFilter> optionalCodigoTpParam() {
        return Optional.ofNullable(codigoTpParam);
    }

    public StringFilter codigoTpParam() {
        if (codigoTpParam == null) {
            setCodigoTpParam(new StringFilter());
        }
        return codigoTpParam;
    }

    public void setCodigoTpParam(StringFilter codigoTpParam) {
        this.codigoTpParam = codigoTpParam;
    }

    public StringFilter getDescTpParam() {
        return descTpParam;
    }

    public Optional<StringFilter> optionalDescTpParam() {
        return Optional.ofNullable(descTpParam);
    }

    public StringFilter descTpParam() {
        if (descTpParam == null) {
            setDescTpParam(new StringFilter());
        }
        return descTpParam;
    }

    public void setDescTpParam(StringFilter descTpParam) {
        this.descTpParam = descTpParam;
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
        final TipoParametroCriteria that = (TipoParametroCriteria) o;
        if (!super.equals(o)) {
            return false;
        }
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(codigoTpParam, that.codigoTpParam) &&
            Objects.equals(descTpParam, that.descTpParam) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, codigoTpParam, descTpParam, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoParametroCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalCodigoTpParam().map(f -> "codigoTpParam=" + f + ", ").orElse("") +
            optionalDescTpParam().map(f -> "descTpParam=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        super.toString() +
        "}";
    }
}
