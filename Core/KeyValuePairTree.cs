using System;
using System.Collections.Generic;
using System.Linq;

namespace EventManager.Core
{
    public class KeyValuePairTree
    {
        public string FullKey { get => Self.Key; }
        public string Key { get => Self.Key.Substring(Self.Key.IndexOf(_keySeperator, StringComparison.CurrentCulture)); }
        public string Value { get => Self.Value; }
        public KeyValuePair<string, string> Self { get; }
        public KeyValuePairTree Parent { get; set; }
        public IList<KeyValuePairTree> Children { get; }
        public IList<KeyValuePairTree> Siblings
        {
            get
            {
                if (Parent == null)
                    return new List<KeyValuePairTree>();
                else
                    return Parent.Children.Except(new List<KeyValuePairTree>() { this }).ToList();
            }
        }

        private string _keySeperator;

        public KeyValuePairTree(KeyValuePair<string, string> self = new KeyValuePair<string, string>(), KeyValuePairTree parent = null, string keySeperator = ":")
        {
            Parent = parent;
            Children = new List<KeyValuePairTree>();
            Self = self;
            _keySeperator = keySeperator;
        }

        public static KeyValuePairTree Build(IEnumerable<KeyValuePair<string, string>> keyValuePairs, string keySeperator = ":")
        {
            if (keyValuePairs == null)
                throw new ArgumentNullException(nameof(keyValuePairs));

            KeyValuePairTree tree = new KeyValuePairTree(new KeyValuePair<string, string>("Root", string.Empty), null, keySeperator);
            tree.AddChildren(keySeperator, keyValuePairs);

            /*
            foreach (string groupName in groupNames)
            {
                IEnumerable<string> subGroupNames = keyValuePairs.Where(kv => kv.Key.IndexOf(groupName + keySeperator, StringComparison.CurrentCulture) > -1).Select(kv => kv.Key.Split(keySeperator, StringSplitOptions.TrimEntries)[0]);
                IEnumerable<KeyValuePair<string, string>> children = keyValuePairs.Where(kv => kv.Key.StartsWith(groupName, StringComparison.CurrentCulture));
                IList<KeyValuePairTree> newChildren = new List<KeyValuePairTree>();
                foreach (KeyValuePair<string, string> child in children)
                {
                    newChildren.Add(new KeyValuePairTree(child, tree));
                }
                tree.Children.Add(new KeyValuePairTree(groupName, "", tree));
            }

            IEnumerable<KeyValuePair<string, string>> group = keyValuePairs.Where(kv => kv.Key.IndexOf(keySeperator, StringComparison.CurrentCulture) > -1);
            foreach (KeyValuePair<string, string> item in group)
            {
                tree.Children.Add(new KeyValuePairTree(item));
            }
            */
            return tree;
        }

        private void AddChildren(string key, IEnumerable<KeyValuePair<string, string>> keyValuePairs)
        {
            IEnumerable<string> groupNames = keyValuePairs
                .Where(kv => kv.Key.Replace(key, string.Empty).IndexOf(_keySeperator, StringComparison.CurrentCulture) > -1)
                .Select(kv => kv.Key.Replace(key, string.Empty).Split(_keySeperator, StringSplitOptions.TrimEntries)[0])
                .Distinct();
            foreach (string groupName in groupNames)
            {
                //AddChildren(groupName, keyValuePairs.S);


            }

            foreach (KeyValuePair<string, string> keyValuePair in keyValuePairs)
            {
                AddChild(keyValuePair);
            }
        }

        private void AddChild(KeyValuePair<string, string> keyValuePair)
        {
            Children.Add(new KeyValuePairTree(keyValuePair, this));
        }
    }
}