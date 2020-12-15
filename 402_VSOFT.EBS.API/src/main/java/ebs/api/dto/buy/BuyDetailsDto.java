package ebs.api.dto.buy;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;
import ebs.api.dto.article.ArticleDto;
import ebs.api.dto.customer.CustomerDto;

import java.sql.Timestamp;
import java.util.List;

@JsonTypeName("ListArticleItemDto")
public class BuyDetailsDto {
    private Integer id;
    private double totalPrice;
    private Timestamp buyDate;

    private CustomerDto customer;

    private Timestamp CreatedOn;
    private Timestamp ModifiedOn;

    private List<ArticleDto> articles;

    @JsonProperty("Id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @JsonProperty("TotalPrice")
    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @JsonProperty("BuyDate")
    public Timestamp getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(Timestamp buyDate) {
        this.buyDate = buyDate;
    }

    @JsonProperty("Customer")
    public CustomerDto getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDto customer) {
        this.customer = customer;
    }

    @JsonProperty("CreatedOn")
    public Timestamp getCreatedOn() {
        return CreatedOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        CreatedOn = createdOn;
    }

    @JsonProperty("ModifiedOn")
    public Timestamp getModifiedOn() {
        return ModifiedOn;
    }

    public void setModifiedOn(Timestamp modifiedOn) {
        ModifiedOn = modifiedOn;
    }

    @JsonProperty("Articles")
    public List<ArticleDto> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticleDto> articles) {
        this.articles = articles;
    }
}
