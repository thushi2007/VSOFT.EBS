using Microsoft.AspNetCore.Mvc;
using VSOFT.EBS.IDP.Helper;

namespace VSOFT.EBS.IDP.Controllers
{
    [Route("system")]
    [ApiController]
    public class SystemController : BaseController
    {
        public SystemController(ApiContext apiContext) 
            : base(apiContext)
        {
        }

        [Route("status")]
        [HttpGet]
        public IActionResult Stats()
        {
            ApiCtxt.Log.Information("Status requested!");

            var stat = new { Environment = ApiCtxt.AppEnvironment, Started = ApiCtxt.AppStarted, Name = this.ApiCtxt.AppConf.AppName, Version = this.ApiCtxt.AppVersion };
            return Ok(stat);
        }
    }
}