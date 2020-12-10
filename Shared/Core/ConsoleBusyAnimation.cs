using System;
using System.Text;
using System.Threading;

namespace EventManager.Shared.Core
{
    public class ConsoleBusyAnimation : IDisposable
    {
        readonly object syncRoot = new object();
        private TimeSpan animationInterval = TimeSpan.FromSeconds(1.0 / 8);
        private const string animation = @"|/-\";
        private int animationIndex;
        private readonly Timer timer;
        private string currentText = string.Empty;
        private bool disposed;

        public ConsoleBusyAnimation()
        {
            timer = new Timer(TimerHandler);
            if (!Console.IsOutputRedirected) ResetTimer();
        }

        public int AnimationSpeed
        {
            get => animationInterval.Milliseconds;
            set => animationInterval = TimeSpan.FromMilliseconds(value);
        }

        protected virtual void TimerHandler(object state)
        {
            lock (syncRoot)
            {
                if (disposed) return;
                UpdateText(animation[animationIndex++ % animation.Length].ToString());
                ResetTimer();
            }
        }

        public void UpdateText(string text, int? left = null, int? top = null, ConsoleColor? foregroundColor = null)
        {
            if (text == null)
                throw new ArgumentNullException(nameof(text));

            // Get length of common portion
            int commonPrefixLength = 0;
            int commonLength = Math.Min(currentText.Length, text.Length);
            while (commonPrefixLength < commonLength && text[commonPrefixLength] == currentText[commonPrefixLength])
            {
                commonPrefixLength++;
            }

            // Backtrack to the first differing character
            StringBuilder outputBuilder = new StringBuilder();
            outputBuilder.Append('\b', currentText.Length - commonPrefixLength);

            // Output new suffix
            outputBuilder.Append(text[commonPrefixLength..]);

            // If the new text is shorter than the old one: delete overlapping characters
            int overlapCount = currentText.Length - text.Length;
            if (overlapCount > 0)
            {
                outputBuilder.Append(' ', overlapCount);
                outputBuilder.Append('\b', overlapCount);
            }

            (int lastLeft, int lastTop) = Console.GetCursorPosition();
            ConsoleColor lastForegroundColor = Console.ForegroundColor;
            if (left.HasValue && top.HasValue) Console.SetCursorPosition(left.Value, top.Value);
            if (foregroundColor.HasValue) Console.ForegroundColor = foregroundColor.Value;
            Console.Write(outputBuilder);
            if (left.HasValue && top.HasValue) Console.SetCursorPosition(lastLeft, lastTop);
            if (foregroundColor.HasValue) Console.ForegroundColor = lastForegroundColor;
            currentText = text;
        }

        protected void ResetTimer()
        {
            timer.Change(animationInterval, TimeSpan.FromMilliseconds(-1));
        }

        protected virtual void Dispose(bool disposed)
        {
            this.disposed = disposed;
        }

        public void Dispose()
        {
            lock (syncRoot)
            {
                timer.Dispose();
                UpdateText(string.Empty);
                Dispose(true);
                GC.SuppressFinalize(this);
                return;
            }
        }

    }
}