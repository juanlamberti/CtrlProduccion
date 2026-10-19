package com.findotechnet.web.rest;

import com.findotechnet.domain.TipoArticulo;
import com.findotechnet.repository.TipoArticuloRepository;
import com.findotechnet.service.TipoArticuloQueryService;
import com.findotechnet.service.TipoArticuloService;
import com.findotechnet.service.criteria.TipoArticuloCriteria;
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
 * REST controller for managing {@link com.findotechnet.domain.TipoArticulo}.
 */
@RestController
@RequestMapping("/api/tipo-articulos")
public class TipoArticuloResource {

    private static final Logger LOG = LoggerFactory.getLogger(TipoArticuloResource.class);

    private static final String ENTITY_NAME = "tipoArticulo";

    @Value("${jhipster.clientApp.name:ctrlProdNew}")
    private String applicationName;

    private final TipoArticuloService tipoArticuloService;

    private final TipoArticuloRepository tipoArticuloRepository;

    private final TipoArticuloQueryService tipoArticuloQueryService;

    public TipoArticuloResource(
        TipoArticuloService tipoArticuloService,
        TipoArticuloRepository tipoArticuloRepository,
        TipoArticuloQueryService tipoArticuloQueryService
    ) {
        this.tipoArticuloService = tipoArticuloService;
        this.tipoArticuloRepository = tipoArticuloRepository;
        this.tipoArticuloQueryService = tipoArticuloQueryService;
    }

    /**
     * {@code POST  /tipo-articulos} : Create a new tipoArticulo.
     *
     * @param tipoArticulo the tipoArticulo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoArticulo, or with status {@code 400 (Bad Request)} if the tipoArticulo already has an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoArticulo> createTipoArticulo(@Valid @RequestBody TipoArticulo tipoArticulo) throws URISyntaxException {
        LOG.debug("REST request to save TipoArticulo : {}", tipoArticulo);
        if (tipoArticulo.getId() != null) {
            throw new BadRequestAlertException("A new tipoArticulo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        tipoArticulo = tipoArticuloService.save(tipoArticulo);
        return ResponseEntity.created(new URI("/api/tipo-articulos/" + tipoArticulo.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, tipoArticulo.getId().toString()))
            .body(tipoArticulo);
    }

    /**
     * {@code PUT  /tipo-articulos/:id} : Updates an existing tipoArticulo.
     *
     * @param id the id of the tipoArticulo to save.
     * @param tipoArticulo the tipoArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoArticulo,
     * or with status {@code 400 (Bad Request)} if the tipoArticulo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoArticulo> updateTipoArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoArticulo tipoArticulo
    ) throws URISyntaxException {
        LOG.debug("REST request to update TipoArticulo : {}, {}", id, tipoArticulo);
        if (tipoArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        tipoArticulo = tipoArticuloService.update(tipoArticulo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoArticulo.getId().toString()))
            .body(tipoArticulo);
    }

    /**
     * {@code PATCH  /tipo-articulos/:id} : Partial updates given fields of an existing tipoArticulo, field will ignore if it is null
     *
     * @param id the id of the tipoArticulo to save.
     * @param tipoArticulo the tipoArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoArticulo,
     * or with status {@code 400 (Bad Request)} if the tipoArticulo is not valid,
     * or with status {@code 404 (Not Found)} if the tipoArticulo is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoArticulo> partialUpdateTipoArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoArticulo tipoArticulo
    ) throws URISyntaxException {
        LOG.debug("REST request to partially update TipoArticulo : {}, {}", id, tipoArticulo);
        if (tipoArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoArticulo> result = tipoArticuloService.partialUpdate(tipoArticulo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoArticulo.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-articulos} : get all the Tipo Articulos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Tipo Articulos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<TipoArticulo>> getAllTipoArticulos(
        TipoArticuloCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get TipoArticulos by criteria: {}", criteria);

        Page<TipoArticulo> page = tipoArticuloQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/search")
    public ResponseEntity<List<TipoArticulo>> searchAllTipoArticulos(
        TipoArticuloCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get TipoArticulos by criteria: {}", criteria);

        Page<TipoArticulo> page = tipoArticuloQueryService.searchByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tipo-articulos/count} : count all the tipoArticulos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countTipoArticulos(TipoArticuloCriteria criteria) {
        LOG.debug("REST request to count TipoArticulos by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoArticuloQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tipo-articulos/:id} : get the "id" tipoArticulo.
     *
     * @param id the id of the tipoArticulo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoArticulo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoArticulo> getTipoArticulo(@PathVariable("id") Long id) {
        LOG.debug("REST request to get TipoArticulo : {}", id);
        Optional<TipoArticulo> tipoArticulo = tipoArticuloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoArticulo);
    }

    /**
     * {@code DELETE  /tipo-articulos/:id} : delete the "id" tipoArticulo.
     *
     * @param id the id of the tipoArticulo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoArticulo(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete TipoArticulo : {}", id);
        tipoArticuloService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
