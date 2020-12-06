package ebs.api.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

@Entity(
        name = "Subcategory"
)
@Table(
        name = "VS_T_SUBCATEGORY",
        schema = "ebs"
)
@NamedQueries({
        @NamedQuery(
                name = "Subcategory.findAll",
                query = "SELECT s FROM Subcategory s"
        )
})
public class SubcategoryEntity implements Serializable {
    private Integer id;
    private String icon;
    private String name;
    private Integer mainCategoryId;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private CategoryEntity mainCategory;

    private Collection<ArticleEntity> articles;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "Icon", nullable = true, length = 100)
    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    @Column(name = "Name", nullable = true, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String subCategory) {
        this.name = subCategory;
    }

    @Column(name = "MainCategoryId", nullable = true)
    public Integer getMainCategoryId() {
        return mainCategoryId;
    }

    public void setMainCategoryId(Integer mainCategoryId) {
        this.mainCategoryId = mainCategoryId;
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

        SubcategoryEntity that = (SubcategoryEntity) o;

        if (id != that.id) return false;
        if (icon != null ? !icon.equals(that.icon) : that.icon != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (mainCategoryId != null ? !mainCategoryId.equals(that.mainCategoryId) : that.mainCategoryId != null)
            return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) id;
        result = 31 * result + (icon != null ? icon.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (mainCategoryId != null ? mainCategoryId.hashCode() : 0);
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @OneToMany(targetEntity = ArticleEntity.class, mappedBy = "subCategory")
    public Collection<ArticleEntity> getArticles() {
        return articles;
    }

    public void setArticles(Collection<ArticleEntity> articlesById) {
        this.articles = articlesById;
    }

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "MainCategoryId", referencedColumnName = "Id", insertable = false, updatable = false)
    public CategoryEntity getMainCategory() {
        return mainCategory;
    }

    public void setMainCategory(CategoryEntity mainCategoryById) {
        this.mainCategory = mainCategoryById;
    }
}
