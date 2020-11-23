package ebs.api.config;

import io.swagger.annotations.SwaggerDefinition;
import io.swagger.jaxrs.Reader;
import io.swagger.jaxrs.config.ReaderListener;
import io.swagger.models.Swagger;
import io.swagger.models.auth.OAuth2Definition;

import java.util.HashMap;
import java.util.Map;

@SwaggerDefinition
public class SwaggerConfigs implements ReaderListener {
    private static final AppProperties appProperties = new AppProperties();

    @Override
    public void beforeScan(Reader reader, Swagger swagger) {

    }

    @Override
    public void afterScan(Reader reader, Swagger swagger) {
        Map<String, String> scopes = new HashMap<>();
        scopes.put("webapi", "webapi");
        scopes.put("profile", "profile");
        scopes.put("openid", "openid");
        scopes.put("offline_access", "offline_access");

        OAuth2Definition def = new OAuth2Definition();
        def.setDescription("JWT Bearer Token");
        def.setScopes(scopes);
        def.setFlow("password");
        def.setTokenUrl(appProperties.getIdpClientUrl() + "/connect/token");
        def.setAuthorizationUrl(appProperties.getIdpClientUrl() + "/connect/authorize");
        swagger.addSecurityDefinition("jwt-auth", def);
    }
}
