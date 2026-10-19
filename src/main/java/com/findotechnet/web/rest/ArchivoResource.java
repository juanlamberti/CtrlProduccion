package com.findotechnet.web.rest;

import com.findotechnet.domain.Archivo;
import com.findotechnet.repository.ArchivoRepository;
import com.findotechnet.service.ArchivoQueryService;
import com.findotechnet.service.ArchivoService;
import com.findotechnet.service.criteria.ArchivoCriteria;
import com.findotechnet.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.findotechnet.domain.Archivo}.
 */
@RestController
@RequestMapping("/api/archivos")
public class ArchivoResource {

    private static final Logger LOG = LoggerFactory.getLogger(ArchivoResource.class);

    private static final String ENTITY_NAME = "archivo";

    @Value("${jhipster.clientApp.name:ctrlProdNew}")
    private String applicationName;

    private final ArchivoService archivoService;

    private final ArchivoRepository archivoRepository;

    private final ArchivoQueryService archivoQueryService;

    public ArchivoResource(ArchivoService archivoService, ArchivoRepository archivoRepository, ArchivoQueryService archivoQueryService) {
        this.archivoService = archivoService;
        this.archivoRepository = archivoRepository;
        this.archivoQueryService = archivoQueryService;
    }

    /**
     * {@code POST  /archivos} : Create a new archivo.
     *
     * @param archivo the archivo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new archivo, or with status {@code 400 (Bad Request)} if the archivo already has an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Archivo> createArchivo(@Valid @RequestBody Archivo archivo) throws URISyntaxException {
        LOG.debug("REST request to save Archivo : {}", archivo);
        if (archivo.getId() != null) {
            throw new BadRequestAlertException("A new archivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        archivo = archivoService.save(archivo);
        return ResponseEntity.created(new URI("/api/archivos/" + archivo.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, archivo.getId().toString()))
            .body(archivo);
    }

    /**
     * {@code PUT  /archivos/:id} : Updates an existing archivo.
     *
     * @param id the id of the archivo to save.
     * @param archivo the archivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated archivo,
     * or with status {@code 400 (Bad Request)} if the archivo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the archivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Archivo> updateArchivo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Archivo archivo
    ) throws URISyntaxException {
        LOG.debug("REST request to update Archivo : {}, {}", id, archivo);
        if (archivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, archivo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!archivoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        archivo = archivoService.update(archivo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, archivo.getId().toString()))
            .body(archivo);
    }

    /**
     * {@code PATCH  /archivos/:id} : Partial updates given fields of an existing archivo, field will ignore if it is null
     *
     * @param id the id of the archivo to save.
     * @param archivo the archivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated archivo,
     * or with status {@code 400 (Bad Request)} if the archivo is not valid,
     * or with status {@code 404 (Not Found)} if the archivo is not found,
     * or with status {@code 500 (Internal Server Error)} if the archivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Archivo> partialUpdateArchivo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Archivo archivo
    ) throws URISyntaxException {
        LOG.debug("REST request to partially update Archivo : {}, {}", id, archivo);
        if (archivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, archivo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!archivoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Archivo> result = archivoService.partialUpdate(archivo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, archivo.getId().toString())
        );
    }

    /**
     * {@code GET  /archivos} : get all the Archivos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Archivos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Archivo>> getAllArchivos(
        ArchivoCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Archivos by criteria: {}", criteria);

        Page<Archivo> page = archivoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Archivo>> searchAllArchivos(
        ArchivoCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Archivos by criteria: {}", criteria);

        Page<Archivo> page = archivoQueryService.searchByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /archivos/count} : count all the archivos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countArchivos(ArchivoCriteria criteria) {
        LOG.debug("REST request to count Archivos by criteria: {}", criteria);
        return ResponseEntity.ok().body(archivoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /archivos/:id} : get the "id" archivo.
     *
     * @param id the id of the archivo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the archivo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Archivo> getArchivo(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Archivo : {}", id);
        Optional<Archivo> archivo = archivoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(archivo);
    }

    /**
     * {@code DELETE  /archivos/:id} : delete the "id" archivo.
     *
     * @param id the id of the archivo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArchivo(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Archivo : {}", id);
        archivoService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
