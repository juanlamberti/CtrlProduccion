package com.findotechnet.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.StringFilter;

public class AbstractCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private StringFilter search;

    private StringFilter status;

    public AbstractCriteria() {}

    public AbstractCriteria(AbstractCriteria other) {
        this.search = other.search == null ? null : other.search.copy();
        this.status = other.status == null ? null : other.status.copy();
    }

    @Override
    public AbstractCriteria copy() {
        return new AbstractCriteria(this);
    }

    public StringFilter getSearch() {
        return search;
    }

    public void setSearch(StringFilter search) {
        this.search = search;
    }

    public StringFilter getStatus() {
        return status;
    }

    public void setStatus(StringFilter status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final AbstractCriteria that = (AbstractCriteria) o;
        return Objects.equals(search, that.search) && Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(search, status);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return  (search != null ? "search=" + search + ", " : "") +
                (status != null ? "status=" + status + ", " : "");
    }
}
