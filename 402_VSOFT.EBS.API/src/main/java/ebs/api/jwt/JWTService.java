package ebs.api.jwt;

import com.nimbusds.oauth2.sdk.ParseException;

import com.okta.jwt.JoseException;
import com.okta.jwt.Jwt;
import com.okta.jwt.JwtHelper;
import com.okta.jwt.JwtVerifier;
import net.minidev.json.JSONArray;

import javax.enterprise.context.ApplicationScoped;
import java.io.IOException;
import java.util.Map;

@ApplicationScoped
public class JWTService {

    private JwtVerifier jwtVerifier;

    public JWTService() {
        try {

            jwtVerifier = new JwtHelper()
                    .setIssuerUrl("http://idp:80")
                    .setAudience("webapi")
                    .build();
        } catch (IOException | ParseException e) {
            System.err.print("Configuring JWT Verifier failed!");
            e.printStackTrace();
        }
    }
    
    public Boolean validateToken(String token, String[] roles) {
        try {
            String rawToken = token.replace("Barear ", "");
            Jwt jwt = jwtVerifier.decodeAccessToken(rawToken);

            if (jwt != null) {
                Map<String, Object> claims = jwt.getClaims();
                JSONArray jwtRoles = (JSONArray) claims.get("role");

                if (roles.length > 0) {
                    Boolean rolesOk = false;

                    for (String role : roles) {
                        rolesOk = jwtRoles.contains(role);
                    }

                    return rolesOk;
                }

                return true;
            }
        } catch (JoseException e) {
            e.printStackTrace();
            return false;
        }

        return false;
    }
}
