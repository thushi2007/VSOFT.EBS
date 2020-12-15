package ebs.api.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

@Entity(
        name = "Buy"
)
@Table(
        name = "VS_T_BUY",
        schema = "ebs"
)
@NamedQueries({
        @NamedQuery(
                name = "Buy.getAll",
                query = "SELECT s FROM Buy s"
        ),
        @NamedQuery(
                name = "Buy.findById",
                query = "SELECT s FROM Buy s " +
                        "WHERE s.id = :sid"
        ),
        @NamedQuery(
                name = "Buy.findBuysOfUser",
                query = "SELECT s FROM Buy s " +
                        "WHERE s.customer.username = :uname"
        )
})
public class BuyEntity implements Serializable {
    private Integer id;
    private Integer customerId;
    private Timestamp buyDate;
    private Double totalPrice;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private CustomerEntity customer;
    private Collection<BuyArticleEntity> buyArticles;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "CustomerId")
    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    @Column(name = "BuyDate", nullable = true)
    public Timestamp getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(Timestamp buyDate) {
        this.buyDate = buyDate;
    }

    @Column(name = "TotalPrice", nullable = true, precision = 0)
    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Column(name = "CreatedOn", nullable = true)
    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

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
        if (buyDate != null ? !buyDate.equals(that.buyDate) : that.buyDate != null) return false;
        if (totalPrice != null ? !totalPrice.equals(that.totalPrice) : that.totalPrice != null) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        Integer result = (Integer)id;
        result = 31 * result + customerId;
        result = 31 * result + (buyDate != null ? buyDate.hashCode() : 0);
        result = 31 * result + (totalPrice != null ? totalPrice.hashCode() : 0);
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "CustomerId", referencedColumnName = "Id", insertable = false, updatable = false)
    public CustomerEntity getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerEntity customerEntity) {
        this.customer = customerEntity;
    }

    @OneToMany(targetEntity = BuyArticleEntity.class, mappedBy = "buy", fetch = FetchType.EAGER)
    public Collection<BuyArticleEntity> getBuyArticles() {
        return buyArticles;
    }

    public void setBuyArticles(Collection<BuyArticleEntity> buyArticleEntities) {
        this.buyArticles = buyArticleEntities;
    }
}
