using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Identity;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using VSOFT.EBS.BO;

namespace VSOFT.EBS.IDP
{
	public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
	{
		private readonly UserManager<AspNetUser> m_userManager;

		public ResourceOwnerPasswordValidator(UserManager<AspNetUser> userManager)
		{
			m_userManager = userManager;
		}

		/// <summary>
		/// Validating user before grant a token
		/// </summary>
		/// <param name="context">Application context</param>
		/// <returns></returns>
		public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
		{
			try
			{
				// Getting the user from db by email
				var user = await this.m_userManager.FindByEmailAsync(context.UserName);

				if (user != null)
				{
					if (user.Active.HasValue && user.Active.Value == false && user.EmailConfirmed == false)
					{
						context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Ihr Benutzerkonto ist nicht aktiv. Aktivieren Sie diese zuerst.");
						return;
					}

					if (user.Blocked.HasValue && user.Blocked.Value)
					{
						context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Ihr Benutzerkonto ist blockiert. Aktivieren Sie diese zuerst.");
						return;
					}

					var verifyPassword = m_userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, context.Password);

					if (verifyPassword == PasswordVerificationResult.Success)
					{
						// Validation was successfully
						context.Result = new GrantValidationResult(user.Id.ToString(), "pwd");
						return;
					}

					context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Passwort ist falsch");
					return;
				}

				// User doesn't exist
				context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Benutzer existiert nicht.");
			}
			catch (Exception exc)
			{
				context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Invalid username or password");
				Log.Logger.Error(exc, $"Error in ResourceOwnerPasswordValidator.ValidateAsync, {context.Request}");
			}
		}
	}
}
