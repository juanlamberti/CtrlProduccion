package com.findotechnet.web.rest;

import com.findotechnet.domain.Unidad;
import com.findotechnet.repository.UnidadRepository;
import com.findotechnet.service.UnidadQueryService;
import com.findotechnet.service.UnidadService;
import com.findotechnet.service.criteria.UnidadCriteria;
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
 * REST controller for managing {@link com.findotechnet.domain.Unidad}.
 */
@RestController
@RequestMapping("/api/unidads")
public class UnidadResource {

    private static final Logger LOG = LoggerFactory.getLogger(UnidadResource.class);

    private static final String ENTITY_NAME = "unidad";

    @Value("${jhipster.clientApp.name:ctrlProdNew}")
    private String applicationName;

    private final UnidadService unidadService;

    private final UnidadRepository unidadRepository;

    private final UnidadQueryService unidadQueryService;

    public UnidadResource(UnidadService unidadService, UnidadRepository unidadRepository, UnidadQueryService unidadQueryService) {
        this.unidadService = unidadService;
        this.unidadRepository = unidadRepository;
        this.unidadQueryService = unidadQueryService;
    }

    /**
     * {@code POST  /unidads} : Create a new unidad.
     *
     * @param unidad the unidad to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new unidad, or with status {@code 400 (Bad Request)} if the unidad already has an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Unidad> createUnidad(@Valid @RequestBody Unidad unidad) throws URISyntaxException {
        LOG.debug("REST request to save Unidad : {}", unidad);
        if (unidad.getId() != null) {
            throw new BadRequestAlertException("A new unidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        unidad = unidadService.save(unidad);
        return ResponseEntity.created(new URI("/api/unidads/" + unidad.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, unidad.getId().toString()))
            .body(unidad);
    }

    /**
     * {@code PUT  /unidads/:id} : Updates an existing unidad.
     *
     * @param id the id of the unidad to save.
     * @param unidad the unidad to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated unidad,
     * or with status {@code 400 (Bad Request)} if the unidad is not valid,
     * or with status {@code 500 (Internal Server Error)} if the unidad couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Unidad> updateUnidad(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Unidad unidad
    ) throws URISyntaxException {
        LOG.debug("REST request to update Unidad : {}, {}", id, unidad);
        if (unidad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, unidad.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!unidadRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        unidad = unidadService.update(unidad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unidad.getId().toString()))
            .body(unidad);
    }

    /**
     * {@code PATCH  /unidads/:id} : Partial updates given fields of an existing unidad, field will ignore if it is null
     *
     * @param id the id of the unidad to save.
     * @param unidad the unidad to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated unidad,
     * or with status {@code 400 (Bad Request)} if the unidad is not valid,
     * or with status {@code 404 (Not Found)} if the unidad is not found,
     * or with status {@code 500 (Internal Server Error)} if the unidad couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Unidad> partialUpdateUnidad(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Unidad unidad
    ) throws URISyntaxException {
        LOG.debug("REST request to partially update Unidad : {}, {}", id, unidad);
        if (unidad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, unidad.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!unidadRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Unidad> result = unidadService.partialUpdate(unidad);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unidad.getId().toString())
        );
    }

    /**
     * {@code GET  /unidads} : get all the Unidads.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Unidads in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Unidad>> getAllUnidads(
        UnidadCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Unidads by criteria: {}", criteria);

        Page<Unidad> page = unidadQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Unidad>> searchAllUnidads(
        UnidadCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Unidads by criteria: {}", criteria);

        Page<Unidad> page = unidadQueryService.searchByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /unidads/count} : count all the unidads.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countUnidads(UnidadCriteria criteria) {
        LOG.debug("REST request to count Unidads by criteria: {}", criteria);
        return ResponseEntity.ok().body(unidadQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /unidads/:id} : get the "id" unidad.
     *
     * @param id the id of the unidad to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the unidad, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Unidad> getUnidad(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Unidad : {}", id);
        Optional<Unidad> unidad = unidadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(unidad);
    }

    /**
     * {@code DELETE  /unidads/:id} : delete the "id" unidad.
     *
     * @param id the id of the unidad to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnidad(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Unidad : {}", id);
        unidadService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
