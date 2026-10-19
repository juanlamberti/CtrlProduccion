package com.findotechnet.service.criteria;

import java.io.Serial;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.findotechnet.domain.TipoArticulo} entity. This class is used
 * in {@link com.findotechnet.web.rest.TipoArticuloResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tipo-articulos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoArticuloCriteria extends AbstractCriteria {

    @Serial
    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descTpArt;

    private Boolean distinct;

    public TipoArticuloCriteria() {}

    public TipoArticuloCriteria(TipoArticuloCriteria other) {
        super(other);
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.descTpArt = other.optionalDescTpArt().map(StringFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public TipoArticuloCriteria copy() {
        return new TipoArticuloCriteria(this);
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

    public StringFilter getDescTpArt() {
        return descTpArt;
    }

    public Optional<StringFilter> optionalDescTpArt() {
        return Optional.ofNullable(descTpArt);
    }

    public StringFilter descTpArt() {
        if (descTpArt == null) {
            setDescTpArt(new StringFilter());
        }
        return descTpArt;
    }

    public void setDescTpArt(StringFilter descTpArt) {
        this.descTpArt = descTpArt;
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
        final TipoArticuloCriteria that = (TipoArticuloCriteria) o;
        if (!super.equals(o)) {
            return false;
        }
        return Objects.equals(id, that.id) && Objects.equals(descTpArt, that.descTpArt) && Objects.equals(distinct, that.distinct);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, descTpArt, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoArticuloCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalDescTpArt().map(f -> "descTpArt=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        super.toString() +
        "}";
    }
}
