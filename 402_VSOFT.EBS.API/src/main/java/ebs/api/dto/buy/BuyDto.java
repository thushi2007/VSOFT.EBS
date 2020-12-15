package ebs.api.dto.buy;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("BuyDto")
public class BuyDto {
    private String CustomerUsername;
    private double TotalPrice;
    private Integer[] ArticleIds;

    @JsonProperty("CustomerUsername")
    public String getCustomerUsername() {
        return CustomerUsername;
    }

    public void setCustomerUsername(String customerUsername) {
        CustomerUsername = customerUsername;
    }

    @JsonProperty("TotalPrice")
    public double getTotalPrice() {
        return TotalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        TotalPrice = totalPrice;
    }

    @JsonProperty("ArticleIds")
    public Integer[] getArticleIds() {
        return ArticleIds;
    }

    public void setArticleIds(Integer[] articleIds) {
        ArticleIds = articleIds;
    }
}
