package com.findotechnet.web.rest;

import com.findotechnet.domain.Ingrediente;
import com.findotechnet.repository.IngredienteRepository;
import com.findotechnet.service.IngredienteQueryService;
import com.findotechnet.service.IngredienteService;
import com.findotechnet.service.criteria.IngredienteCriteria;
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
 * REST controller for managing {@link com.findotechnet.domain.Ingrediente}.
 */
@RestController
@RequestMapping("/api/ingredientes")
public class IngredienteResource {

    private static final Logger LOG = LoggerFactory.getLogger(IngredienteResource.class);

    private static final String ENTITY_NAME = "ingrediente";

    @Value("${jhipster.clientApp.name:ctrlProdNew}")
    private String applicationName;

    private final IngredienteService ingredienteService;

    private final IngredienteRepository ingredienteRepository;

    private final IngredienteQueryService ingredienteQueryService;

    public IngredienteResource(
        IngredienteService ingredienteService,
        IngredienteRepository ingredienteRepository,
        IngredienteQueryService ingredienteQueryService
    ) {
        this.ingredienteService = ingredienteService;
        this.ingredienteRepository = ingredienteRepository;
        this.ingredienteQueryService = ingredienteQueryService;
    }

    /**
     * {@code POST  /ingredientes} : Create a new ingrediente.
     *
     * @param ingrediente the ingrediente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ingrediente, or with status {@code 400 (Bad Request)} if the ingrediente already has an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Ingrediente> createIngrediente(@Valid @RequestBody Ingrediente ingrediente) throws URISyntaxException {
        LOG.debug("REST request to save Ingrediente : {}", ingrediente);
        if (ingrediente.getId() != null) {
            throw new BadRequestAlertException("A new ingrediente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ingrediente = ingredienteService.save(ingrediente);
        return ResponseEntity.created(new URI("/api/ingredientes/" + ingrediente.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, ingrediente.getId().toString()))
            .body(ingrediente);
    }

    /**
     * {@code PUT  /ingredientes/:id} : Updates an existing ingrediente.
     *
     * @param id the id of the ingrediente to save.
     * @param ingrediente the ingrediente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingrediente,
     * or with status {@code 400 (Bad Request)} if the ingrediente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ingrediente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Ingrediente> updateIngrediente(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Ingrediente ingrediente
    ) throws URISyntaxException {
        LOG.debug("REST request to update Ingrediente : {}, {}", id, ingrediente);
        if (ingrediente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ingrediente.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ingredienteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ingrediente = ingredienteService.update(ingrediente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ingrediente.getId().toString()))
            .body(ingrediente);
    }

    /**
     * {@code PATCH  /ingredientes/:id} : Partial updates given fields of an existing ingrediente, field will ignore if it is null
     *
     * @param id the id of the ingrediente to save.
     * @param ingrediente the ingrediente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingrediente,
     * or with status {@code 400 (Bad Request)} if the ingrediente is not valid,
     * or with status {@code 404 (Not Found)} if the ingrediente is not found,
     * or with status {@code 500 (Internal Server Error)} if the ingrediente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ingrediente> partialUpdateIngrediente(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Ingrediente ingrediente
    ) throws URISyntaxException {
        LOG.debug("REST request to partially update Ingrediente : {}, {}", id, ingrediente);
        if (ingrediente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ingrediente.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ingredienteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ingrediente> result = ingredienteService.partialUpdate(ingrediente);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ingrediente.getId().toString())
        );
    }

    /**
     * {@code GET  /ingredientes} : get all the Ingredientes.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Ingredientes in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Ingrediente>> getAllIngredientes(
        IngredienteCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Ingredientes by criteria: {}", criteria);

        Page<Ingrediente> page = ingredienteQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Ingrediente>> searchAllIngredientes(
        IngredienteCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Ingredientes by criteria: {}", criteria);

        Page<Ingrediente> page = ingredienteQueryService.searchByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ingredientes/count} : count all the ingredientes.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countIngredientes(IngredienteCriteria criteria) {
        LOG.debug("REST request to count Ingredientes by criteria: {}", criteria);
        return ResponseEntity.ok().body(ingredienteQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /ingredientes/:id} : get the "id" ingrediente.
     *
     * @param id the id of the ingrediente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ingrediente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Ingrediente> getIngrediente(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Ingrediente : {}", id);
        Optional<Ingrediente> ingrediente = ingredienteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ingrediente);
    }

    /**
     * {@code DELETE  /ingredientes/:id} : delete the "id" ingrediente.
     *
     * @param id the id of the ingrediente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngrediente(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Ingrediente : {}", id);
        ingredienteService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
