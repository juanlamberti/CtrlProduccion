package com.findotechnet.service;

import com.findotechnet.domain.*; // for static metamodels
import com.findotechnet.domain.Parametro;
import com.findotechnet.repository.ParametroRepository;
import com.findotechnet.service.criteria.ParametroCriteria;
import jakarta.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Parametro} entities in the database.
 * The main input is a {@link ParametroCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link Parametro} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ParametroQueryService extends QueryService<Parametro> {

    private static final Logger LOG = LoggerFactory.getLogger(ParametroQueryService.class);

    private final ParametroRepository parametroRepository;

    public ParametroQueryService(ParametroRepository parametroRepository) {
        this.parametroRepository = parametroRepository;
    }

    /**
     * Return a {@link Page} of {@link Parametro} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Parametro> findByCriteria(ParametroCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Parametro> specification = createSpecification(criteria);
        return parametroRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ParametroCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<Parametro> specification = createSpecification(criteria);
        return parametroRepository.count(specification);
    }

    /**
     * Function to convert {@link ParametroCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Parametro> createSpecification(ParametroCriteria criteria) {
        Specification<Parametro> specification = Specification.unrestricted();
        specification = specification.and((root, query, builder) -> {
            if (Long.class != query.getResultType()) {
                root.fetch(Parametro_.tipo, JoinType.LEFT);
            }
            return null;
        });
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = specification.and(
                Specification.allOf(
                    Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                    buildRangeSpecification(criteria.getId(), Parametro_.id),
                    buildStringSpecification(criteria.getCodigoParam(), Parametro_.codigoParam),
                    buildStringSpecification(criteria.getDescParam(), Parametro_.descParam),
                    buildStringSpecification(criteria.getValorParam(), Parametro_.valorParam),
                    buildStringSpecification(criteria.getEditCteSNParam(), Parametro_.editCteSNParam),
                    buildSpecification(criteria.getTipoId(), root -> root.join(Parametro_.tipo, JoinType.LEFT).get(TipoParametro_.id))
                )
            );
        }
        return specification;
    }

    @Transactional(readOnly = true)
    public Page<Parametro> searchByCriteria(ParametroCriteria criteria, Pageable page) {
        LOG.debug("search by criteria : {}, page: {}", criteria, page);
        return parametroRepository.findAll(createSpecificationSearch(criteria), page);
    }

    protected Specification<Parametro> createSpecificationSearch(ParametroCriteria criteria) {
        Specification<Parametro> specification = createSpecification(criteria);
        if (criteria != null && criteria.getSearch() != null) {
            specification = specification.and(
                Specification.anyOf(
                    buildStringSpecification(criteria.getSearch(), Parametro_.codigoParam),
                    buildStringSpecification(criteria.getSearch(), Parametro_.descParam)
                )
            );
        }
        return specification;
    }
}
