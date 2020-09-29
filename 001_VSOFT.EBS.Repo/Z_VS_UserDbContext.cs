using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace VSOFT.EBS.Repo
{
	public class Z_VS_UserDbContext<TANUser, TANRole, TKey, TANUserClaim, TANUserRole, TANUserLogin, TANRoleClaim, TANUserToken>
		: IdentityDbContext<TANUser, TANRole, TKey, TANUserClaim, TANUserRole, TANUserLogin, TANRoleClaim, TANUserToken>
		where TKey : IEquatable<TKey>
		where TANUser : VS_Z_AspNetUser<TKey>
		where TANRole : VS_Z_AspNetRole<TKey>
		where TANUserClaim : VS_Z_AspNetUserClaim<TKey>
		where TANUserRole : VS_Z_AspNetUserRole<TKey>
		where TANUserLogin : VS_Z_AspNetUserLogin<TKey>
		where TANRoleClaim : VS_Z_AspNetRoleClaim<TKey>
		where TANUserToken : VS_Z_AspNetUserToken<TKey>
	{
		public Z_VS_UserDbContext(DbContextOptions options)
			: base(options)
		{

		}

		public override int SaveChanges()
		{
			return base.SaveChanges();
		}
	}
}
