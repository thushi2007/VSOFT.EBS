package ebs.api.formatter;

import ebs.api.dto.EnumDto;
import ebs.api.dto.account.UserRegisterDto;
import ebs.api.model.CustomerEntity;
import ebs.api.model.SubcategoryEntity;
import ebs.api.model.enumeration.LanguageEntity;
import ebs.api.model.enumeration.SalutationEntity;
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
        // Enum mapping
        autoMapper.typeMap(SubcategoryEntity.class, EnumDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getId(), EnumDto::setId);
                    mapper.map(src -> src.getName(), EnumDto::setName);
                    mapper.map(src -> src.getName(), EnumDto::setValue);
                });

        autoMapper.typeMap(EnumDto.class, SubcategoryEntity.class)
                .addMappings(mapper -> {
                    mapper.map(src -> 0, SubcategoryEntity::setId);
                });

        autoMapper.typeMap(EnumDto.class, LanguageEntity.class)
                .addMappings(mapper -> {
                    mapper.map(src -> 0, LanguageEntity::setId);
                });

        autoMapper.typeMap(EnumDto.class, SalutationEntity.class)
                .addMappings(mapper -> {
                    mapper.map(src -> 0, SalutationEntity::setId);
                });

        // Register Dto to Customer Entity
        autoMapper.typeMap(UserRegisterDto.class, CustomerEntity.class)
                .addMappings(mapper -> {
                    mapper.map(src -> 0, CustomerEntity::setId);
                    mapper.map(src -> src.getAnredeId(), CustomerEntity::setSalutationId);
                    mapper.map(src -> src.getLocation(), CustomerEntity::setPlace);
                    mapper.map(src -> src.getEMail(), CustomerEntity::setUsername);
                });
    }
}
