package com.findotechnet.repository;

import com.findotechnet.domain.Parametro;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Parametro entity.
 */
@Repository
public interface ParametroRepository extends JpaRepository<Parametro, Long>, JpaSpecificationExecutor<Parametro> {
    default Optional<Parametro> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Parametro> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Parametro> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select parametro from Parametro parametro left join fetch parametro.tipo",
        countQuery = "select count(parametro) from Parametro parametro"
    )
    Page<Parametro> findAllWithToOneRelationships(Pageable pageable);

    @Query("select parametro from Parametro parametro left join fetch parametro.tipo")
    List<Parametro> findAllWithToOneRelationships();

    @Query("select parametro from Parametro parametro left join fetch parametro.tipo where parametro.id =:id")
    Optional<Parametro> findOneWithToOneRelationships(@Param("id") Long id);
}
