using System;
using System.Text;
using System.Threading;

namespace EventManager.Shared.Core
{
    public class ConsoleLoadingAnimation : IDisposable
    {
        private static ConsoleLoadingAnimation instance;
        private object syncRoot = new object();
        private string title;
        private int progressCount = 1;
        private string animation = @"|/-\";
        private int animationIndex = 0;
        private Timer animationTimer;
        private TimeSpan animationInterval = TimeSpan.FromSeconds(1.0 / 8);
        public bool ShowAnimation { get; set; }

        public static void Show(string title)
        {
            instance = new ConsoleLoadingAnimation(title);
        }

        public static void Hide()
        {
            instance.ShowAnimation = false;
            instance.Dispose();
            instance = null;
        }
        public ConsoleLoadingAnimation(string title)
        {
            this.title = title;
            animationTimer = new Timer(AnimationTimerCallback);
            ShowAnimation = true;
            ResetAnimationTimer();
        }

        private void AnimationTimerCallback(object state)
        {
            lock (syncRoot)
            {
                bool show = ShowAnimation;
                int maxProgressCount = 86 - this.title.Length;
                if (progressCount > maxProgressCount) progressCount = 1;
                if (animationIndex > 3) animationIndex = 0;
                StringBuilder message = new StringBuilder();
                if (show)
                {
                    message.Append($"{animation[animationIndex++]} Loading {title}, Please wait");
                    Console.Title = message.ToString();
                    message.Append($"{(progressCount++ == 1 ? "." + new string(' ', maxProgressCount) : new string('.', progressCount++))}");
                }
                else
                {
                    message.Append(new string(' ', maxProgressCount + this.title.Length + 34));
                    Console.Title = title;
                }
                (int left, int top) = Console.GetCursorPosition();
                Console.SetCursorPosition(0, Console.WindowHeight - 1);
                Console.Write(message);

                Console.SetCursorPosition(left, top);
                if (show) ResetAnimationTimer();
                else animationTimer.Change(Timeout.Infinite, Timeout.Infinite);
            }
        }

        private void ResetAnimationTimer()
        {
            animationTimer.Change(animationInterval, TimeSpan.FromMilliseconds(-1));
        }

        public void Dispose()
        {
            animationTimer.Dispose();
        }
    }
}
