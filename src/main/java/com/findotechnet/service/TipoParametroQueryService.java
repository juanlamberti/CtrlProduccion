package com.findotechnet.service;

import com.findotechnet.domain.*; // for static metamodels
import com.findotechnet.domain.TipoParametro;
import com.findotechnet.repository.TipoParametroRepository;
import com.findotechnet.service.criteria.TipoParametroCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link TipoParametro} entities in the database.
 * The main input is a {@link TipoParametroCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link TipoParametro} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoParametroQueryService extends QueryService<TipoParametro> {

    private static final Logger LOG = LoggerFactory.getLogger(TipoParametroQueryService.class);

    private final TipoParametroRepository tipoParametroRepository;

    public TipoParametroQueryService(TipoParametroRepository tipoParametroRepository) {
        this.tipoParametroRepository = tipoParametroRepository;
    }

    /**
     * Return a {@link Page} of {@link TipoParametro} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoParametro> findByCriteria(TipoParametroCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoParametro> specification = createSpecification(criteria);
        return tipoParametroRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoParametroCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<TipoParametro> specification = createSpecification(criteria);
        return tipoParametroRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoParametroCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoParametro> createSpecification(TipoParametroCriteria criteria) {
        Specification<TipoParametro> specification = Specification.unrestricted();
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = specification.and(
                Specification.allOf(
                    Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                    buildRangeSpecification(criteria.getId(), TipoParametro_.id),
                    buildStringSpecification(criteria.getCodigoTpParam(), TipoParametro_.codigoTpParam),
                    buildStringSpecification(criteria.getDescTpParam(), TipoParametro_.descTpParam)
                )
            );
        }
        return specification;
    }

    @Transactional(readOnly = true)
    public Page<TipoParametro> searchByCriteria(TipoParametroCriteria criteria, Pageable page) {
        LOG.debug("search by criteria : {}, page: {}", criteria, page);
        return tipoParametroRepository.findAll(createSpecificationSearch(criteria), page);
    }

    protected Specification<TipoParametro> createSpecificationSearch(TipoParametroCriteria criteria) {
        Specification<TipoParametro> specification = createSpecification(criteria);
        if (criteria != null && criteria.getSearch() != null) {
            specification = specification.and(
                Specification.anyOf(
                    buildStringSpecification(criteria.getSearch(), TipoParametro_.codigoTpParam),
                    buildStringSpecification(criteria.getSearch(), TipoParametro_.descTpParam)
                )
            );
        }
        return specification;
    }
}
