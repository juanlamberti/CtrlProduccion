package com.findotechnet.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.findotechnet.domain.Articulo;
import com.findotechnet.domain.Ingrediente;
import com.findotechnet.repository.ArticuloRepository;
import com.findotechnet.repository.IngredienteRepository;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

class ArticuloTotalesServiceTest {

    private final ArticuloRepository articulos = mock(ArticuloRepository.class);
    private final IngredienteRepository ingredientes = mock(IngredienteRepository.class);
    private final ArticuloService service = new ArticuloService(articulos, ingredientes);

    @BeforeEach
    void setup() {
        when(articulos.existsById(1L)).thenReturn(true);
    }

    private Articulo raw(Long id, float presentation, String price) {
        return new Articulo().id(id).presentacionCompraArt(presentation).valorPresentacionArt(new BigDecimal(price));
    }

    private Ingrediente child(Articulo insumo, float cantidad) {
        return new Ingrediente().insumo(insumo).cantidadIng(cantidad);
    }

    @Test
    void sumsProportionalCostsAndQuantities() {
        when(ingredientes.findChildren(1L)).thenReturn(List.of(child(raw(2L, 1000, "2000"), 250), child(raw(3L, 500, "3000"), 100)));
        var totals = service.calculateTotals(1L);
        assertThat(totals.getValorPresentacionArt()).isEqualByComparingTo("1100.00");
        assertThat(totals.getPesoArt()).isEqualTo(350f);
    }

    @Test
    void usesCalculatedCostOfNestedRecipeProportionallyToWeightUsed() {
        when(ingredientes.findChildren(1L)).thenReturn(List.of(child(raw(2L, 1, "9999"), 50)));
        when(ingredientes.findChildren(2L)).thenReturn(List.of(child(raw(3L, 1000, "2000"), 200)));
        var totals = service.calculateTotals(1L);
        assertThat(totals.getValorPresentacionArt()).isEqualByComparingTo("100.00");
        assertThat(totals.getPesoArt()).isEqualTo(50f);
    }

    @Test
    void roundsOnlyAfterSummingAllProportions() {
        when(ingredientes.findChildren(1L)).thenReturn(
            List.of(child(raw(2L, 3, "1"), 1), child(raw(2L, 3, "1"), 1), child(raw(2L, 3, "1"), 1))
        );
        assertThat(service.calculateTotals(1L).getValorPresentacionArt()).isEqualByComparingTo("1.00");
    }

    @Test
    void includesAllChildrenBeyondTheUiPageSize() {
        when(ingredientes.findChildren(1L)).thenReturn(java.util.Collections.nCopies(25, child(raw(2L, 1000, "2000"), 10)));
        assertThat(service.calculateTotals(1L).getValorPresentacionArt()).isEqualByComparingTo("500.00");
        assertThat(service.calculateTotals(1L).getPesoArt()).isEqualTo(250f);
    }

    @Test
    void emptyRecipeHasZeroTotals() {
        assertThat(service.calculateTotals(1L).getValorPresentacionArt()).isEqualByComparingTo("0");
        assertThat(service.calculateTotals(1L).getPesoArt()).isEqualTo(0f);
    }

    @Test
    void rejectsZeroPresentationWithoutDividingByZero() {
        when(ingredientes.findChildren(1L)).thenReturn(List.of(child(raw(2L, 0, "100"), 5)));
        assertThatThrownBy(() -> service.calculateTotals(1L))
            .isInstanceOf(ResponseStatusException.class)
            .hasMessageContaining("presentación");
    }

    @Test
    void rejectsCircularRecipes() {
        when(ingredientes.findChildren(1L)).thenReturn(List.of(child(raw(2L, 100, "20"), 5)));
        when(ingredientes.findChildren(2L)).thenReturn(List.of(child(raw(1L, 100, "20"), 5)));
        assertThatThrownBy(() -> service.calculateTotals(1L))
            .isInstanceOf(ResponseStatusException.class)
            .hasMessageContaining("circular");
    }

    @Test
    void rejectsMissingArticle() {
        assertThatThrownBy(() -> service.calculateTotals(99L))
            .isInstanceOf(ResponseStatusException.class)
            .hasMessageContaining("inexistente");
    }
}
