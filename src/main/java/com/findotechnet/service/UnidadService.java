package com.findotechnet.service;

import com.findotechnet.domain.Unidad;
import com.findotechnet.repository.UnidadRepository;
import java.util.Optional;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.findotechnet.domain.Unidad}.
 */
@Service
@Transactional
public class UnidadService {

    private static final Logger LOG = LoggerFactory.getLogger(UnidadService.class);

    private final UnidadRepository unidadRepository;

    public UnidadService(UnidadRepository unidadRepository) {
        this.unidadRepository = unidadRepository;
    }

    /**
     * Save a unidad.
     *
     * @param unidad the entity to save.
     * @return the persisted entity.
     */
    public Unidad save(Unidad unidad) {
        LOG.debug("Request to save Unidad : {}", unidad);
        return unidadRepository.save(unidad);
    }

    /**
     * Update a unidad.
     *
     * @param unidad the entity to save.
     * @return the persisted entity.
     */
    public Unidad update(Unidad unidad) {
        LOG.debug("Request to update Unidad : {}", unidad);
        return unidadRepository.save(unidad);
    }

    /**
     * Partially update a unidad.
     *
     * @param unidad the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Unidad> partialUpdate(Unidad unidad) {
        LOG.debug("Request to partially update Unidad : {}", unidad);

        return unidadRepository
            .findById(unidad.getId())
            .map(existingUnidad -> {
                updateIfPresent(existingUnidad::setDescUni, unidad.getDescUni());

                return existingUnidad;
            })
            .map(unidadRepository::save);
    }

    /**
     * Get one unidad by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Unidad> findOne(Long id) {
        LOG.debug("Request to get Unidad : {}", id);
        return unidadRepository.findById(id);
    }

    /**
     * Delete the unidad by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Unidad : {}", id);
        unidadRepository.deleteById(id);
    }

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
