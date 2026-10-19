package com.findotechnet.service.criteria;

import java.io.Serial;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.findotechnet.domain.Unidad} entity. This class is used
 * in {@link com.findotechnet.web.rest.UnidadResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /unidads?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UnidadCriteria extends AbstractCriteria {

    @Serial
    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descUni;

    private Boolean distinct;

    public UnidadCriteria() {}

    public UnidadCriteria(UnidadCriteria other) {
        super(other);
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.descUni = other.optionalDescUni().map(StringFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public UnidadCriteria copy() {
        return new UnidadCriteria(this);
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

    public StringFilter getDescUni() {
        return descUni;
    }

    public Optional<StringFilter> optionalDescUni() {
        return Optional.ofNullable(descUni);
    }

    public StringFilter descUni() {
        if (descUni == null) {
            setDescUni(new StringFilter());
        }
        return descUni;
    }

    public void setDescUni(StringFilter descUni) {
        this.descUni = descUni;
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
        final UnidadCriteria that = (UnidadCriteria) o;
        if (!super.equals(o)) {
            return false;
        }
        return Objects.equals(id, that.id) && Objects.equals(descUni, that.descUni) && Objects.equals(distinct, that.distinct);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, descUni, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UnidadCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalDescUni().map(f -> "descUni=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        super.toString() +
        "}";
    }
}
