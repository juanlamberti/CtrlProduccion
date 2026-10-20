package com.findotechnet.repository;

import com.findotechnet.domain.Ingrediente;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ingrediente entity.
 */
@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long>, JpaSpecificationExecutor<Ingrediente> {
    @Query("select i from Ingrediente i join fetch i.insumo where i.articulo.id = :articuloId")
    List<Ingrediente> findChildren(@Param("articuloId") Long articuloId);

    default Optional<Ingrediente> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Ingrediente> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Ingrediente> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select ingrediente from Ingrediente ingrediente left join fetch ingrediente.articulo left join fetch ingrediente.insumo",
        countQuery = "select count(ingrediente) from Ingrediente ingrediente"
    )
    Page<Ingrediente> findAllWithToOneRelationships(Pageable pageable);

    @Query("select ingrediente from Ingrediente ingrediente left join fetch ingrediente.articulo left join fetch ingrediente.insumo")
    List<Ingrediente> findAllWithToOneRelationships();

    @Query(
        "select ingrediente from Ingrediente ingrediente left join fetch ingrediente.articulo left join fetch ingrediente.insumo where ingrediente.id =:id"
    )
    Optional<Ingrediente> findOneWithToOneRelationships(@Param("id") Long id);
}
