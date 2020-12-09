using System;
using System.Text;

namespace EventManager.Core.Extensions
{
    public static class StringBuilderExtensions
    {
        public static StringBuilder JsonSeperator(this StringBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));

            Span<char> dest = new Span<char>();
            builder.CopyTo(builder.Length - 2, dest, 2);
            if (dest[0] == '}' || dest[0] == ']' || dest[1] == '}' || dest[1] == ']')
            {
                if (dest[0] == '}' || dest[0] == ']')
                    builder.AppendLine(",");
                else
                    builder.Append(',');
            }
            return builder;
        }

        public static StringBuilder JsonValue(this StringBuilder builder, string key, string value)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));

            builder.JsonSeperator().Append($"{key}: '{value}'");
            return builder;
        }

        public static DisposableStringWriter JsonObject(this StringBuilder builder, string name = null)
        {
            string startText = "{";
            if (name != null) startText = $"{name}: {startText}";
            return new DisposableStringWriter(builder, startText, "}");
        }

        public static DisposableStringWriter JsonArray(this StringBuilder builder, string name = null)
        {
            string startText = "[";
            if (name != null) startText = $"{name}: {startText}";
            return new DisposableStringWriter(builder, startText, "]");
        }
    }
}
