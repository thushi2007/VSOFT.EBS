package ebs.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity (
        name = "ArtikelSubKategorie"
)
@Table(
        schema = "EBS",
        name = "VS_T_ARTIKEL_SUBKATEGORIE"
)
@NamedQuery(
        name = "ArtikelSubKategorie.findAll",
        query = "SELECT a FROM ArtikelSubKategorie a"
)
public class ArtikelSubKategorie implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "ARTIKELID")
    public Artikel BetrBuch;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "SUBKATEGORIEID")
    public SubKategorie BetrSubKategorie;

    private LocalDateTime ErstelltAm;
    private LocalDateTime GeaendertAm;

    public ArtikelSubKategorie(){ }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getErstelltAm() {
        return ErstelltAm;
    }

    public void setErstelltAm(LocalDateTime erstelltAm) {
        ErstelltAm = erstelltAm;
    }

    public LocalDateTime getGeaendertAm() {
        return GeaendertAm;
    }

    public void setGeaendertAm(LocalDateTime geaendertAm) {
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
        if (!(obj instanceof ArtikelSubKategorie)) {
            return false;
        }

        ArtikelSubKategorie other = (ArtikelSubKategorie) obj;

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
        return "Buch- Kategorie [id=" + id + "]";
    }
}
