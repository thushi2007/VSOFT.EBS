using IdentityServer4;
using IdentityServer4.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace VSOFT.EBS.IDP
{
	public static class Config
	{
		public static IEnumerable<ApiResource> GetApisResources()
		{
			return new List<ApiResource>
			{
				new ApiResource("webapi", "VSOFT.EBS.API")
				{
					UserClaims = {"user_id", "sub",  "role"},
					Scopes = {
						"webapi"
					}
				}
			};
		}

		public static IEnumerable<ApiScope> GetApiScopes()
		{
			return new[]
			{
				new ApiScope(name: IdentityServerConstants.StandardScopes.OpenId,   displayName: "Access by Angular Client"),
				new ApiScope(name: IdentityServerConstants.StandardScopes.Profile,   displayName: "Access by Angular Client"),
				
				
				new ApiScope(name: "webapi",   displayName: "Access Api Backend")
			};
		}

		public static IEnumerable<Client> GetClients()
		{
			return new List<Client>
			{
				new Client
				{
					ClientId = "web",
					AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
					ClientSecrets = { new Secret("D014071B-EEF6-4F49-988B-8E49BC03DF7B".Sha256()) },
					AllowedScopes = {
						IdentityServerConstants.StandardScopes.OpenId,
						IdentityServerConstants.StandardScopes.Profile,
						
						IdentityServerConstants.StandardScopes.OfflineAccess,
						"webapi"
					},
					AllowOfflineAccess = true,
					AccessTokenLifetime = 30 * 60,
					IdentityTokenLifetime = 30 * 60,
					AllowedCorsOrigins = {
						"https://localhost:4200",
						"http://localhost:4200"
					},
					//RequireConsent = false,
					//AlwaysIncludeUserClaimsInIdToken = true,
					//AlwaysSendClientClaims = true
				}
			};
		}
	}
}
