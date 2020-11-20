using System;
using System.Collections.Generic;
using System.Text;

namespace VSOFT.EBS.IDP.Helper
{
    public class ApiConfigs
    {
        public string AppName { get; set; }
        public string AppVersion { get; set; }
        public string AppCorrelationId { get; set; }
        public string ClientOrigin { get; set; }
        public SecureConfig Secure { get; set; }
        public LoggingConfig Logging { get; set; }
    }

    public class SecureConfig
    {
        public string SqlConnectionString { get; set; }
        public string IssuerUrl { get; set; }
    }

    public class LoggingConfig
    {
        public string AppIndexFormat { get; set; }
        public string LogFilePath { get; set; }
    }
}
