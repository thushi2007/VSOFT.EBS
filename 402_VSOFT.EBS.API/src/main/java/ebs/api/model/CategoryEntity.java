package ebs.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

@Entity(
        name = "Category"
)
@Table(
        name = "VS_T_CATEGORY",
        schema = "ebs"
)
@NamedQueries({
        @NamedQuery(
                name = "Category.findAll",
                query = "SELECT s FROM Category s"
        )
})
public class CategoryEntity implements Serializable {
    private Integer id;
    private String icon;
    private String category;
    private Timestamp createdOn;
    private Timestamp modifiedOn;

    private Collection<SubcategoryEntity> subCategories;

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

    @Column(name = "Category", nullable = true, length = 100)
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

        CategoryEntity that = (CategoryEntity) o;

        if (id != that.id) return false;
        if (icon != null ? !icon.equals(that.icon) : that.icon != null) return false;
        if (category != null ? !category.equals(that.category) : that.category != null) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int)id;
        result = 31 * result + (icon != null ? icon.hashCode() : 0);
        result = 31 * result + (category != null ? category.hashCode() : 0);
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @OneToMany(targetEntity = SubcategoryEntity.class, mappedBy = "mainCategory")
    public Collection<SubcategoryEntity> getSubcategories() {
        return subCategories;
    }

    public void setSubcategories(Collection<SubcategoryEntity> subcategoryEntity) {
        this.subCategories = subcategoryEntity;
    }
}
