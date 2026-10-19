package com.findotechnet.service;

import com.findotechnet.domain.Archivo;
import com.findotechnet.repository.ArchivoRepository;
import java.util.Optional;
import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.findotechnet.domain.Archivo}.
 */
@Service
@Transactional
public class ArchivoService {

    private static final Logger LOG = LoggerFactory.getLogger(ArchivoService.class);

    private final ArchivoRepository archivoRepository;

    public ArchivoService(ArchivoRepository archivoRepository) {
        this.archivoRepository = archivoRepository;
    }

    /**
     * Save a archivo.
     *
     * @param archivo the entity to save.
     * @return the persisted entity.
     */
    public Archivo save(Archivo archivo) {
        LOG.debug("Request to save Archivo : {}", archivo);
        return archivoRepository.save(archivo);
    }

    /**
     * Update a archivo.
     *
     * @param archivo the entity to save.
     * @return the persisted entity.
     */
    public Archivo update(Archivo archivo) {
        LOG.debug("Request to update Archivo : {}", archivo);
        return archivoRepository.save(archivo);
    }

    /**
     * Partially update a archivo.
     *
     * @param archivo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Archivo> partialUpdate(Archivo archivo) {
        LOG.debug("Request to partially update Archivo : {}", archivo);

        return archivoRepository
            .findById(archivo.getId())
            .map(existingArchivo -> {
                updateIfPresent(existingArchivo::setNombreArc, archivo.getNombreArc());
                updateIfPresent(existingArchivo::setEstadoArc, archivo.getEstadoArc());
                updateIfPresent(existingArchivo::setTipoArc, archivo.getTipoArc());
                updateIfPresent(existingArchivo::setArchivoArc, archivo.getArchivoArc());
                updateIfPresent(existingArchivo::setArchivoArcContentType, archivo.getArchivoArcContentType());

                return existingArchivo;
            })
            .map(archivoRepository::save);
    }

    /**
     * Get one archivo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Archivo> findOne(Long id) {
        LOG.debug("Request to get Archivo : {}", id);
        return archivoRepository.findById(id);
    }

    /**
     * Delete the archivo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Archivo : {}", id);
        archivoRepository.deleteById(id);
    }

    private <T> void updateIfPresent(Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
