using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace VSOFT.EBS.Repo
{
    [Table("VS_Z_UserActivationCode")]
    public class VS_Z_UserActivationCode
    {
        [Key]
        public Guid Id { get; set; }

        public string Code { get; set; }
        public Guid UserId { get; set; }
        public DateTime ValidUntil { get; set; }

        public DateTime? CreationDate { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public String Creator { get; set; }
        public String Modifier { get; set; }
    }
}
