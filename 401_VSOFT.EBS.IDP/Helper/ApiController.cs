using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace VSOFT.EBS.IDP.Helper
{
    [ApiController]
    public partial class BaseController : ControllerBase
    {
        protected ApiContext ApiCtxt { get; private set; }
        public BaseController(ApiContext apiContext)
        {
            ApiCtxt = apiContext;
        }
    }
}
