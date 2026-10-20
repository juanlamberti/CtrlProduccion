package com.findotechnet.service;

import com.findotechnet.domain.Ingrediente;
import com.findotechnet.repository.IngredienteRepository;
import java.util.HashSet;
import java.util.Objects;
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
 * Service Implementation for managing {@link com.findotechnet.domain.Ingrediente}.
 */
@Service
@Transactional
public class IngredienteService {

    private static final Logger LOG = LoggerFactory.getLogger(IngredienteService.class);

    private final IngredienteRepository ingredienteRepository;

    private final ArticuloService articuloService;

    public IngredienteService(IngredienteRepository ingredienteRepository, ArticuloService articuloService) {
        this.ingredienteRepository = ingredienteRepository;
        this.articuloService = articuloService;
    }

    /**
     * Save a ingrediente.
     *
     * @param ingrediente the entity to save.
     * @return the persisted entity.
     */
    public Ingrediente save(Ingrediente ingrediente) {
        LOG.debug("Request to save Ingrediente : {}", ingrediente);
        return guardar(ingrediente);
    }

    /**
     * Update a ingrediente.
     *
     * @param ingrediente the entity to save.
     * @return the persisted entity.
     */
    public Ingrediente update(Ingrediente ingrediente) {
        LOG.debug("Request to update Ingrediente : {}", ingrediente);
        return guardar(ingrediente);
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
            .map(this::guardar);
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
        ingredienteRepository.findById(id).ifPresent(ingrediente -> {
            Long articuloId = ingrediente.getArticulo().getId();
            ingredienteRepository.delete(ingrediente);
            ingredienteRepository.flush();
            articuloService.actualizarNaturaleza(articuloId);
        });
    }

    private Ingrediente guardar(Ingrediente ingrediente) {
        Long anterior =
            ingrediente.getId() == null
                ? null
                : ingredienteRepository
                      .findById(ingrediente.getId())
                      .map(i -> i.getArticulo().getId())
                      .orElse(null);
        Long articuloId = ingrediente.getArticulo().getId();
        validarSinCiclos(ingrediente.getInsumo().getId(), articuloId, ingrediente.getId(), new HashSet<>());
        Ingrediente saved = ingredienteRepository.saveAndFlush(ingrediente);
        articuloService.actualizarNaturaleza(articuloId);
        if (anterior != null && !anterior.equals(articuloId)) {
            articuloService.actualizarNaturaleza(anterior);
        }
        return saved;
    }

    private void validarSinCiclos(Long actual, Long destino, Long ingredienteId, Set<Long> camino) {
        if (Objects.equals(actual, destino) || !camino.add(actual)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La receta contiene una relación circular de ingredientes");
        }
        for (Ingrediente child : ingredienteRepository.findChildren(actual)) {
            if (ingredienteId == null || !ingredienteId.equals(child.getId())) {
                validarSinCiclos(child.getInsumo().getId(), destino, ingredienteId, camino);
            }
        }
        camino.remove(actual);
    }

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
