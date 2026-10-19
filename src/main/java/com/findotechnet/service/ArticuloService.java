package com.findotechnet.service;

import com.findotechnet.domain.Articulo;
import com.findotechnet.repository.ArticuloRepository;
import java.util.Optional;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.findotechnet.domain.Articulo}.
 */
@Service
@Transactional
public class ArticuloService {

    private static final Logger LOG = LoggerFactory.getLogger(ArticuloService.class);

    private final ArticuloRepository articuloRepository;

    public ArticuloService(ArticuloRepository articuloRepository) {
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
            .map(articuloRepository::save);
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

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
