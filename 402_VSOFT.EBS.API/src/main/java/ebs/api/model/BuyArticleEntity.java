package ebs.api.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity(
        name = "BuyArticle"
)
@Table(
        name = "VS_T_BUY_ARTICLE",
        schema = "ebs"
)
public class BuyArticleEntity {
    private int id;
    private Integer articleId;
    private Integer buyId;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private ArticleEntity vsTArticleByArticleId;
    private BuyEntity vsTBuyByBuyId;

    @Id
    @Column(name = "Id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "ArticleId", nullable = true, insertable = false, updatable = false)
    public Integer getArticleId() {
        return articleId;
    }

    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
    }

    @Basic
    @Column(name = "BuyId", nullable = true, insertable = false, updatable = false)
    public Integer getBuyId() {
        return buyId;
    }

    public void setBuyId(Integer buyId) {
        this.buyId = buyId;
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

        BuyArticleEntity that = (BuyArticleEntity) o;

        if (id != that.id) return false;
        if (articleId != null ? !articleId.equals(that.articleId) : that.articleId != null) return false;
        if (buyId != null ? !buyId.equals(that.buyId) : that.buyId != null) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (articleId != null ? articleId.hashCode() : 0);
        result = 31 * result + (buyId != null ? buyId.hashCode() : 0);
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "ArticleId", referencedColumnName = "Id")
    public ArticleEntity getVsTArticleByArticleId() {
        return vsTArticleByArticleId;
    }

    public void setVsTArticleByArticleId(ArticleEntity vsTArticleByArticleId) {
        this.vsTArticleByArticleId = vsTArticleByArticleId;
    }

    @ManyToOne
    @JoinColumn(name = "BuyId", referencedColumnName = "Id")
    public BuyEntity getVsTBuyByBuyId() {
        return vsTBuyByBuyId;
    }

    public void setVsTBuyByBuyId(BuyEntity vsTBuyByBuyId) {
        this.vsTBuyByBuyId = vsTBuyByBuyId;
    }
}
