package ebs.api.model;

import ebs.api.model.enumeration.LanguageEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

@Entity(
        name = "Article"
)
@Table(
        name = "VS_T_ARTICLE",
        schema = "ebs"
)
@NamedQueries({
        @NamedQuery(
                name = "Article.getAll",
                query = "SELECT e FROM Article e"
        )
})
public class ArticleEntity implements Serializable {
    private int id;
    private Integer languageId;
    private Integer publisherId;
    private Integer authorId;
    private Integer subCategoryId;
    private String title;
    private String description;
    private Double price;
    private String ean;
    private Integer releaseYear;
    private Integer sites;
    private int stock;
    private Timestamp createdOn;
    private Timestamp modifiedOn;

    private LanguageEntity language;
    private PublisherEntity publisher;
    private AuthorEntity author;
    private SubcategoryEntity subCategory;

    private Collection<BuyArticleEntity> buyArticles;
    private Collection<ArticleImageEntity> articleImages;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "LanguageId", nullable = true, insertable = false, updatable = false)
    public Integer getLanguageId() {
        return languageId;
    }

    public void setLanguageId(Integer languageId) {
        this.languageId = languageId;
    }

    @Basic
    @Column(name = "PublisherId", nullable = true, insertable = false, updatable = false)
    public Integer getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(Integer publisherId) {
        this.publisherId = publisherId;
    }

    @Basic
    @Column(name = "AuthorId", nullable = true, insertable = false, updatable = false)
    public Integer getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Integer authorId) {
        this.authorId = authorId;
    }

    @Basic
    @Column(name = "SubCategoryId", nullable = true, insertable = false, updatable = false)
    public Integer getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(Integer subCategoryId) {
        this.subCategoryId = subCategoryId;
    }

    @Basic
    @Column(name = "Title", nullable = true, length = 100)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "Description", nullable = true, length = 1000)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "Price", nullable = true, precision = 0)
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Basic
    @Column(name = "EAN", nullable = true, length = 1000)
    public String getEan() {
        return ean;
    }

    public void setEan(String ean) {
        this.ean = ean;
    }

    @Basic
    @Column(name = "ReleaseYear", nullable = true)
    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    @Basic
    @Column(name = "Sites", nullable = true)
    public Integer getSites() {
        return sites;
    }

    public void setSites(Integer sites) {
        this.sites = sites;
    }

    @Basic
    @Column(name = "Stock", nullable = false)
    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
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

        ArticleEntity that = (ArticleEntity) o;

        if (id != that.id) return false;
        if (stock != that.stock) return false;
        if (languageId != null ? !languageId.equals(that.languageId) : that.languageId != null) return false;
        if (publisherId != null ? !publisherId.equals(that.publisherId) : that.publisherId != null) return false;
        if (authorId != null ? !authorId.equals(that.authorId) : that.authorId != null) return false;
        if (subCategoryId != null ? !subCategoryId.equals(that.subCategoryId) : that.subCategoryId != null)
            return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (ean != null ? !ean.equals(that.ean) : that.ean != null) return false;
        if (releaseYear != null ? !releaseYear.equals(that.releaseYear) : that.releaseYear != null) return false;
        if (sites != null ? !sites.equals(that.sites) : that.sites != null) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (languageId != null ? languageId.hashCode() : 0);
        result = 31 * result + (publisherId != null ? publisherId.hashCode() : 0);
        result = 31 * result + (authorId != null ? authorId.hashCode() : 0);
        result = 31 * result + (subCategoryId != null ? subCategoryId.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (ean != null ? ean.hashCode() : 0);
        result = 31 * result + (releaseYear != null ? releaseYear.hashCode() : 0);
        result = 31 * result + (sites != null ? sites.hashCode() : 0);
        result = 31 * result + stock;
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "LanguageId", referencedColumnName = "Id", insertable = false, updatable = false)
    public LanguageEntity getLanguage() {
        return language;
    }

    public void setLanguage(LanguageEntity lang) {
        this.language = lang;
    }

    @ManyToOne
    @JoinColumn(name = "PublisherId", referencedColumnName = "Id", insertable = false, updatable = false)
    public PublisherEntity getPublisher() {
        return publisher;
    }

    public void setPublisher(PublisherEntity publisherEntity) {
        this.publisher = publisherEntity;
    }

    @ManyToOne
    @JoinColumn(name = "AuthorId", referencedColumnName = "Id", insertable = false, updatable = false)
    public AuthorEntity getAuthor() {
        return author;
    }

    public void setAuthor(AuthorEntity authorEntity) {
        this.author = authorEntity;
    }

    @ManyToOne
    @JoinColumn(name = "SubCategoryId", referencedColumnName = "Id", insertable = false, updatable = false)
    public SubcategoryEntity getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(SubcategoryEntity subcategoryEntity) {
        this.subCategory = subcategoryEntity;
    }

    @OneToMany(mappedBy = "article")
    public Collection<ArticleImageEntity> getArticleImages() {
        return articleImages;
    }

    public void setArticleImages(Collection<ArticleImageEntity> articleImagesEntities) {
        this.articleImages = articleImagesEntities;
    }

    @OneToMany(mappedBy = "article")
    public Collection<BuyArticleEntity> getBuyArticles() {
        return buyArticles;
    }

    public void setBuyArticles(Collection<BuyArticleEntity> buyArticleEntities) {
        this.buyArticles = buyArticleEntities;
    }
}
