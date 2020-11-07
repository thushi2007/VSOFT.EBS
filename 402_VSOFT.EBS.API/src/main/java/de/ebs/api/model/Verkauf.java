package de.ebs.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Entity (
        name = "Verkauf"
)
@Table(
        schema = "EBS",
        name = "VS_T_VERKAUF"
)
@NamedQuery(
        name = "Verkauf.findAll",
        query = "SELECT a FROM Verkauf a"
)
public class Verkauf implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "KAEUFERID")
    public Person Kaeufer;

    private Timestamp Kaufdatum;
    private double TotalCHF;

    private Timestamp ErstelltAm;
    private Timestamp GeaendertAm;

    @OneToMany(mappedBy = "BetrVerkauf", cascade = CascadeType.PERSIST)
    public List<VerkaufArtikel> ArtikelLst;

    public Verkauf(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getKaufdatum() {
        return Kaufdatum;
    }

    public void setKaufdatum(Timestamp kaufdatum) {
        Kaufdatum = kaufdatum;
    }

    public double getTotal() {
        return TotalCHF;
    }

    public void setTotal(double total) {
        TotalCHF = total;
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
        if (!(obj instanceof Verkauf)) {
            return false;
        }

        Verkauf other = (Verkauf) obj;

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
        return "Verkauf [id=" + id + ", kaufdatum="  + getKaufdatum() + "]";
    }
}
