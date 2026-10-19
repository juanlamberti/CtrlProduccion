package com.findotechnet.service;

import com.findotechnet.domain.*; // for static metamodels
import com.findotechnet.domain.Archivo;
import com.findotechnet.repository.ArchivoRepository;
import com.findotechnet.service.criteria.ArchivoCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Archivo} entities in the database.
 * The main input is a {@link ArchivoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link Archivo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ArchivoQueryService extends QueryService<Archivo> {

    private static final Logger LOG = LoggerFactory.getLogger(ArchivoQueryService.class);

    private final ArchivoRepository archivoRepository;

    public ArchivoQueryService(ArchivoRepository archivoRepository) {
        this.archivoRepository = archivoRepository;
    }

    /**
     * Return a {@link Page} of {@link Archivo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Archivo> findByCriteria(ArchivoCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Archivo> specification = createSpecification(criteria);
        return archivoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ArchivoCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<Archivo> specification = createSpecification(criteria);
        return archivoRepository.count(specification);
    }

    /**
     * Function to convert {@link ArchivoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Archivo> createSpecification(ArchivoCriteria criteria) {
        Specification<Archivo> specification = Specification.unrestricted();
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = specification.and(
                Specification.allOf(
                    Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                    buildRangeSpecification(criteria.getId(), Archivo_.id),
                    buildStringSpecification(criteria.getNombreArc(), Archivo_.nombreArc),
                    buildStringSpecification(criteria.getEstadoArc(), Archivo_.estadoArc),
                    buildStringSpecification(criteria.getTipoArc(), Archivo_.tipoArc)
                )
            );
        }
        return specification;
    }

    @Transactional(readOnly = true)
    public Page<Archivo> searchByCriteria(ArchivoCriteria criteria, Pageable page) {
        LOG.debug("search by criteria : {}, page: {}", criteria, page);
        return archivoRepository.findAll(createSpecificationSearch(criteria), page);
    }

    protected Specification<Archivo> createSpecificationSearch(ArchivoCriteria criteria) {
        Specification<Archivo> specification = createSpecification(criteria);
        if (criteria != null && criteria.getSearch() != null) {
            specification = specification.and(Specification.anyOf(buildStringSpecification(criteria.getSearch(), Archivo_.nombreArc)));
        }
        return specification;
    }
}
