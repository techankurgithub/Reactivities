using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string details=null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;            
        }

        public string Message { get; set; }
        public string Details { get; set; }
        public int StatusCode { get; set; }
        
    }
}