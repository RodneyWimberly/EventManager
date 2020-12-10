using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace EventManager.Shared.Core.Extensions
{
    public static class ExceptionExtensions
    {
        public static List<Item> ToDataList(this Exception exception)
        {
            if (exception == null)
            {
                return null;
            }

            List<Item> result = new List<Item>();
            Exception e = exception;
            while (e != null)
            {
                List<Item> data = e
                    .Data
                    .Keys
                    .Cast<object>()
                    .Where(k => !string.IsNullOrWhiteSpace(k.ToString()))
                    .Select(k => new Item { Key = k.ToString(), Value = Value(e.Data, k) })
                    .ToList();
                if (data != null && data.Count > 0)
                {
                    result.AddRange(data);
                }

                e = e.InnerException;
            }

            return result;
        }

        private static string Value(IDictionary data, object key)
        {
            object value = data[key];
            if (value == null)
            {
                return string.Empty;
            }

            return value.ToString();
        }
    }
}
