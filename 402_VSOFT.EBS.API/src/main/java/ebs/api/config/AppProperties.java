package ebs.api.config;

import javax.ejb.Singleton;
import java.io.*;
import java.lang.annotation.Annotation;
import java.util.Properties;

@Singleton
public class AppProperties {
    private String idpUrl;
    private String idpClientUrl;

    public String getIdpUrl() {
        return idpUrl;
    }

    public String getIdpClientUrl() {
        return idpClientUrl;
    }

    public AppProperties() {
        String fileName = System.getProperty("jboss.server.config.dir") + "/application.properties";
        try (InputStream inputFile = new FileInputStream(fileName)) {
            Properties appProps = new Properties();
            appProps.load(inputFile);
            this.idpUrl = appProps.getProperty("idp");
            this.idpClientUrl = appProps.getProperty("idpclienturl");
        } catch (IOException io) {
            io.printStackTrace();
        }
    }
}
