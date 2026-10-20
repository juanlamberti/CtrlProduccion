package com.findotechnet.service;

import com.findotechnet.domain.Articulo;
import com.findotechnet.domain.Ingrediente;
import com.findotechnet.domain.enumeration.NaturalezaArticulo;
import com.findotechnet.repository.ArticuloRepository;
import com.findotechnet.repository.IngredienteRepository;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/**
 * Service Implementation for managing {@link com.findotechnet.domain.Articulo}.
 */
@Service
@Transactional
public class ArticuloService {

    private static final Logger LOG = LoggerFactory.getLogger(ArticuloService.class);

    private final ArticuloRepository articuloRepository;

    private final IngredienteRepository ingredienteRepository;

    public ArticuloService(ArticuloRepository articuloRepository, IngredienteRepository ingredienteRepository) {
        this.ingredienteRepository = ingredienteRepository;
        this.articuloRepository = articuloRepository;
    }

    /**
     * Save a articulo.
     *
     * @param articulo the entity to save.
     * @return the persisted entity.
     */
    public Articulo save(Articulo articulo) {
        LOG.debug("Request to save Articulo : {}", articulo);
        clasificar(articulo);
        return articuloRepository.save(articulo);
    }

    /**
     * Update a articulo.
     *
     * @param articulo the entity to save.
     * @return the persisted entity.
     */
    public Articulo update(Articulo articulo) {
        LOG.debug("Request to update Articulo : {}", articulo);
        clasificar(articulo);
        return articuloRepository.save(articulo);
    }

    /**
     * Partially update a articulo.
     *
     * @param articulo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Articulo> partialUpdate(Articulo articulo) {
        LOG.debug("Request to partially update Articulo : {}", articulo);

        return articuloRepository
            .findById(articulo.getId())
            .map(existingArticulo -> {
                updateIfPresent(existingArticulo::setDescArt, articulo.getDescArt());
                updateIfPresent(existingArticulo::setRecetaArt, articulo.getRecetaArt());
                updateIfPresent(existingArticulo::setUnidadGenerarArt, articulo.getUnidadGenerarArt());
                updateIfPresent(existingArticulo::setMermaPreparacionArt, articulo.getMermaPreparacionArt());
                updateIfPresent(existingArticulo::setPesoArt, articulo.getPesoArt());
                updateIfPresent(existingArticulo::setPresentacionCompraArt, articulo.getPresentacionCompraArt());
                updateIfPresent(existingArticulo::setValorPresentacionArt, articulo.getValorPresentacionArt());

                return existingArticulo;
            })
            .map(this::save);
    }

    /**
     * Get all the articulos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Articulo> findAllWithEagerRelationships(Pageable pageable) {
        return articuloRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one articulo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Articulo> findOne(Long id) {
        LOG.debug("Request to get Articulo : {}", id);
        return articuloRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the articulo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Articulo : {}", id);
        articuloRepository.deleteById(id);
    }

    public void actualizarNaturaleza(Long id) {
        articuloRepository.findById(id).ifPresent(this::clasificar);
    }

    private void clasificar(Articulo articulo) {
        articulo.setNaturalezaArt(
            articulo.getId() != null && ingredienteRepository.existsByArticuloId(articulo.getId())
                ? NaturalezaArticulo.COMPUESTO
                : NaturalezaArticulo.SIMPLE
        );
    }

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }

    public Articulo calculateTotals(Long id) {
        if (!articuloRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Artículo inexistente");
        }
        Map<Long, List<Ingrediente>> relations = new HashMap<>();
        Articulo result = sum(id, new HashSet<>(), new HashMap<>(), relations);
        if (relations.get(id).isEmpty()) {
            articuloRepository.findById(id).ifPresent(existing -> {
                result.setValorPresentacionArt(
                    existing.getValorPresentacionArt() == null ? BigDecimal.ZERO : existing.getValorPresentacionArt()
                );
                result.setPesoArt(existing.getPesoArt() == null ? 0f : existing.getPesoArt());
            });
        }
        result.setNaturalezaArt(relations.get(id).isEmpty() ? NaturalezaArticulo.SIMPLE : NaturalezaArticulo.COMPUESTO);
        return result.valorPresentacionArt(result.getValorPresentacionArt().setScale(2, RoundingMode.HALF_UP));
    }

    private Articulo sum(Long id, Set<Long> path, Map<Long, Articulo> cache, Map<Long, List<Ingrediente>> relations) {
        if (cache.containsKey(id)) {
            return cache.get(id);
        }
        if (!path.add(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La receta contiene una relación circular de ingredientes");
        }
        BigDecimal monto = BigDecimal.ZERO;
        BigDecimal peso = BigDecimal.ZERO;
        List<Ingrediente> children = relations.computeIfAbsent(id, ingredienteRepository::findChildren);
        for (Ingrediente child : children) {
            BigDecimal cantidad = decimal(child.getCantidadIng());
            if (cantidad.signum() == 0) {
                continue;
            }
            Articulo insumo = child.getInsumo();
            Articulo nested = sum(insumo.getId(), path, cache, relations);
            boolean recipe = !relations.get(insumo.getId()).isEmpty();
            BigDecimal presentacion = recipe ? decimal(nested.getPesoArt()) : decimal(insumo.getPresentacionCompraArt());
            BigDecimal valor = recipe ? nested.getValorPresentacionArt() : insumo.getValorPresentacionArt();
            if (presentacion.signum() <= 0 || valor == null) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "El ingrediente debe tener presentación mayor a cero y valor");
            }
            monto = monto.add(valor.multiply(cantidad).divide(presentacion, MathContext.DECIMAL128));
            peso = peso.add(cantidad);
        }
        path.remove(id);
        Articulo result = new Articulo().id(id).valorPresentacionArt(monto).pesoArt(peso.floatValue());
        cache.put(id, result);
        return result;
    }

    private BigDecimal decimal(Float value) {
        return value == null ? BigDecimal.ZERO : new BigDecimal(Float.toString(value));
    }
}
