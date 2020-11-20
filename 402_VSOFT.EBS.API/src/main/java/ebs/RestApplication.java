package ebs;

import ebs.api.filter.CorsFilter;
import ebs.api.formatter.JsonCaseFilter;
import ebs.api.jwt.JWTAuthedFilter;
import ebs.api.jwt.JWTService;
import ebs.api.resource.*;

import io.swagger.annotations.*;
import io.swagger.jaxrs.config.BeanConfig;

import javax.ejb.Stateless;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@Stateless
@SwaggerDefinition(info = @Info(
        title = "EBS Onlineshop Backend REST- API",
        description = "JavaEE Backend REST API for ebs onlineshop",
        version = "1.0.0",
        contact = @Contact(
                name = "Thamilini Vickneswaranathan",
                email = "info@vsoft.com",
                url = "http://www.vsoft.com"
        )),
        securityDefinition = @SecurityDefinition(
                oAuth2Definitions = @OAuth2Definition(
                        key = "jwt-auth",
                        description = "JWT Bearer Token",
                        flow = OAuth2Definition.Flow.PASSWORD,
                        authorizationUrl = "http://127.0.0.1:32839/connect/authorize",
                        tokenUrl = "http://127.0.0.1:32839/connect/token",
                        scopes = {
                                @Scope(name = "webapi", description = "webapi"),
                                @Scope(name = "profile", description = "profile"),
                                @Scope(name = "openid", description = "openid"),
                                @Scope(name = "offline_access", description = "offline_access")
                        }
                ))
)
@Api(value = "EBS Onlineshop Backend REST- API", authorizations = @Authorization(("jwt-auth")))
@ApplicationPath("/api")
public class RestApplication extends Application {

    public RestApplication() {
        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setBasePath("/ebs/api");
        beanConfig.setResourcePackage("ebs");
        beanConfig.setScan(true);
    }

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();

        classes.add(EnumResource.class);
        classes.add(CategoryResource.class);
        classes.add(ArticleResource.class);
        classes.add(SubCategoryResource.class);
        classes.add(PublisherResource.class);

        classes.add(JWTService.class);
        classes.add(JWTAuthedFilter.class);
        classes.add(JsonCaseFilter.class);
        classes.add(CorsFilter.class);

        classes.add(io.swagger.jaxrs.listing.ApiListingResource.class);
        classes.add(io.swagger.jaxrs.listing.SwaggerSerializers.class);

        return classes;
    }
}
