namespace EventManager.DataAccess
{
    public class Permission
    {
        public Permission() { }

        public Permission(string name, string value, string groupName, string description = null)
        {
            Name = name;
            Value = value;
            GroupName = groupName;
            Description = description;
        }

        public string Name { get; set; }
        public string Value { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }

        public override string ToString()
        {
            return Value;
        }

        public static implicit operator string(Permission permission)
        {
            return permission.Value;
        }
    }
}
