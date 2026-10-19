package com.findotechnet.service;

import com.findotechnet.domain.TipoParametro;
import com.findotechnet.repository.TipoParametroRepository;
import java.util.Optional;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.findotechnet.domain.TipoParametro}.
 */
@Service
@Transactional
public class TipoParametroService {

    private static final Logger LOG = LoggerFactory.getLogger(TipoParametroService.class);

    private final TipoParametroRepository tipoParametroRepository;

    public TipoParametroService(TipoParametroRepository tipoParametroRepository) {
        this.tipoParametroRepository = tipoParametroRepository;
    }

    /**
     * Save a tipoParametro.
     *
     * @param tipoParametro the entity to save.
     * @return the persisted entity.
     */
    public TipoParametro save(TipoParametro tipoParametro) {
        LOG.debug("Request to save TipoParametro : {}", tipoParametro);
        return tipoParametroRepository.save(tipoParametro);
    }

    /**
     * Update a tipoParametro.
     *
     * @param tipoParametro the entity to save.
     * @return the persisted entity.
     */
    public TipoParametro update(TipoParametro tipoParametro) {
        LOG.debug("Request to update TipoParametro : {}", tipoParametro);
        return tipoParametroRepository.save(tipoParametro);
    }

    /**
     * Partially update a tipoParametro.
     *
     * @param tipoParametro the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TipoParametro> partialUpdate(TipoParametro tipoParametro) {
        LOG.debug("Request to partially update TipoParametro : {}", tipoParametro);

        return tipoParametroRepository
            .findById(tipoParametro.getId())
            .map(existingTipoParametro -> {
                updateIfPresent(existingTipoParametro::setCodigoTpParam, tipoParametro.getCodigoTpParam());
                updateIfPresent(existingTipoParametro::setDescTpParam, tipoParametro.getDescTpParam());

                return existingTipoParametro;
            })
            .map(tipoParametroRepository::save);
    }

    /**
     * Get one tipoParametro by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TipoParametro> findOne(Long id) {
        LOG.debug("Request to get TipoParametro : {}", id);
        return tipoParametroRepository.findById(id);
    }

    /**
     * Delete the tipoParametro by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete TipoParametro : {}", id);
        tipoParametroRepository.deleteById(id);
    }

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
