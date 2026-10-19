package com.findotechnet.service;

import com.findotechnet.domain.Ingrediente;
import com.findotechnet.repository.IngredienteRepository;
import java.util.Optional;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.findotechnet.domain.Ingrediente}.
 */
@Service
@Transactional
public class IngredienteService {

    private static final Logger LOG = LoggerFactory.getLogger(IngredienteService.class);

    private final IngredienteRepository ingredienteRepository;

    public IngredienteService(IngredienteRepository ingredienteRepository) {
        this.ingredienteRepository = ingredienteRepository;
    }

    /**
     * Save a ingrediente.
     *
     * @param ingrediente the entity to save.
     * @return the persisted entity.
     */
    public Ingrediente save(Ingrediente ingrediente) {
        LOG.debug("Request to save Ingrediente : {}", ingrediente);
        return ingredienteRepository.save(ingrediente);
    }

    /**
     * Update a ingrediente.
     *
     * @param ingrediente the entity to save.
     * @return the persisted entity.
     */
    public Ingrediente update(Ingrediente ingrediente) {
        LOG.debug("Request to update Ingrediente : {}", ingrediente);
        return ingredienteRepository.save(ingrediente);
    }

    /**
     * Partially update a ingrediente.
     *
     * @param ingrediente the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Ingrediente> partialUpdate(Ingrediente ingrediente) {
        LOG.debug("Request to partially update Ingrediente : {}", ingrediente);

        return ingredienteRepository
            .findById(ingrediente.getId())
            .map(existingIngrediente -> {
                updateIfPresent(existingIngrediente::setCantidadIng, ingrediente.getCantidadIng());

                return existingIngrediente;
            })
            .map(ingredienteRepository::save);
    }

    /**
     * Get all the ingredientes with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Ingrediente> findAllWithEagerRelationships(Pageable pageable) {
        return ingredienteRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one ingrediente by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Ingrediente> findOne(Long id) {
        LOG.debug("Request to get Ingrediente : {}", id);
        return ingredienteRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the ingrediente by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Ingrediente : {}", id);
        ingredienteRepository.deleteById(id);
    }

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
