package ebs.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity (
        name = "SubKategorie"
)
@Table(
        schema = "EBS",
        name = "VS_T_SUBKATEGORIE"
)
@NamedQueries({
        @NamedQuery(
                name = "SubKategorie.findAll",
                query = "SELECT a FROM SubKategorie a"
        ),
        @NamedQuery(
                name = "SubKategorie.allKat",
                query = "SELECT a.id, a.SubKategorie " +
                        "FROM SubKategorie a"
        )
})
public class SubKategorie implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;
    private String Icon;
    private String SText;
    private String SubKategorie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MAINKATEGORIEID")
    private Kategorie MainKat;

    private LocalDateTime ErstelltAm;
    private LocalDateTime GeaendertAm;

    public SubKategorie(){}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubKategorie() {
        return SubKategorie;
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

    public void setSubKategorie(String subKategorie) {
        SubKategorie = subKategorie;
    }

    public Kategorie getMainKat() {
        return MainKat;
    }

    public void setMainKat(Kategorie mainKat) {
        MainKat = mainKat;
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
        if (!(obj instanceof SubKategorie)) {
            return false;
        }

        SubKategorie other = (SubKategorie) obj;

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
        return "Subkategorie [id=" + id + ", kategorie=" + getSubKategorie() + "]";
    }
}