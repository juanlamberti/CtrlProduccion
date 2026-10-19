package com.findotechnet.service;

import com.findotechnet.domain.*; // for static metamodels
import com.findotechnet.domain.Ingrediente;
import com.findotechnet.repository.IngredienteRepository;
import com.findotechnet.service.criteria.IngredienteCriteria;
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
 * Service for executing complex queries for {@link Ingrediente} entities in the database.
 * The main input is a {@link IngredienteCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link Ingrediente} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class IngredienteQueryService extends QueryService<Ingrediente> {

    private static final Logger LOG = LoggerFactory.getLogger(IngredienteQueryService.class);

    private final IngredienteRepository ingredienteRepository;

    public IngredienteQueryService(IngredienteRepository ingredienteRepository) {
        this.ingredienteRepository = ingredienteRepository;
    }

    /**
     * Return a {@link Page} of {@link Ingrediente} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Ingrediente> findByCriteria(IngredienteCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Ingrediente> specification = createSpecification(criteria);
        return ingredienteRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(IngredienteCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<Ingrediente> specification = createSpecification(criteria);
        return ingredienteRepository.count(specification);
    }

    /**
     * Function to convert {@link IngredienteCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Ingrediente> createSpecification(IngredienteCriteria criteria) {
        Specification<Ingrediente> specification = Specification.unrestricted();
        specification = specification.and((root, query, builder) -> {
            if (Long.class != query.getResultType()) {
                root.fetch(Ingrediente_.articulo, JoinType.LEFT);
                root.fetch(Ingrediente_.insumo, JoinType.LEFT);
            }
            return null;
        });
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = specification.and(
                Specification.allOf(
                    Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                    buildRangeSpecification(criteria.getId(), Ingrediente_.id),
                    buildRangeSpecification(criteria.getCantidadIng(), Ingrediente_.cantidadIng),
                    buildSpecification(criteria.getArticuloId(), root -> root.join(Ingrediente_.articulo, JoinType.LEFT).get(Articulo_.id)),
                    buildSpecification(criteria.getInsumoId(), root -> root.join(Ingrediente_.insumo, JoinType.LEFT).get(Articulo_.id))
                )
            );
        }
        return specification;
    }

    @Transactional(readOnly = true)
    public Page<Ingrediente> searchByCriteria(IngredienteCriteria criteria, Pageable page) {
        LOG.debug("search by criteria : {}, page: {}", criteria, page);
        return ingredienteRepository.findAll(createSpecificationSearch(criteria), page);
    }

    protected Specification<Ingrediente> createSpecificationSearch(IngredienteCriteria criteria) {
        Specification<Ingrediente> specification = createSpecification(criteria);
        if (criteria != null && criteria.getSearch() != null) {
            specification = specification.and(
                Specification.anyOf(
                    buildSpecification(criteria.getSearch(), root ->
                        root.join(Ingrediente_.articulo, JoinType.LEFT).get(Articulo_.descArt)
                    ),
                    buildSpecification(criteria.getSearch(), root -> root.join(Ingrediente_.insumo, JoinType.LEFT).get(Articulo_.descArt))
                )
            );
        }
        return specification;
    }
}
