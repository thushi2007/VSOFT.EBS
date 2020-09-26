package ebs.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity (
        name = "Hersteller"
)
@Table(
        schema = "EBS",
        name = "VS_T_HERSTELLER"
)
@NamedQuery(
        name = "Hersteller.findAll",
        query = "SELECT a FROM Hersteller a"
)
public class Hersteller implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;
    private String Verlag;
    private String Name;

    public Hersteller(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getVerlag() {
        return Verlag;
    }

    public void setVerlag(String verlag) {
        Verlag = verlag;
    }

    private LocalDateTime ErstelltAm;
    private LocalDateTime GeaendertAm;

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
        if (!(obj instanceof Hersteller)) {
            return false;
        }

        Hersteller other = (Hersteller) obj;

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
        return "Hersteller [id=" + id + ", name=" + getName() + "]";
    }
}
