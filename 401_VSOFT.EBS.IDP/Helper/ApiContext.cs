using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;

namespace VSOFT.EBS.IDP.Helper
{
	public class ApiContext
	{
		public string AppName { get; set; }
		public string AppVersion { get; set; }
		public DateTime AppStarted { get; set; }
		public string AppEnvironment { get; set; }
		public ApiConfigs AppConf { get; set; }

		public ILogger Log { get; set; }
		public DbContext DataContext { get; set; }

		public ApiContext(string aName, string aVersion, DateTime aStarted, string aEnvironment,
			ApiConfigs aConfigs, ILogger aLog, DbContext aContext)
		{
			this.AppName = aName;
			this.AppVersion = aVersion;
			this.AppStarted = aStarted;
			this.AppEnvironment = aEnvironment;
			this.AppConf = aConfigs;
			this.Log = aLog;
			this.DataContext = aContext;
		}
	}
}
