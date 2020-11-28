package ebs.api.formatter;

import ebs.api.dto.EnumDto;
import ebs.api.model.SubcategoryEntity;
import org.modelmapper.ModelMapper;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ModelAutoMapper {
    private ModelMapper autoMapper;

    public ModelMapper getAutoMapper() {
        return autoMapper;
    }

    public ModelAutoMapper() {
        this.initializeModel();
    }

    private void initializeModel() {
        autoMapper = new ModelMapper();
        // Enun mapping
        autoMapper.typeMap(SubcategoryEntity.class, EnumDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getId(), EnumDto::setId);
                    mapper.map(src -> src.getName(), EnumDto::setName);
                    mapper.map(src -> src.getName(), EnumDto::setValue);
                });
    }
}
