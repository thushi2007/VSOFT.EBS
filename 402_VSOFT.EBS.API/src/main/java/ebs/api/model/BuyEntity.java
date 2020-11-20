package ebs.api.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Entity(
        name = "Buy"
)
@Table(
        name = "VS_T_BUY",
        schema = "ebs"
)
public class BuyEntity {
    private int id;
    private Integer customerId;
    private Timestamp buyDate;
    private Double totalPrice;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private CustomerEntity vsTCustomerByCustomerId;
    private Collection<BuyArticleEntity> vsTBuyArticlesById;

    @Id
    @Column(name = "Id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "CustomerId", nullable = true, insertable = false, updatable = false)
    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    @Basic
    @Column(name = "BuyDate", nullable = true)
    public Timestamp getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(Timestamp buyDate) {
        this.buyDate = buyDate;
    }

    @Basic
    @Column(name = "TotalPrice", nullable = true, precision = 0)
    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Basic
    @Column(name = "CreatedOn", nullable = true)
    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    @Basic
    @Column(name = "ModifiedOn", nullable = true)
    public Timestamp getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(Timestamp modifiedOn) {
        this.modifiedOn = modifiedOn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BuyEntity that = (BuyEntity) o;

        if (id != that.id) return false;
        if (customerId != null ? !customerId.equals(that.customerId) : that.customerId != null) return false;
        if (buyDate != null ? !buyDate.equals(that.buyDate) : that.buyDate != null) return false;
        if (totalPrice != null ? !totalPrice.equals(that.totalPrice) : that.totalPrice != null) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (customerId != null ? customerId.hashCode() : 0);
        result = 31 * result + (buyDate != null ? buyDate.hashCode() : 0);
        result = 31 * result + (totalPrice != null ? totalPrice.hashCode() : 0);
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "CustomerId", referencedColumnName = "Id")
    public CustomerEntity getVsTCustomerByCustomerId() {
        return vsTCustomerByCustomerId;
    }

    public void setVsTCustomerByCustomerId(CustomerEntity vsTCustomerByCustomerId) {
        this.vsTCustomerByCustomerId = vsTCustomerByCustomerId;
    }

    @OneToMany(mappedBy = "vsTBuyByBuyId")
    public Collection<BuyArticleEntity> getVsTBuyArticlesById() {
        return vsTBuyArticlesById;
    }

    public void setVsTBuyArticlesById(Collection<BuyArticleEntity> vsTBuyArticlesById) {
        this.vsTBuyArticlesById = vsTBuyArticlesById;
    }
}
