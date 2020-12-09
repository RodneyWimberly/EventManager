using EventManager.Core.Extensions;
using System;
using System.Text;

namespace EventManager.Core
{
    public sealed class DisposableStringWriter : IDisposable
    {
        private readonly StringBuilder _builder;
        private string _startText;
        private string _endText;
        private bool _addCrLf;
        private string _seperator;

        public DisposableStringWriter(StringBuilder builder,
            string startText,
            string endText,
            bool addCrLf = true,
            string seperator = ",")
        {
            _builder = builder;
            _startText = startText;
            _endText = endText;
            _addCrLf = addCrLf;
            _seperator = seperator;

            _builder.JsonSeperator();
            Append(_startText);
        }

        public void Dispose()
        {
            Append(_endText);
        }

        private void Append(string data)
        {
            if (_addCrLf)
                _builder.AppendLine(data);
            else
                _builder.Append(data);
        }
    }
}
