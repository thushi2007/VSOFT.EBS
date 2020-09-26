package ebs.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(
        name = "Kategorie"
)
@Table(
        schema = "EBS",
        name = "VS_T_KATEGORIE"
)
@NamedQueries({
        @NamedQuery(
                name = "Kategorie.getAll",
                query = "SELECT a FROM Kategorie a"
        )
})
public class Kategorie implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;
    private String Icon;
    private String SText;
    private String Kategorie;

    private LocalDateTime ErstelltAm;
    private LocalDateTime GeaendertAm;

    @OneToMany(
            mappedBy = "MainKat",
            cascade = CascadeType.ALL
    )
    public List<SubKategorie> SubKategories = new ArrayList<SubKategorie>();

    public Kategorie() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIcon() {
        return Icon;
    }

    public void setIcon(String icon) {
        Icon = icon;
    }

    public String getSText() {
        return SText;
    }

    public void setSText(String SText) {
        this.SText = SText;
    }

    public String getKategorie() {
        return Kategorie;
    }

    public void setKategorie(String kategorie) {
        Kategorie = kategorie;
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

    public List<SubKategorie> getSubKategories() {
        return this.SubKategories;
    }

    public void setSubKategories(List<SubKategorie> subkats) {
        this.SubKategories = subkats;
    }

    public SubKategorie addPurchase(SubKategorie subkat) {
        List<SubKategorie> subkatitems = getSubKategories();
        if (subkatitems == null) {
            subkatitems = new ArrayList<SubKategorie>();
        }
        subkatitems.add(subkat);
        subkat.setMainKat(this);
        return subkat;
    }

    public SubKategorie removePurchase(SubKategorie subkat) {
        getSubKategories().remove(subkat);
        subkat.setMainKat(null);
        return subkat;
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
        if (!(obj instanceof Kategorie)) {
            return false;
        }

        Kategorie other = (Kategorie) obj;

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
        return "Kategorie [id=" + id + ", kategorie=" + getKategorie() + "]";
    }
}
