package de.ebs.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Entity(
        name = "Person"
)
@Table(
        schema = "EBS",
        name = "VS_T_PERSON"
)


@NamedQueries({
        @NamedQuery(
                name = "Person.findAll",
                query = "SELECT a FROM Person a"
        ),
        @NamedQuery(
                name = "Person.updateUserData",
                query = "Update Person a " +
                        "SET a.Vorname = :parmVorname, " +
                        "a.Organisation = :parmOrganisation, " +
                        "a.Strasse = :parmStrasse, " +
                        "a.HausNr = :parmHausNr, " +
                        "a.PLZ = :parmPLZ, " +
                        "a.Ort = :parmOrt, " +
                        "a.Nachname = :parmNachname " +
                        "WHERE a.id = :paramId"
        )
})

public class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;
    private String Vorname;
    private String Nachname;
    private String Organisation;

    private String Strasse;
    private String HausNr;
    private String PLZ;
    private String Ort;

    private Timestamp ErstelltAm;
    private Timestamp GeaendertAm;


    @OneToMany(mappedBy = "Kaeufer")
    public List<Verkauf> Verkaeufe;

    public Person() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVorname() {
        return Vorname;
    }

    public void setVorname(String vorname) {
        Vorname = vorname;
    }

    public String getNachname() {
        return Nachname;
    }

    public void setNachname(String nachname) {
        Nachname = nachname;
    }

    public String getOrganisation() {
        return Organisation;
    }

    public void setOrganisation(String organisation) {
        Organisation = organisation;
    }

    public String getStrasse() {
        return Strasse;
    }

    public void setStrasse(String strasse) {
        Strasse = strasse;
    }

    public String getHausNr() {
        return HausNr;
    }

    public void setHausNr(String hausNr) {
        HausNr = hausNr;
    }

    public String getPLZ() {
        return PLZ;
    }

    public void setPLZ(String PLZ) {
        this.PLZ = PLZ;
    }

    public String getOrt() {
        return Ort;
    }

    public void setOrt(String ort) {
        Ort = ort;
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
        if (!(obj instanceof Person)) {
            return false;
        }

        Person other = (Person) obj;

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
        return "Person [id=" + id + ", vorname=" + getVorname() + ", nachname=" + getNachname() + "]";
    }
}
