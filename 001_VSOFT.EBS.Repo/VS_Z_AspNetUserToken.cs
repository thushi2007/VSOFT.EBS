using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSOFT.EBS.Repo
{
	public class VS_Z_AspNetUserToken<TKey> : IdentityUserToken<TKey>
		where TKey : IEquatable<TKey>
	{

	}
}
