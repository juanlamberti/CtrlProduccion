package com.findotechnet.repository;

import com.findotechnet.domain.TipoArticulo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoArticuloRepository extends JpaRepository<TipoArticulo, Long>, JpaSpecificationExecutor<TipoArticulo> {}
