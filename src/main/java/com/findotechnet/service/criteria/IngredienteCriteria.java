package com.findotechnet.service.criteria;

import java.io.Serial;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.findotechnet.domain.Ingrediente} entity. This class is used
 * in {@link com.findotechnet.web.rest.IngredienteResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /ingredientes?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class IngredienteCriteria extends AbstractCriteria {

    @Serial
    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private FloatFilter cantidadIng;

    private LongFilter articuloId;

    private LongFilter insumoId;

    private Boolean distinct;

    public IngredienteCriteria() {}

    public IngredienteCriteria(IngredienteCriteria other) {
        super(other);
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.cantidadIng = other.optionalCantidadIng().map(FloatFilter::copy).orElse(null);
        this.articuloId = other.optionalArticuloId().map(LongFilter::copy).orElse(null);
        this.insumoId = other.optionalInsumoId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public IngredienteCriteria copy() {
        return new IngredienteCriteria(this);
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

    public FloatFilter getCantidadIng() {
        return cantidadIng;
    }

    public Optional<FloatFilter> optionalCantidadIng() {
        return Optional.ofNullable(cantidadIng);
    }

    public FloatFilter cantidadIng() {
        if (cantidadIng == null) {
            setCantidadIng(new FloatFilter());
        }
        return cantidadIng;
    }

    public void setCantidadIng(FloatFilter cantidadIng) {
        this.cantidadIng = cantidadIng;
    }

    public LongFilter getArticuloId() {
        return articuloId;
    }

    public Optional<LongFilter> optionalArticuloId() {
        return Optional.ofNullable(articuloId);
    }

    public LongFilter articuloId() {
        if (articuloId == null) {
            setArticuloId(new LongFilter());
        }
        return articuloId;
    }

    public void setArticuloId(LongFilter articuloId) {
        this.articuloId = articuloId;
    }

    public LongFilter getInsumoId() {
        return insumoId;
    }

    public Optional<LongFilter> optionalInsumoId() {
        return Optional.ofNullable(insumoId);
    }

    public LongFilter insumoId() {
        if (insumoId == null) {
            setInsumoId(new LongFilter());
        }
        return insumoId;
    }

    public void setInsumoId(LongFilter insumoId) {
        this.insumoId = insumoId;
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
        final IngredienteCriteria that = (IngredienteCriteria) o;
        if (!super.equals(o)) {
            return false;
        }
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(cantidadIng, that.cantidadIng) &&
            Objects.equals(articuloId, that.articuloId) &&
            Objects.equals(insumoId, that.insumoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, cantidadIng, articuloId, insumoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "IngredienteCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalCantidadIng().map(f -> "cantidadIng=" + f + ", ").orElse("") +
            optionalArticuloId().map(f -> "articuloId=" + f + ", ").orElse("") +
            optionalInsumoId().map(f -> "insumoId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        super.toString() +
        "}";
    }
}
