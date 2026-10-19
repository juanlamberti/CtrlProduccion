package com.findotechnet.repository;

import com.findotechnet.domain.TipoParametro;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoParametro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoParametroRepository extends JpaRepository<TipoParametro, Long>, JpaSpecificationExecutor<TipoParametro> {}
