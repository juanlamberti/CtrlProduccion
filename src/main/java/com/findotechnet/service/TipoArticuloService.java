package com.findotechnet.service;

import com.findotechnet.domain.TipoArticulo;
import com.findotechnet.repository.TipoArticuloRepository;
import java.util.Optional;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.findotechnet.domain.TipoArticulo}.
 */
@Service
@Transactional
public class TipoArticuloService {

    private static final Logger LOG = LoggerFactory.getLogger(TipoArticuloService.class);

    private final TipoArticuloRepository tipoArticuloRepository;

    public TipoArticuloService(TipoArticuloRepository tipoArticuloRepository) {
        this.tipoArticuloRepository = tipoArticuloRepository;
    }

    /**
     * Save a tipoArticulo.
     *
     * @param tipoArticulo the entity to save.
     * @return the persisted entity.
     */
    public TipoArticulo save(TipoArticulo tipoArticulo) {
        LOG.debug("Request to save TipoArticulo : {}", tipoArticulo);
        return tipoArticuloRepository.save(tipoArticulo);
    }

    /**
     * Update a tipoArticulo.
     *
     * @param tipoArticulo the entity to save.
     * @return the persisted entity.
     */
    public TipoArticulo update(TipoArticulo tipoArticulo) {
        LOG.debug("Request to update TipoArticulo : {}", tipoArticulo);
        return tipoArticuloRepository.save(tipoArticulo);
    }

    /**
     * Partially update a tipoArticulo.
     *
     * @param tipoArticulo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TipoArticulo> partialUpdate(TipoArticulo tipoArticulo) {
        LOG.debug("Request to partially update TipoArticulo : {}", tipoArticulo);

        return tipoArticuloRepository
            .findById(tipoArticulo.getId())
            .map(existingTipoArticulo -> {
                updateIfPresent(existingTipoArticulo::setDescTpArt, tipoArticulo.getDescTpArt());

                return existingTipoArticulo;
            })
            .map(tipoArticuloRepository::save);
    }

    /**
     * Get one tipoArticulo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TipoArticulo> findOne(Long id) {
        LOG.debug("Request to get TipoArticulo : {}", id);
        return tipoArticuloRepository.findById(id);
    }

    /**
     * Delete the tipoArticulo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete TipoArticulo : {}", id);
        tipoArticuloRepository.deleteById(id);
    }

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
