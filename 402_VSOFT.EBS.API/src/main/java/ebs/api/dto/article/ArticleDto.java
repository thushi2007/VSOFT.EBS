package ebs.api.dto.article;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ArticleDto {
    private Long id;
    private String Language;
    private String Publisher;
    private String Title;
    private String Description;
    private double Price;
    private String EAN;
    private int ReleaseYear;
    private int Sites;
    private int Stock;

    @JsonProperty("Id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonProperty("Language")
    public String getLanguage() {
        return Language;
    }

    public void setLanguage(String language) {
        Language = language;
    }

    @JsonProperty("Publisher")
    public String getPublisher() {
        return Publisher;
    }

    public void setPublisher(String publisher) {
        Publisher = publisher;
    }

    @JsonProperty("Title")
    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    @JsonProperty("Description")
    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    @JsonProperty("Price")
    public double getPrice() {
        return Price;
    }

    public void setPrice(double price) {
        Price = price;
    }

    @JsonProperty("EAN")
    public String getEAN() {
        return EAN;
    }

    public void setEAN(String EAN) {
        this.EAN = EAN;
    }

    @JsonProperty("ReleaseYear")
    public int getReleaseYear() {
        return ReleaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        ReleaseYear = releaseYear;
    }

    @JsonProperty("Sites")
    public int getSites() {
        return Sites;
    }

    public void setSites(int sites) {
        Sites = sites;
    }

    @JsonProperty("Stock")
    public int getStock() {
        return Stock;
    }

    public void setStock(int stock) {
        Stock = stock;
    }
}
