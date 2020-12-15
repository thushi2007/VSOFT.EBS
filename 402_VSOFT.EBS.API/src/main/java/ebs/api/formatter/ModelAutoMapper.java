package ebs.api.formatter;

import ebs.api.dto.EnumDto;
import ebs.api.dto.account.UserRegisterDto;
import ebs.api.dto.article.ArticleDto;
import ebs.api.dto.article.CreateArticleDto;
import ebs.api.dto.buy.BuyDetailsDto;
import ebs.api.dto.customer.CustomerDto;
import ebs.api.dto.customer.CustomerListItemDto;
import ebs.api.model.*;
import ebs.api.model.enumeration.LanguageEntity;
import ebs.api.model.enumeration.SalutationEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

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
        autoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // Enum mapping
        autoMapper.typeMap(SubcategoryEntity.class, EnumDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getId(), EnumDto::setId);
                    mapper.map(src -> src.getName(), EnumDto::setName);
                    mapper.map(src -> src.getName(), EnumDto::setValue);
                });

        autoMapper.typeMap(PublisherEntity.class, EnumDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getId(), EnumDto::setId);
                    mapper.map(src -> src.getName(), EnumDto::setName);
                    mapper.map(src -> src.getName(), EnumDto::setValue);
                });

        autoMapper.typeMap(AuthorEntity.class, EnumDto.class)
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

        autoMapper.typeMap(ArticleEntity.class, ArticleDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getPublisher().getName(), ArticleDto::setPublisher);
                    mapper.map(src -> src.getLanguage().getValue(), ArticleDto::setLanguage);
                });

        autoMapper.typeMap(CreateArticleDto.class, ArticleEntity.class)
                .addMappings(mapper -> {
                    mapper.map(src -> null, ArticleEntity::setId);
                    mapper.map(src -> src.getPublisherId(), ArticleEntity::setPublisherId);
                    mapper.map(src -> src.getAuthorId(), ArticleEntity::setAuthorId);
                    mapper.map(src -> src.getLanguageId(), ArticleEntity::setLanguageId);
                    mapper.map(src -> src.getSubCategoryId(), ArticleEntity::setSubCategoryId);
                });

        autoMapper.typeMap(ArticleEntity.class, CreateArticleDto.class);

        autoMapper.typeMap(BuyEntity.class, BuyDetailsDto.class);

        autoMapper.typeMap(CustomerEntity.class, CustomerListItemDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getUsername(), CustomerListItemDto::seteMail);
                });

        autoMapper.typeMap(CustomerDto.class, CustomerEntity.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getId(), CustomerEntity::setId);
                    mapper.map(src -> src.getAnredeId(), CustomerEntity::setSalutationId);
                    mapper.map(src -> src.getLocation(), CustomerEntity::setPlace);
                    mapper.map(src -> src.getStreetNo(), CustomerEntity::setNo);
                    mapper.map(src -> src.geteMail(), CustomerEntity::setUsername);
                });


        autoMapper.typeMap(CustomerEntity.class, CustomerDto.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getSalutationId(), CustomerDto::setAnredeId);
                    mapper.map(src -> src.getPlace(), CustomerDto::setLocation);
                    mapper.map(src -> src.getNo(), CustomerDto::setStreetNo);
                    mapper.map(src -> src.getUsername(), CustomerDto::seteMail);
                });
    }
}
