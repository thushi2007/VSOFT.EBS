package ebs.api.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Entity(
        name = "Publisher"
)
@Table(
        name = "VS_T_PUBLISHER",
        schema = "ebs"
)
@NamedQueries({
        @NamedQuery(
                name = "Publisher.getAll",
                query = "SELECT e FROM Publisher e"
        )
})
public class PublisherEntity {
    private int id;
    private String name;
    private Timestamp createdOn;
    private Timestamp modifiedOn;
    private Collection<ArticleEntity> vsTArticlesById;

    @Id
    @Column(name = "Id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Name", nullable = true, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

        PublisherEntity that = (PublisherEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (createdOn != null ? !createdOn.equals(that.createdOn) : that.createdOn != null) return false;
        if (modifiedOn != null ? !modifiedOn.equals(that.modifiedOn) : that.modifiedOn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (createdOn != null ? createdOn.hashCode() : 0);
        result = 31 * result + (modifiedOn != null ? modifiedOn.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "vsTPublisherByPublisherId")
    public Collection<ArticleEntity> getVsTArticlesById() {
        return vsTArticlesById;
    }

    public void setVsTArticlesById(Collection<ArticleEntity> vsTArticlesById) {
        this.vsTArticlesById = vsTArticlesById;
    }
}
