package com.findotechnet.repository;

import com.findotechnet.domain.Unidad;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Unidad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnidadRepository extends JpaRepository<Unidad, Long>, JpaSpecificationExecutor<Unidad> {}
