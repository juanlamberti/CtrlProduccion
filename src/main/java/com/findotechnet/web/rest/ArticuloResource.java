package com.findotechnet.web.rest;

import com.findotechnet.domain.Articulo;
import com.findotechnet.repository.ArticuloRepository;
import com.findotechnet.service.ArticuloQueryService;
import com.findotechnet.service.ArticuloService;
import com.findotechnet.service.criteria.ArticuloCriteria;
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
 * REST controller for managing {@link com.findotechnet.domain.Articulo}.
 */
@RestController
@RequestMapping("/api/articulos")
public class ArticuloResource {

    private static final Logger LOG = LoggerFactory.getLogger(ArticuloResource.class);

    private static final String ENTITY_NAME = "articulo";

    @Value("${jhipster.clientApp.name:ctrlProdNew}")
    private String applicationName;

    private final ArticuloService articuloService;

    private final ArticuloRepository articuloRepository;

    private final ArticuloQueryService articuloQueryService;

    public ArticuloResource(
        ArticuloService articuloService,
        ArticuloRepository articuloRepository,
        ArticuloQueryService articuloQueryService
    ) {
        this.articuloService = articuloService;
        this.articuloRepository = articuloRepository;
        this.articuloQueryService = articuloQueryService;
    }

    /**
     * {@code POST  /articulos} : Create a new articulo.
     *
     * @param articulo the articulo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new articulo, or with status {@code 400 (Bad Request)} if the articulo already has an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Articulo> createArticulo(@Valid @RequestBody Articulo articulo) throws URISyntaxException {
        LOG.debug("REST request to save Articulo : {}", articulo);
        if (articulo.getId() != null) {
            throw new BadRequestAlertException("A new articulo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        articulo = articuloService.save(articulo);
        return ResponseEntity.created(new URI("/api/articulos/" + articulo.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, articulo.getId().toString()))
            .body(articulo);
    }

    /**
     * {@code PUT  /articulos/:id} : Updates an existing articulo.
     *
     * @param id the id of the articulo to save.
     * @param articulo the articulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated articulo,
     * or with status {@code 400 (Bad Request)} if the articulo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the articulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Articulo> updateArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Articulo articulo
    ) throws URISyntaxException {
        LOG.debug("REST request to update Articulo : {}, {}", id, articulo);
        if (articulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, articulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!articuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        articulo = articuloService.update(articulo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, articulo.getId().toString()))
            .body(articulo);
    }

    /**
     * {@code PATCH  /articulos/:id} : Partial updates given fields of an existing articulo, field will ignore if it is null
     *
     * @param id the id of the articulo to save.
     * @param articulo the articulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated articulo,
     * or with status {@code 400 (Bad Request)} if the articulo is not valid,
     * or with status {@code 404 (Not Found)} if the articulo is not found,
     * or with status {@code 500 (Internal Server Error)} if the articulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Articulo> partialUpdateArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Articulo articulo
    ) throws URISyntaxException {
        LOG.debug("REST request to partially update Articulo : {}, {}", id, articulo);
        if (articulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, articulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!articuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Articulo> result = articuloService.partialUpdate(articulo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, articulo.getId().toString())
        );
    }

    /**
     * {@code GET  /articulos} : get all the Articulos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Articulos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Articulo>> getAllArticulos(
        ArticuloCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Articulos by criteria: {}", criteria);

        Page<Articulo> page = articuloQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Articulo>> searchAllArticulos(
        ArticuloCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Articulos by criteria: {}", criteria);

        Page<Articulo> page = articuloQueryService.searchByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /articulos/count} : count all the articulos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countArticulos(ArticuloCriteria criteria) {
        LOG.debug("REST request to count Articulos by criteria: {}", criteria);
        return ResponseEntity.ok().body(articuloQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /articulos/:id} : get the "id" articulo.
     *
     * @param id the id of the articulo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the articulo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Articulo> getArticulo(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Articulo : {}", id);
        Optional<Articulo> articulo = articuloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(articulo);
    }

    /**
     * {@code DELETE  /articulos/:id} : delete the "id" articulo.
     *
     * @param id the id of the articulo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticulo(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Articulo : {}", id);
        articuloService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
