package ebs.api.dto.article;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class ListArticleItemDto {
    private Long Id;
    private String Title;
    private double Price;
    private String EAN;
    private Date CreatedOn;
    private Date ModifiedOn;

    @JsonProperty("Id")
    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    @JsonProperty("Title")
    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
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

    @JsonProperty("CreatedOn")
    public Date getCreatedOn() {
        return CreatedOn;
    }

    public void setCreatedOn(Date createdOn) {
        CreatedOn = createdOn;
    }

    @JsonProperty("ModifiedOn")
    public Date getModifiedOn() {
        return ModifiedOn;
    }

    public void setModifiedOn(Date modifiedOn) {
        ModifiedOn = modifiedOn;
    }
}
