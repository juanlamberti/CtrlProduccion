package com.findotechnet.service;

import com.findotechnet.domain.*; // for static metamodels
import com.findotechnet.domain.Articulo;
import com.findotechnet.repository.ArticuloRepository;
import com.findotechnet.service.criteria.ArticuloCriteria;
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
 * Service for executing complex queries for {@link Articulo} entities in the database.
 * The main input is a {@link ArticuloCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link Articulo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ArticuloQueryService extends QueryService<Articulo> {

    private static final Logger LOG = LoggerFactory.getLogger(ArticuloQueryService.class);

    private final ArticuloRepository articuloRepository;

    public ArticuloQueryService(ArticuloRepository articuloRepository) {
        this.articuloRepository = articuloRepository;
    }

    /**
     * Return a {@link Page} of {@link Articulo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Articulo> findByCriteria(ArticuloCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Articulo> specification = createSpecification(criteria);
        return articuloRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ArticuloCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<Articulo> specification = createSpecification(criteria);
        return articuloRepository.count(specification);
    }

    /**
     * Function to convert {@link ArticuloCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Articulo> createSpecification(ArticuloCriteria criteria) {
        Specification<Articulo> specification = Specification.unrestricted();
        specification = specification.and((root, query, builder) -> {
            if (Long.class != query.getResultType()) {
                root.fetch(Articulo_.unidadPresentacionArt, JoinType.LEFT);
                root.fetch(Articulo_.tipoArt, JoinType.LEFT);
            }
            return null;
        });
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = specification.and(
                Specification.allOf(
                    Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                    buildRangeSpecification(criteria.getId(), Articulo_.id),
                    buildStringSpecification(criteria.getDescArt(), Articulo_.descArt),
                    buildStringSpecification(criteria.getRecetaArt(), Articulo_.recetaArt),
                    buildRangeSpecification(criteria.getUnidadGenerarArt(), Articulo_.unidadGenerarArt),
                    buildRangeSpecification(criteria.getMermaPreparacionArt(), Articulo_.mermaPreparacionArt),
                    buildRangeSpecification(criteria.getPesoArt(), Articulo_.pesoArt),
                    buildRangeSpecification(criteria.getPresentacionCompraArt(), Articulo_.presentacionCompraArt),
                    buildRangeSpecification(criteria.getValorPresentacionArt(), Articulo_.valorPresentacionArt),
                    buildSpecification(criteria.getUnidadPresentacionArtId(), root ->
                        root.join(Articulo_.unidadPresentacionArt, JoinType.LEFT).get(Unidad_.id)
                    ),
                    buildSpecification(criteria.getTipoArtId(), root -> root.join(Articulo_.tipoArt, JoinType.LEFT).get(TipoArticulo_.id))
                )
            );
        }
        return specification;
    }

    @Transactional(readOnly = true)
    public Page<Articulo> searchByCriteria(ArticuloCriteria criteria, Pageable page) {
        LOG.debug("search by criteria : {}, page: {}", criteria, page);
        return articuloRepository.findAll(createSpecificationSearch(criteria), page);
    }

    protected Specification<Articulo> createSpecificationSearch(ArticuloCriteria criteria) {
        Specification<Articulo> specification = createSpecification(criteria);
        if (criteria != null && criteria.getSearch() != null) {
            specification = specification.and(Specification.anyOf(buildStringSpecification(criteria.getSearch(), Articulo_.descArt)));
        }
        return specification;
    }
}
