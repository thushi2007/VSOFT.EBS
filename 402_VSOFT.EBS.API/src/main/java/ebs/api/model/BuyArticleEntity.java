package ebs.api.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity(
        name = "BuyArticle"
)
@Table(
        name = "VS_T_BUY_ARTICLE",
        schema = "ebs"
)
public class BuyArticleEntity implements Serializable {
    private Integer id;
    private Integer articleId;
    private Integer buyId;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private ArticleEntity article;
    private BuyEntity buy;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "ArticleId")
    public Integer getArticleId() {
        return articleId;
    }

    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
    }

    @Column(name = "BuyId")
    public Integer getBuyId() {
        return buyId;
    }

    public void setBuyId(Integer buyId) {
        this.buyId = buyId;
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

        BuyArticleEntity that = (BuyArticleEntity) o;

        if (id != that.id) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        Integer result = (Integer) id;
        result = 31 * result + articleId;
        result = 31 * result + buyId;
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "ArticleId", referencedColumnName = "Id", insertable = false, updatable = false)
    public ArticleEntity getArticle() {
        return article;
    }

    public void setArticle(ArticleEntity articleEntity) {
        this.article = articleEntity;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "BuyId", referencedColumnName = "Id", insertable = false, updatable = false)
    public BuyEntity getBuy() {
        return buy;
    }

    public void setBuy(BuyEntity buyEntity) {
        this.buy = buyEntity;
    }
}
