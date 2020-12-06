package ebs.api.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Blob;
import java.sql.Timestamp;

@Entity(
        name = "ArticleImage"
)
@Table(
        name = "VS_T_ARTICLE_IMAGE",
        schema = "ebs"
)
@NamedQueries({
        @NamedQuery(
                name = "ArticleImage.getAll",
                query = "SELECT e FROM ArticleImage e"
        )
})
public class ArticleImageEntity implements Serializable {
    private Integer id;
    private Blob image;
    private Integer articleId;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private ArticleEntity article;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Lob
    @Column(name = "Image", nullable = true)
    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    @Column(name = "ArticleId", nullable = true)
    public Integer getArticleId() {
        return articleId;
    }

    public void setArticleId(Integer artId) {
        this.articleId = artId;
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

        ArticleImageEntity that = (ArticleImageEntity) o;

        if (id != that.id) return false;
        if (articleId != that.articleId) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int)id;
        result = 31 * result + (articleId != null ? articleId.hashCode() : 0);
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

}
