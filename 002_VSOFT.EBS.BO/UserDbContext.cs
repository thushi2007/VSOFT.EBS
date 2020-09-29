using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSOFT.EBS.BO
{
	public class UserDbContext : Repo.Z_VS_UserDbContext<AspNetUser, AspNetRole, Guid, AspNetUserClaim
		, AspNetUserRole, AspNetUserLogin, AspNetRoleClaim, AspNetUserToken>
	{
		public UserDbContext(DbContextOptions<UserDbContext> options)
			: base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Have to be after the base OnModelCreating event! Otherwise the renaming wouldn't work!
			modelBuilder.Entity<AspNetUser>().ToTable("VS_Z_AspNetUser");
			modelBuilder.Entity<AspNetRole>().ToTable("VS_Z_AspNetRole");
			modelBuilder.Entity<AspNetRoleClaim>().ToTable("VS_Z_AspNetRoleClaim");
			modelBuilder.Entity<AspNetUserClaim>().ToTable("VS_Z_AspNetUserClaim");
			modelBuilder.Entity<AspNetUserLogin>().ToTable("VS_Z_AspNetUserLogin");
			modelBuilder.Entity<AspNetUserRole>().ToTable("VS_Z_AspNetUserRole");
			modelBuilder.Entity<AspNetUserToken>().ToTable("VS_Z_AspNetUserToken");
		}
	}
}
