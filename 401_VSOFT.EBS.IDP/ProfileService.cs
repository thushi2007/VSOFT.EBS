using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using VSOFT.EBS.BO;

namespace VSOFT.EBS.IDP
{
	public class ProfileService : IProfileService
	{
		private readonly UserManager<AspNetUser> m_userManager;

		public ProfileService(UserManager<AspNetUser> userManager)
		{
			m_userManager = userManager;
		}

		/// <summary>
		/// Getting user profile data
		/// </summary>
		/// <param name="context">Application context</param>
		/// <returns></returns>
		public async Task GetProfileDataAsync(ProfileDataRequestContext context)
		{
			try
			{
				// Getting the email of the user
				string userId = context.Subject.GetSubjectId();

				// Getting the user by email from db
				var user = await m_userManager.FindByIdAsync(userId);

				if (user != null && (user.Active.HasValue && user.Active.Value))
				{
					var claims = new List<Claim>
					{
						new Claim(ClaimTypes.Name, user.UserName),
						new Claim(ClaimTypes.Email, user.UserName),
					};

					// Getting user roles
					IList<string> roles = await m_userManager.GetRolesAsync(user);

					if (roles != null && roles.Count > 0)
					{
						// Adding roles to user profile
						claims.AddRange(roles.Select(u => new Claim(JwtClaimTypes.Role, u)));
                        claims.Add(new Claim(JwtClaimTypes.Name, user.Email));
                    }

					// Adding claims for return 
					context.IssuedClaims = claims;
				}

			}
			catch (Exception exc)
			{				
				Log.Logger.Error(exc, "Error occured in ProfileService.GetProfileDataAsync");
			}
		}

		/// <summary>
		/// Check if the user exists
		/// </summary>
		/// <param name="context">Application context</param>
		/// <returns></returns>
		public async Task IsActiveAsync(IsActiveContext context)
		{
			try
			{
				// Getting the email of the user
				var userIdText = context.Subject.GetSubjectId();

				if (Guid.TryParse(userIdText, out var userId) && userId != new Guid())
				{
					// Getting user from db by email
					string userGId = userId.ToString();
					var user = await m_userManager.FindByIdAsync(userGId);

					// If find a user -> the user is active
					context.IsActive = (user != null && (user.Active.HasValue && user.Active.Value));
				}
			}
			catch (Exception exc)
			{
				Log.Logger.Error(exc, "Error occured in ProfileService.IsActiveAsync");
			}
		}
	}
}
