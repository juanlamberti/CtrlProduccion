package com.findotechnet.service;

import com.findotechnet.domain.*; // for static metamodels
import com.findotechnet.domain.TipoArticulo;
import com.findotechnet.repository.TipoArticuloRepository;
import com.findotechnet.service.criteria.TipoArticuloCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link TipoArticulo} entities in the database.
 * The main input is a {@link TipoArticuloCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link TipoArticulo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoArticuloQueryService extends QueryService<TipoArticulo> {

    private static final Logger LOG = LoggerFactory.getLogger(TipoArticuloQueryService.class);

    private final TipoArticuloRepository tipoArticuloRepository;

    public TipoArticuloQueryService(TipoArticuloRepository tipoArticuloRepository) {
        this.tipoArticuloRepository = tipoArticuloRepository;
    }

    /**
     * Return a {@link Page} of {@link TipoArticulo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoArticulo> findByCriteria(TipoArticuloCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoArticulo> specification = createSpecification(criteria);
        return tipoArticuloRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoArticuloCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<TipoArticulo> specification = createSpecification(criteria);
        return tipoArticuloRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoArticuloCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoArticulo> createSpecification(TipoArticuloCriteria criteria) {
        Specification<TipoArticulo> specification = Specification.unrestricted();
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = specification.and(
                Specification.allOf(
                    Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                    buildRangeSpecification(criteria.getId(), TipoArticulo_.id),
                    buildStringSpecification(criteria.getDescTpArt(), TipoArticulo_.descTpArt)
                )
            );
        }
        return specification;
    }

    @Transactional(readOnly = true)
    public Page<TipoArticulo> searchByCriteria(TipoArticuloCriteria criteria, Pageable page) {
        LOG.debug("search by criteria : {}, page: {}", criteria, page);
        return tipoArticuloRepository.findAll(createSpecificationSearch(criteria), page);
    }

    protected Specification<TipoArticulo> createSpecificationSearch(TipoArticuloCriteria criteria) {
        Specification<TipoArticulo> specification = createSpecification(criteria);
        if (criteria != null && criteria.getSearch() != null) {
            specification = specification.and(Specification.anyOf(buildStringSpecification(criteria.getSearch(), TipoArticulo_.descTpArt)));
        }
        return specification;
    }
}
