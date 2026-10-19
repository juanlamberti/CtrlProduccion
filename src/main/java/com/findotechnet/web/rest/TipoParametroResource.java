package com.findotechnet.web.rest;

import com.findotechnet.domain.TipoParametro;
import com.findotechnet.repository.TipoParametroRepository;
import com.findotechnet.service.TipoParametroQueryService;
import com.findotechnet.service.TipoParametroService;
import com.findotechnet.service.criteria.TipoParametroCriteria;
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
 * REST controller for managing {@link com.findotechnet.domain.TipoParametro}.
 */
@RestController
@RequestMapping("/api/tipo-parametros")
public class TipoParametroResource {

    private static final Logger LOG = LoggerFactory.getLogger(TipoParametroResource.class);

    private static final String ENTITY_NAME = "tipoParametro";

    @Value("${jhipster.clientApp.name:ctrlProdNew}")
    private String applicationName;

    private final TipoParametroService tipoParametroService;

    private final TipoParametroRepository tipoParametroRepository;

    private final TipoParametroQueryService tipoParametroQueryService;

    public TipoParametroResource(
        TipoParametroService tipoParametroService,
        TipoParametroRepository tipoParametroRepository,
        TipoParametroQueryService tipoParametroQueryService
    ) {
        this.tipoParametroService = tipoParametroService;
        this.tipoParametroRepository = tipoParametroRepository;
        this.tipoParametroQueryService = tipoParametroQueryService;
    }

    /**
     * {@code POST  /tipo-parametros} : Create a new tipoParametro.
     *
     * @param tipoParametro the tipoParametro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoParametro, or with status {@code 400 (Bad Request)} if the tipoParametro already has an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoParametro> createTipoParametro(@Valid @RequestBody TipoParametro tipoParametro) throws URISyntaxException {
        LOG.debug("REST request to save TipoParametro : {}", tipoParametro);
        if (tipoParametro.getId() != null) {
            throw new BadRequestAlertException("A new tipoParametro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        tipoParametro = tipoParametroService.save(tipoParametro);
        return ResponseEntity.created(new URI("/api/tipo-parametros/" + tipoParametro.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, tipoParametro.getId().toString()))
            .body(tipoParametro);
    }

    /**
     * {@code PUT  /tipo-parametros/:id} : Updates an existing tipoParametro.
     *
     * @param id the id of the tipoParametro to save.
     * @param tipoParametro the tipoParametro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoParametro,
     * or with status {@code 400 (Bad Request)} if the tipoParametro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoParametro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoParametro> updateTipoParametro(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoParametro tipoParametro
    ) throws URISyntaxException {
        LOG.debug("REST request to update TipoParametro : {}, {}", id, tipoParametro);
        if (tipoParametro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoParametro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoParametroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        tipoParametro = tipoParametroService.update(tipoParametro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoParametro.getId().toString()))
            .body(tipoParametro);
    }

    /**
     * {@code PATCH  /tipo-parametros/:id} : Partial updates given fields of an existing tipoParametro, field will ignore if it is null
     *
     * @param id the id of the tipoParametro to save.
     * @param tipoParametro the tipoParametro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoParametro,
     * or with status {@code 400 (Bad Request)} if the tipoParametro is not valid,
     * or with status {@code 404 (Not Found)} if the tipoParametro is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoParametro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoParametro> partialUpdateTipoParametro(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoParametro tipoParametro
    ) throws URISyntaxException {
        LOG.debug("REST request to partially update TipoParametro : {}, {}", id, tipoParametro);
        if (tipoParametro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoParametro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoParametroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoParametro> result = tipoParametroService.partialUpdate(tipoParametro);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoParametro.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-parametros} : get all the Tipo Parametros.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Tipo Parametros in body.
     */
    @GetMapping("")
    public ResponseEntity<List<TipoParametro>> getAllTipoParametros(
        TipoParametroCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get TipoParametros by criteria: {}", criteria);

        Page<TipoParametro> page = tipoParametroQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/search")
    public ResponseEntity<List<TipoParametro>> searchAllTipoParametros(
        TipoParametroCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get TipoParametros by criteria: {}", criteria);

        Page<TipoParametro> page = tipoParametroQueryService.searchByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tipo-parametros/count} : count all the tipoParametros.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countTipoParametros(TipoParametroCriteria criteria) {
        LOG.debug("REST request to count TipoParametros by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoParametroQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tipo-parametros/:id} : get the "id" tipoParametro.
     *
     * @param id the id of the tipoParametro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoParametro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoParametro> getTipoParametro(@PathVariable("id") Long id) {
        LOG.debug("REST request to get TipoParametro : {}", id);
        Optional<TipoParametro> tipoParametro = tipoParametroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoParametro);
    }

    /**
     * {@code DELETE  /tipo-parametros/:id} : delete the "id" tipoParametro.
     *
     * @param id the id of the tipoParametro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoParametro(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete TipoParametro : {}", id);
        tipoParametroService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
