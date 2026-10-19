package com.findotechnet.service;

import com.findotechnet.domain.Parametro;
import com.findotechnet.repository.ParametroRepository;
import java.util.Optional;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.findotechnet.domain.Parametro}.
 */
@Service
@Transactional
public class ParametroService {

    private static final Logger LOG = LoggerFactory.getLogger(ParametroService.class);

    private final ParametroRepository parametroRepository;

    public ParametroService(ParametroRepository parametroRepository) {
        this.parametroRepository = parametroRepository;
    }

    /**
     * Save a parametro.
     *
     * @param parametro the entity to save.
     * @return the persisted entity.
     */
    public Parametro save(Parametro parametro) {
        LOG.debug("Request to save Parametro : {}", parametro);
        return parametroRepository.save(parametro);
    }

    /**
     * Update a parametro.
     *
     * @param parametro the entity to save.
     * @return the persisted entity.
     */
    public Parametro update(Parametro parametro) {
        LOG.debug("Request to update Parametro : {}", parametro);
        return parametroRepository.save(parametro);
    }

    /**
     * Partially update a parametro.
     *
     * @param parametro the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Parametro> partialUpdate(Parametro parametro) {
        LOG.debug("Request to partially update Parametro : {}", parametro);

        return parametroRepository
            .findById(parametro.getId())
            .map(existingParametro -> {
                updateIfPresent(existingParametro::setCodigoParam, parametro.getCodigoParam());
                updateIfPresent(existingParametro::setDescParam, parametro.getDescParam());
                updateIfPresent(existingParametro::setValorParam, parametro.getValorParam());
                updateIfPresent(existingParametro::setArchivoParam, parametro.getArchivoParam());
                updateIfPresent(existingParametro::setArchivoParamContentType, parametro.getArchivoParamContentType());
                updateIfPresent(existingParametro::setEditCteSNParam, parametro.getEditCteSNParam());

                return existingParametro;
            })
            .map(parametroRepository::save);
    }

    /**
     * Get all the parametros with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Parametro> findAllWithEagerRelationships(Pageable pageable) {
        return parametroRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one parametro by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Parametro> findOne(Long id) {
        LOG.debug("Request to get Parametro : {}", id);
        return parametroRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the parametro by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Parametro : {}", id);
        parametroRepository.deleteById(id);
    }

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
