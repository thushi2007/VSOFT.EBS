using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using VSOFT.EBS.BO;
using VSOFT.EBS.IDP.Helper;
using VSOFT.EBS.IDP.Models;

namespace VSOFT.EBS.IDP.Controllers
{
    [Route("account")]
    public class AccountController : BaseController
    {
        private readonly UserManager<AspNetUser> m_userManager;
        private readonly RoleManager<AspNetRole> m_userRoleManager;

        private readonly UserDbContext m_dbContext;

        public AccountController(ApiContext apiContext, UserManager<AspNetUser> userManager, RoleManager<AspNetRole> roleManager, UserDbContext dbContext)
            : base(apiContext)
        {
            m_dbContext = dbContext;
            m_userManager = userManager;
            m_userRoleManager = roleManager;
        }

        [Route("exists")]
        [HttpGet]
        public IActionResult CheckIfUserExists(string uname)
        {
            bool exists = false;

            try
            {
                exists = this.m_userManager.Users.Any(s => s.UserName == uname);
            }
            catch (Exception exc)
            {
                this.ApiCtxt.Log.Error($"Error while checking if user {uname} exists.", exc);
            }

            return Ok(new { UserExists = exists });
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto registerData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Input parameters are invalid");
            }

            Boolean success = false;

            AspNetUser user = new AspNetUser();
            user.UserName = registerData.Email;
            user.Email = registerData.Email;
            user.CreationDate = DateTime.Now;
            user.ModifiedDate = DateTime.Now;
            user.Modifier = "IDP";
            user.Creator = "IDP";
            user.Active = true;
            user.EmailConfirmed = true;

            var identityResult = await m_userManager.CreateAsync(user, registerData.Password);

            if (identityResult.Succeeded)
            {
                var roleAdded = await m_userManager.AddToRoleAsync(user, "Benutzer");

                if (roleAdded.Succeeded)
                {
                    success = true;
                }
            }

            if (success)
            {
                return Ok("successfully registrated");
            }

            return StatusCode(410, "User or password is not valid.");
        }

        [Route("register/admin")]
        [HttpPost]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto registerData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Input parameters are invalid");
            }

            Boolean success = false;

            AspNetUser user = new AspNetUser();
            user.UserName = registerData.Email;
            user.Email = registerData.Email;
            user.Active = true;

            var identityResult = await m_userManager.CreateAsync(user, registerData.Password);

            if (identityResult.Succeeded)
            {
                var roleAdded = await m_userManager.AddToRoleAsync(user, "Admin");

                if (roleAdded.Succeeded)
                {
                    success = true;
                }
            }

            if (success)
            {
                return Ok("Registrierung war erfolgreich");
            }

            return StatusCode(410, "Benutzername oder Passwort ist falsch.");
        }
    }
}