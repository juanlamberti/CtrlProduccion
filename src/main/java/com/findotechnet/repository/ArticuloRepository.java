package com.findotechnet.repository;

import com.findotechnet.domain.Articulo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Articulo entity.
 */
@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long>, JpaSpecificationExecutor<Articulo> {
    default Optional<Articulo> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Articulo> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Articulo> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select articulo from Articulo articulo left join fetch articulo.unidadPresentacionArt left join fetch articulo.tipoArt",
        countQuery = "select count(articulo) from Articulo articulo"
    )
    Page<Articulo> findAllWithToOneRelationships(Pageable pageable);

    @Query("select articulo from Articulo articulo left join fetch articulo.unidadPresentacionArt left join fetch articulo.tipoArt")
    List<Articulo> findAllWithToOneRelationships();

    @Query(
        "select articulo from Articulo articulo left join fetch articulo.unidadPresentacionArt left join fetch articulo.tipoArt where articulo.id =:id"
    )
    Optional<Articulo> findOneWithToOneRelationships(@Param("id") Long id);
}
