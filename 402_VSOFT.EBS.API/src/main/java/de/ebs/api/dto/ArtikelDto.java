package de.ebs.api.dto;

import de.ebs.api.model.Artikel;

public class ArtikelDto {
    public Long id;
    public String Titel;
    public String Herausgeber;
    public String Beschreibung;
    public double Preis;
    public String ISBN;
    public byte[] Foto;

    public ArtikelDto(Artikel b) {
        this.id = b.getId();
        this.Herausgeber = b.Hersteller.getVerlag();
        this.Titel = b.getTitel();
        this.Beschreibung = b.getBeschreibung();
        this.Preis = b.getPreis();
        this.ISBN = b.getISBN();
        this.Foto = b.getFoto();
    }
}
