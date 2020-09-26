package ebs.api.model.enumeration;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity(
        name = "Sprache"
)
@Table(
        schema = "EBS",
        name = "VS_E_SPRACHE"
)
@NamedQueries({
        @NamedQuery(
                name = "Sprache.findAll",
                query = "SELECT a FROM Sprache a"
        ),
        @NamedQuery(
                name = "Sprache.getSpracheList",
                query = "SELECT a.id, a.Sprache FROM Sprache a"
        )
})
public class Sprache implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    private String Sprache;

    private LocalDateTime ErstelltAm;
    private LocalDateTime GeaendertAm;

    public Sprache() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSprache() {
        return Sprache;
    }

    public void setSprache(String sprache) {
        Sprache = sprache;
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
        if (!(obj instanceof Sprache)) {
            return false;
        }

        Sprache other = (Sprache) obj;

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
        return "Sprache [id=" + id + ", sprache=" + this.getSprache() + "]";
    }
}
