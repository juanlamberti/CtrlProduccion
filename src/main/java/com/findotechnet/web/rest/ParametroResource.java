package com.findotechnet.web.rest;

import com.findotechnet.domain.Parametro;
import com.findotechnet.repository.ParametroRepository;
import com.findotechnet.service.ParametroQueryService;
import com.findotechnet.service.ParametroService;
import com.findotechnet.service.criteria.ParametroCriteria;
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
 * REST controller for managing {@link com.findotechnet.domain.Parametro}.
 */
@RestController
@RequestMapping("/api/parametros")
public class ParametroResource {

    private static final Logger LOG = LoggerFactory.getLogger(ParametroResource.class);

    private static final String ENTITY_NAME = "parametro";

    @Value("${jhipster.clientApp.name:ctrlProdNew}")
    private String applicationName;

    private final ParametroService parametroService;

    private final ParametroRepository parametroRepository;

    private final ParametroQueryService parametroQueryService;

    public ParametroResource(
        ParametroService parametroService,
        ParametroRepository parametroRepository,
        ParametroQueryService parametroQueryService
    ) {
        this.parametroService = parametroService;
        this.parametroRepository = parametroRepository;
        this.parametroQueryService = parametroQueryService;
    }

    /**
     * {@code POST  /parametros} : Create a new parametro.
     *
     * @param parametro the parametro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parametro, or with status {@code 400 (Bad Request)} if the parametro already has an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Parametro> createParametro(@Valid @RequestBody Parametro parametro) throws URISyntaxException {
        LOG.debug("REST request to save Parametro : {}", parametro);
        if (parametro.getId() != null) {
            throw new BadRequestAlertException("A new parametro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        parametro = parametroService.save(parametro);
        return ResponseEntity.created(new URI("/api/parametros/" + parametro.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, parametro.getId().toString()))
            .body(parametro);
    }

    /**
     * {@code PUT  /parametros/:id} : Updates an existing parametro.
     *
     * @param id the id of the parametro to save.
     * @param parametro the parametro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametro,
     * or with status {@code 400 (Bad Request)} if the parametro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parametro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Parametro> updateParametro(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Parametro parametro
    ) throws URISyntaxException {
        LOG.debug("REST request to update Parametro : {}, {}", id, parametro);
        if (parametro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parametro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parametroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        parametro = parametroService.update(parametro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parametro.getId().toString()))
            .body(parametro);
    }

    /**
     * {@code PATCH  /parametros/:id} : Partial updates given fields of an existing parametro, field will ignore if it is null
     *
     * @param id the id of the parametro to save.
     * @param parametro the parametro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametro,
     * or with status {@code 400 (Bad Request)} if the parametro is not valid,
     * or with status {@code 404 (Not Found)} if the parametro is not found,
     * or with status {@code 500 (Internal Server Error)} if the parametro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Parametro> partialUpdateParametro(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Parametro parametro
    ) throws URISyntaxException {
        LOG.debug("REST request to partially update Parametro : {}, {}", id, parametro);
        if (parametro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parametro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parametroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Parametro> result = parametroService.partialUpdate(parametro);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parametro.getId().toString())
        );
    }

    /**
     * {@code GET  /parametros} : get all the Parametros.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Parametros in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Parametro>> getAllParametros(
        ParametroCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Parametros by criteria: {}", criteria);

        Page<Parametro> page = parametroQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Parametro>> searchAllParametros(
        ParametroCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Parametros by criteria: {}", criteria);

        Page<Parametro> page = parametroQueryService.searchByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /parametros/count} : count all the parametros.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countParametros(ParametroCriteria criteria) {
        LOG.debug("REST request to count Parametros by criteria: {}", criteria);
        return ResponseEntity.ok().body(parametroQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /parametros/:id} : get the "id" parametro.
     *
     * @param id the id of the parametro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parametro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Parametro> getParametro(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Parametro : {}", id);
        Optional<Parametro> parametro = parametroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parametro);
    }

    /**
     * {@code DELETE  /parametros/:id} : delete the "id" parametro.
     *
     * @param id the id of the parametro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParametro(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Parametro : {}", id);
        parametroService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
