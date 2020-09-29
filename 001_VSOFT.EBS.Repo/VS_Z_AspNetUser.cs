using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSOFT.EBS.Repo
{
	public class VS_Z_AspNetUser<TKey> : IdentityUser<TKey>
		where TKey : IEquatable<TKey>
	{
		public Guid? OwnerId { get; set; }

		public Boolean? Active { get; set; }
		public Boolean? Blocked { get; set; }

		public DateTime? CreationDate { get; set; }
		public DateTime? ModifiedDate { get; set; }

		public String Creator { get; set; }
		public String Modifier { get; set; }
	}
}
