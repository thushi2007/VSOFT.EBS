using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSOFT.EBS.Repo
{
	public class VS_Z_AspNetUserRole<TKey> : IdentityUserRole<TKey>
		where TKey : IEquatable<TKey>
	{
	}
}
