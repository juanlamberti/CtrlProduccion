package com.findotechnet.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.findotechnet.domain.Articulo;
import com.findotechnet.domain.Ingrediente;
import com.findotechnet.domain.enumeration.NaturalezaArticulo;
import com.findotechnet.repository.ArticuloRepository;
import com.findotechnet.repository.IngredienteRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

class ArticuloNaturalezaServiceTest {

    private final ArticuloRepository articulos = mock(ArticuloRepository.class);
    private final IngredienteRepository ingredientes = mock(IngredienteRepository.class);
    private final ArticuloService articuloService = new ArticuloService(articulos, ingredientes);
    private final IngredienteService service = new IngredienteService(ingredientes, articuloService);

    @Test
    void derivesNatureInsteadOfTrustingCaller() {
        Articulo articulo = new Articulo().id(1L);
        articulo.setNaturalezaArt(NaturalezaArticulo.COMPUESTO);
        articuloService.save(articulo);
        assertThat(articulo.getNaturalezaArt()).isEqualTo(NaturalezaArticulo.SIMPLE);
        when(ingredientes.existsByArticuloId(1L)).thenReturn(true);
        articuloService.update(articulo);
        assertThat(articulo.getNaturalezaArt()).isEqualTo(NaturalezaArticulo.COMPUESTO);
    }

    @Test
    void addingFirstIngredientAllowsACompoundAsInput() {
        Articulo parent = new Articulo().id(1L);
        Articulo compound = new Articulo().id(2L);
        compound.setNaturalezaArt(NaturalezaArticulo.COMPUESTO);
        when(ingredientes.findChildren(2L)).thenReturn(List.of(new Ingrediente().insumo(new Articulo().id(3L))));
        when(articulos.findById(1L)).thenReturn(Optional.of(parent));
        when(ingredientes.existsByArticuloId(1L)).thenReturn(true);
        when(ingredientes.saveAndFlush(any())).thenAnswer(call -> call.getArgument(0));
        service.save(new Ingrediente().articulo(parent).insumo(compound));
        assertThat(parent.getNaturalezaArt()).isEqualTo(NaturalezaArticulo.COMPUESTO);
    }

    @Test
    void reclassifiesBothParentsWhenMovingIngredient() {
        Articulo oldParent = new Articulo().id(1L);
        Articulo newParent = new Articulo().id(2L);
        when(ingredientes.findById(10L)).thenReturn(Optional.of(new Ingrediente().articulo(oldParent)));
        when(articulos.findById(1L)).thenReturn(Optional.of(oldParent));
        when(articulos.findById(2L)).thenReturn(Optional.of(newParent));
        when(ingredientes.existsByArticuloId(2L)).thenReturn(true);
        when(ingredientes.saveAndFlush(any())).thenAnswer(call -> call.getArgument(0));
        service.update(new Ingrediente().id(10L).articulo(newParent).insumo(new Articulo().id(3L)));
        assertThat(oldParent.getNaturalezaArt()).isEqualTo(NaturalezaArticulo.SIMPLE);
        assertThat(newParent.getNaturalezaArt()).isEqualTo(NaturalezaArticulo.COMPUESTO);
    }

    @Test
    void deletingLastIngredientMakesParentSimple() {
        Articulo parent = new Articulo().id(1L);
        parent.setNaturalezaArt(NaturalezaArticulo.COMPUESTO);
        when(ingredientes.findById(10L)).thenReturn(Optional.of(new Ingrediente().articulo(parent)));
        when(articulos.findById(1L)).thenReturn(Optional.of(parent));
        service.delete(10L);
        assertThat(parent.getNaturalezaArt()).isEqualTo(NaturalezaArticulo.SIMPLE);
        verify(ingredientes).flush();
    }

    @Test
    void rejectsDirectAndIndirectCyclesBeforeSaving() {
        Articulo parent = new Articulo().id(1L);
        assertThatThrownBy(() -> service.save(new Ingrediente().articulo(parent).insumo(parent))).isInstanceOf(
            ResponseStatusException.class
        );
        when(ingredientes.findChildren(2L)).thenReturn(List.of(new Ingrediente().insumo(parent)));
        assertThatThrownBy(() -> service.save(new Ingrediente().articulo(parent).insumo(new Articulo().id(2L)))).isInstanceOf(
            ResponseStatusException.class
        );
        verify(ingredientes, never()).saveAndFlush(any());
    }
}
