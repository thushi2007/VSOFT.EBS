package de.ebs.api.model.enumeration;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity(
        name = "Salutation"
)
@Table(
        schema = "EBS",
        name = "VS_E_SALUTATION"
)
@NamedQueries({
        @NamedQuery(
                name = "Salutation.findAll",
                query = "SELECT a FROM Salutation a"
        ),
        @NamedQuery(
                name = "Salutation.getAllSalutation",
                query = "SELECT s.id, s.Name, s.Value FROM Salutation s"
        )
})
public class Salutation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String Name;
    private String Value;

    private LocalDateTime ErstelltAm;
    private LocalDateTime GeaendertAm;

    public Salutation() {
    }

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

    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
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
        if (!(obj instanceof Salutation)) {
            return false;
        }

        Salutation other = (Salutation) obj;

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
        return "Salutation [id=" + id + ", name=" + this.getName() + "]";
    }
}
