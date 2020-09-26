package ebs.api.model;

import ebs.api.model.enumeration.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity (
        name = "Artikel"
)
@Table(
        schema = "EBS",
        name = "VS_T_ARTIKEL"
)

@NamedQueries({
        @NamedQuery(
                name = "Artikel.getAll",
                query = "SELECT a FROM Artikel a"
        ),
        @NamedQuery(
                name = "Artikel.getBookByKat",
                query = "SELECT a FROM Artikel a " +
                        "JOIN ArtikelSubKategorie bk ON bk.BetrBuch.id = a.id "+
                        "JOIN Kategorie k ON k.id = bk.BetrSubKategorie.id " +
                        "JOIN Hersteller h ON h.id = a.Hersteller.id " +
                        "WHERE bk IS NOT NULL AND k IS NOT NULL AND k.id = :kid"
        ),
        @NamedQuery(
                name = "Artikel.getBookByMainKatName",
                query = "SELECT a FROM Artikel a " +
                        "JOIN ArtikelSubKategorie bk ON bk.BetrBuch.id = a.id "+
                        "WHERE LOWER(bk.BetrSubKategorie.MainKat.SText) = :mainKatName"
        ),
        @NamedQuery(
                name = "Artikel.getBookByMainSubKatName",
                query = "SELECT a FROM Artikel a " +
                        "JOIN ArtikelSubKategorie bk ON bk.BetrBuch.id = a.id " +
                        "WHERE LOWER(bk.BetrSubKategorie.SText) = :subKatName AND LOWER(bk.BetrSubKategorie.MainKat.SText) = :mainKatName"
        ),
        @NamedQuery(
                name="Artikel.getArtikelByIds",
                query = "SELECT a FROM Artikel a " +
                        "WHERE a.id IN :ids"
        )
})
public class Artikel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;
    public String Titel;
    public String Beschreibung;
    private double Preis;
    @Basic(fetch = FetchType.LAZY)
    @Lob
    private byte[] Foto;
    private String ISBN;
    private int Erscheinungsjahr;
    private int Seitenanzahl;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "SPRACHEID")
    public Sprache Sprache;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "HERSTELLERID")
    public Hersteller Hersteller;

    private LocalDateTime ErstelltAm;
    private LocalDateTime GeaendertAm;

    public Artikel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitel() {
        return Titel;
    }

    public void setTitel(String titel) {
        Titel = titel;
    }

    public String getBeschreibung() {
        return Beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        Beschreibung = beschreibung;
    }

    public double getPreis() {
        return Preis;
    }

    public void setPreis(double price) {
        Preis = price;
    }

    public byte[] getFoto() {
        return Foto;
    }

    public void setFoto(byte[] foto) {
        Foto = foto;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public int getErscheinungsdatum() {
        return Erscheinungsjahr;
    }

    public void setErscheinungsdatum(int erscheinungsdatum) {
        Erscheinungsjahr = erscheinungsdatum;
    }

    public int getSeitenanzahl() {
        return Seitenanzahl;
    }

    public void setSeitenanzahl(int seitenanzahl) {
        Seitenanzahl = seitenanzahl;
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
        if (!(obj instanceof Artikel)) {
            return false;
        }

        Artikel other = (Artikel) obj;

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
        return "Artikel [id=" + id + ", isbn=" + getISBN() + ", titel=" + getTitel() + "]";
    }
}
