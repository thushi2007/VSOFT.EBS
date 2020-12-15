package ebs.api.dto;

import java.util.Date;

public class CategoryDetailDto {
    private Integer Id;
    private String Category;
    private Date CreatedOn;
    private Date ModifiedOn;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public Date getCreatedOn() {
        return CreatedOn;
    }

    public void setCreatedOn(Date createdOn) {
        CreatedOn = createdOn;
    }

    public Date getModifiedOn() {
        return ModifiedOn;
    }

    public void setModifiedOn(Date modifiedOn) {
        ModifiedOn = modifiedOn;
    }
}
