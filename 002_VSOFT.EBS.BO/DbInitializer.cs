using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VSOFT.EBS.BO
{
    public class DbInitializer
    {
        public static void Initialize(UserManager<AspNetUser> userManager, RoleManager<AspNetRole> roleManager)
        {
            if (userManager != null && roleManager != null)
            {
                if (roleManager.Roles.Count() == 0)
                {
                    var role = new AspNetRole()
                    {
                        Name = "Benutzer"
                    };

                    var rs = roleManager.CreateAsync(role).Result;

                    role = new AspNetRole()
                    {
                        Name = "Admin"
                    };

                    rs = roleManager.CreateAsync(role).Result;
                }

                if (userManager.Users.Count() == 0)
                {
                    AspNetUser user = new AspNetUser();
                    user.UserName = "thushi2007@hotmail.com";
                    user.Email = "thushi2007@hotmail.com";
                    user.Active = true;
                    user.EmailConfirmed = true;

                    var rs = userManager.CreateAsync(user, "Arun0706!").Result;
                    rs = userManager.AddToRoleAsync(user, "Benutzer").Result;
                    rs = userManager.AddToRoleAsync(user, "ADmin").Result;
                }
            }
        }
    }
}
