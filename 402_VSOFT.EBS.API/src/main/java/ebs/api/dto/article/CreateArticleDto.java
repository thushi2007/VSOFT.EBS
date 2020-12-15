package ebs.api.dto.article;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("CreateArticleDto")
public class CreateArticleDto {
    private Integer id;
    private Integer languageId;
    private Integer publisherId;
    private Integer authorId;
    private Integer subCategoryId;
    private String title;
    private String description;
    private double price;
    private String ean;
    private Integer releaseYear;
    private Integer sites;
    private Integer stock;

    @JsonProperty("Id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @JsonProperty("EAN")
    public String getEan() {
        return ean;
    }

    public void setEan(String ean) {
        this.ean = ean;
    }

    @JsonProperty("LanguageId")
    public Integer getLanguageId() {
        return languageId;
    }

    public void setLanguageId(Integer langId) {
        languageId = langId;
    }

    @JsonProperty("PublisherId")
    public Integer getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(Integer pubId) {
        publisherId = pubId;
    }

    @JsonProperty("Title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String tit) {
        title = tit;
    }

    @JsonProperty("Description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String desc) {
        description = desc;
    }

    @JsonProperty("Price")
    public double getPrice() {
        return price;
    }

    public void setPrice(double pri) {
        price = pri;
    }

    @JsonProperty("ReleaseYear")
    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer relYear) {
        releaseYear = relYear;
    }

    @JsonProperty("Sites")
    public Integer getSites() {
        return sites;
    }

    public void setSites(Integer sit) {
        sites = sit;
    }

    @JsonProperty("Stock")
    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer str) {
        stock = str;
    }

    @JsonProperty("AuthorId")
    public Integer getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Integer autorId) {
        authorId = autorId;
    }

    @JsonProperty("SubCategoryId")
    public Integer getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(Integer subCateyId) {
        subCategoryId = subCateyId;
    }
}
