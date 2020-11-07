package de.ebs.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity (
        name = "VerkaufArtikel"
)
@Table(
        schema = "EBS",
        name = "VS_T_VERKAUF_ARTIKEL"
)
@NamedQuery(
        name = "VerkaufArtikel.findAll",
        query = "SELECT a FROM VerkaufArtikel a"
)
public class VerkaufArtikel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "ARTIKELID")
    public Artikel BetrArtikel;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "VERKAUFID")
    public Verkauf BetrVerkauf;

    private Timestamp ErstelltAm;
    private Timestamp GeaendertAm;

    public VerkaufArtikel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getErstelltAm() {
        return ErstelltAm;
    }

    public void setErstelltAm(Timestamp erstelltAm) {
        ErstelltAm = erstelltAm;
    }

    public Timestamp getGeaendertAm() {
        return GeaendertAm;
    }

    public void setGeaendertAm(Timestamp geaendertAm) {
        GeaendertAm = geaendertAm;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((id == null) ? 0
                : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof VerkaufArtikel)) {
            return false;
        }

        VerkaufArtikel other = (VerkaufArtikel) obj;

        if (id == null) {
            if (other.id != null) {
                return false;
            }
        } else if (!id.equals(other.id)) {
            return false;
        }

        return true;
    }

    @Override
    public String toString() {
        return "Bücher- Verkauf [id=" + id + "]";
    }
}
