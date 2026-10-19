package com.findotechnet.service;

import com.findotechnet.domain.*; // for static metamodels
import com.findotechnet.domain.Unidad;
import com.findotechnet.repository.UnidadRepository;
import com.findotechnet.service.criteria.UnidadCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Unidad} entities in the database.
 * The main input is a {@link UnidadCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link Unidad} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class UnidadQueryService extends QueryService<Unidad> {

    private static final Logger LOG = LoggerFactory.getLogger(UnidadQueryService.class);

    private final UnidadRepository unidadRepository;

    public UnidadQueryService(UnidadRepository unidadRepository) {
        this.unidadRepository = unidadRepository;
    }

    /**
     * Return a {@link Page} of {@link Unidad} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Unidad> findByCriteria(UnidadCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Unidad> specification = createSpecification(criteria);
        return unidadRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(UnidadCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<Unidad> specification = createSpecification(criteria);
        return unidadRepository.count(specification);
    }

    /**
     * Function to convert {@link UnidadCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Unidad> createSpecification(UnidadCriteria criteria) {
        Specification<Unidad> specification = Specification.unrestricted();
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = specification.and(
                Specification.allOf(
                    Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                    buildRangeSpecification(criteria.getId(), Unidad_.id),
                    buildStringSpecification(criteria.getDescUni(), Unidad_.descUni)
                )
            );
        }
        return specification;
    }

    @Transactional(readOnly = true)
    public Page<Unidad> searchByCriteria(UnidadCriteria criteria, Pageable page) {
        LOG.debug("search by criteria : {}, page: {}", criteria, page);
        return unidadRepository.findAll(createSpecificationSearch(criteria), page);
    }

    protected Specification<Unidad> createSpecificationSearch(UnidadCriteria criteria) {
        Specification<Unidad> specification = createSpecification(criteria);
        if (criteria != null && criteria.getSearch() != null) {
            specification = specification.and(Specification.anyOf(buildStringSpecification(criteria.getSearch(), Unidad_.descUni)));
        }
        return specification;
    }
}
