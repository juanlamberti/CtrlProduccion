package com.findotechnet.service.criteria;

import com.findotechnet.domain.enumeration.NaturalezaArticulo;
import java.io.Serial;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.findotechnet.domain.Articulo} entity. This class is used
 * in {@link com.findotechnet.web.rest.ArticuloResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /articulos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ArticuloCriteria extends AbstractCriteria {

    @Serial
    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descArt;

    private StringFilter recetaArt;

    private FloatFilter unidadGenerarArt;

    private FloatFilter mermaPreparacionArt;

    private FloatFilter pesoArt;

    private FloatFilter presentacionCompraArt;

    private BigDecimalFilter valorPresentacionArt;

    private LongFilter unidadPresentacionArtId;

    private LongFilter tipoArtId;

    private NaturalezaArticulo naturalezaArt;

    private Long insumoId;

    private Boolean distinct;

    public ArticuloCriteria() {}

    public ArticuloCriteria(ArticuloCriteria other) {
        super(other);
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.descArt = other.optionalDescArt().map(StringFilter::copy).orElse(null);
        this.recetaArt = other.optionalRecetaArt().map(StringFilter::copy).orElse(null);
        this.unidadGenerarArt = other.optionalUnidadGenerarArt().map(FloatFilter::copy).orElse(null);
        this.mermaPreparacionArt = other.optionalMermaPreparacionArt().map(FloatFilter::copy).orElse(null);
        this.pesoArt = other.optionalPesoArt().map(FloatFilter::copy).orElse(null);
        this.presentacionCompraArt = other.optionalPresentacionCompraArt().map(FloatFilter::copy).orElse(null);
        this.valorPresentacionArt = other.optionalValorPresentacionArt().map(BigDecimalFilter::copy).orElse(null);
        this.unidadPresentacionArtId = other.optionalUnidadPresentacionArtId().map(LongFilter::copy).orElse(null);
        this.tipoArtId = other.optionalTipoArtId().map(LongFilter::copy).orElse(null);
        this.naturalezaArt = other.naturalezaArt;
        this.insumoId = other.insumoId;
        this.distinct = other.distinct;
    }

    @Override
    public ArticuloCriteria copy() {
        return new ArticuloCriteria(this);
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

    public StringFilter getDescArt() {
        return descArt;
    }

    public Optional<StringFilter> optionalDescArt() {
        return Optional.ofNullable(descArt);
    }

    public StringFilter descArt() {
        if (descArt == null) {
            setDescArt(new StringFilter());
        }
        return descArt;
    }

    public void setDescArt(StringFilter descArt) {
        this.descArt = descArt;
    }

    public StringFilter getRecetaArt() {
        return recetaArt;
    }

    public Optional<StringFilter> optionalRecetaArt() {
        return Optional.ofNullable(recetaArt);
    }

    public StringFilter recetaArt() {
        if (recetaArt == null) {
            setRecetaArt(new StringFilter());
        }
        return recetaArt;
    }

    public void setRecetaArt(StringFilter recetaArt) {
        this.recetaArt = recetaArt;
    }

    public FloatFilter getUnidadGenerarArt() {
        return unidadGenerarArt;
    }

    public Optional<FloatFilter> optionalUnidadGenerarArt() {
        return Optional.ofNullable(unidadGenerarArt);
    }

    public FloatFilter unidadGenerarArt() {
        if (unidadGenerarArt == null) {
            setUnidadGenerarArt(new FloatFilter());
        }
        return unidadGenerarArt;
    }

    public void setUnidadGenerarArt(FloatFilter unidadGenerarArt) {
        this.unidadGenerarArt = unidadGenerarArt;
    }

    public FloatFilter getMermaPreparacionArt() {
        return mermaPreparacionArt;
    }

    public Optional<FloatFilter> optionalMermaPreparacionArt() {
        return Optional.ofNullable(mermaPreparacionArt);
    }

    public FloatFilter mermaPreparacionArt() {
        if (mermaPreparacionArt == null) {
            setMermaPreparacionArt(new FloatFilter());
        }
        return mermaPreparacionArt;
    }

    public void setMermaPreparacionArt(FloatFilter mermaPreparacionArt) {
        this.mermaPreparacionArt = mermaPreparacionArt;
    }

    public FloatFilter getPesoArt() {
        return pesoArt;
    }

    public Optional<FloatFilter> optionalPesoArt() {
        return Optional.ofNullable(pesoArt);
    }

    public FloatFilter pesoArt() {
        if (pesoArt == null) {
            setPesoArt(new FloatFilter());
        }
        return pesoArt;
    }

    public void setPesoArt(FloatFilter pesoArt) {
        this.pesoArt = pesoArt;
    }

    public FloatFilter getPresentacionCompraArt() {
        return presentacionCompraArt;
    }

    public Optional<FloatFilter> optionalPresentacionCompraArt() {
        return Optional.ofNullable(presentacionCompraArt);
    }

    public FloatFilter presentacionCompraArt() {
        if (presentacionCompraArt == null) {
            setPresentacionCompraArt(new FloatFilter());
        }
        return presentacionCompraArt;
    }

    public void setPresentacionCompraArt(FloatFilter presentacionCompraArt) {
        this.presentacionCompraArt = presentacionCompraArt;
    }

    public BigDecimalFilter getValorPresentacionArt() {
        return valorPresentacionArt;
    }

    public Optional<BigDecimalFilter> optionalValorPresentacionArt() {
        return Optional.ofNullable(valorPresentacionArt);
    }

    public BigDecimalFilter valorPresentacionArt() {
        if (valorPresentacionArt == null) {
            setValorPresentacionArt(new BigDecimalFilter());
        }
        return valorPresentacionArt;
    }

    public void setValorPresentacionArt(BigDecimalFilter valorPresentacionArt) {
        this.valorPresentacionArt = valorPresentacionArt;
    }

    public LongFilter getUnidadPresentacionArtId() {
        return unidadPresentacionArtId;
    }

    public Optional<LongFilter> optionalUnidadPresentacionArtId() {
        return Optional.ofNullable(unidadPresentacionArtId);
    }

    public LongFilter unidadPresentacionArtId() {
        if (unidadPresentacionArtId == null) {
            setUnidadPresentacionArtId(new LongFilter());
        }
        return unidadPresentacionArtId;
    }

    public void setUnidadPresentacionArtId(LongFilter unidadPresentacionArtId) {
        this.unidadPresentacionArtId = unidadPresentacionArtId;
    }

    public LongFilter getTipoArtId() {
        return tipoArtId;
    }

    public Optional<LongFilter> optionalTipoArtId() {
        return Optional.ofNullable(tipoArtId);
    }

    public LongFilter tipoArtId() {
        if (tipoArtId == null) {
            setTipoArtId(new LongFilter());
        }
        return tipoArtId;
    }

    public void setTipoArtId(LongFilter tipoArtId) {
        this.tipoArtId = tipoArtId;
    }

    public Long getInsumoId() {
        return insumoId;
    }

    public void setInsumoId(Long insumoId) {
        this.insumoId = insumoId;
    }

    public NaturalezaArticulo getNaturalezaArt() {
        return naturalezaArt;
    }

    public void setNaturalezaArt(NaturalezaArticulo naturalezaArt) {
        this.naturalezaArt = naturalezaArt;
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
        final ArticuloCriteria that = (ArticuloCriteria) o;
        if (!super.equals(o)) {
            return false;
        }
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descArt, that.descArt) &&
            Objects.equals(recetaArt, that.recetaArt) &&
            Objects.equals(unidadGenerarArt, that.unidadGenerarArt) &&
            Objects.equals(mermaPreparacionArt, that.mermaPreparacionArt) &&
            Objects.equals(pesoArt, that.pesoArt) &&
            Objects.equals(presentacionCompraArt, that.presentacionCompraArt) &&
            Objects.equals(valorPresentacionArt, that.valorPresentacionArt) &&
            Objects.equals(unidadPresentacionArtId, that.unidadPresentacionArtId) &&
            Objects.equals(tipoArtId, that.tipoArtId) &&
            Objects.equals(naturalezaArt, that.naturalezaArt) &&
            Objects.equals(insumoId, that.insumoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            super.hashCode(),
            id,
            descArt,
            recetaArt,
            unidadGenerarArt,
            mermaPreparacionArt,
            pesoArt,
            presentacionCompraArt,
            valorPresentacionArt,
            unidadPresentacionArtId,
            tipoArtId,
            naturalezaArt,
            insumoId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ArticuloCriteria{" +
            "naturalezaArt=" + naturalezaArt + ", " +
            "insumoId=" + insumoId + ", " +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalDescArt().map(f -> "descArt=" + f + ", ").orElse("") +
            optionalRecetaArt().map(f -> "recetaArt=" + f + ", ").orElse("") +
            optionalUnidadGenerarArt().map(f -> "unidadGenerarArt=" + f + ", ").orElse("") +
            optionalMermaPreparacionArt().map(f -> "mermaPreparacionArt=" + f + ", ").orElse("") +
            optionalPesoArt().map(f -> "pesoArt=" + f + ", ").orElse("") +
            optionalPresentacionCompraArt().map(f -> "presentacionCompraArt=" + f + ", ").orElse("") +
            optionalValorPresentacionArt().map(f -> "valorPresentacionArt=" + f + ", ").orElse("") +
            optionalUnidadPresentacionArtId().map(f -> "unidadPresentacionArtId=" + f + ", ").orElse("") +
            optionalTipoArtId().map(f -> "tipoArtId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        super.toString() +
        "}";
    }
}
