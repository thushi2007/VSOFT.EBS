package ebs.api.dto.article;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("ArticleDto")
public class ArticleDto {
    private Integer id;
    private String Language;
    private String Publisher;
    private String Title;
    private String Description;
    private double Price;
    private String EAN;
    private Integer ReleaseYear;
    private Integer Sites;
    private Integer Stock;

    @JsonProperty("Id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
    public Integer getReleaseYear() {
        return ReleaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        ReleaseYear = releaseYear;
    }

    @JsonProperty("Sites")
    public Integer getSites() {
        return Sites;
    }

    public void setSites(Integer sites) {
        Sites = sites;
    }

    @JsonProperty("Stock")
    public Integer getStock() {
        return Stock;
    }

    public void setStock(Integer stock) {
        Stock = stock;
    }
}
