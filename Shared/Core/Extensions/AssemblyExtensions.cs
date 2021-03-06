﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace EventManager.Shared.Core.Extensions
{
    public static class AssemblyExtensions
    {
        public static IEnumerable<Type> GetLoadableTypes(this Assembly assembly)
        {
            if (assembly == null)
            {
                throw new ArgumentNullException(nameof(assembly));
            }

            try
            {
                return assembly.GetTypes();
            }
            catch (ReflectionTypeLoadException e)
            {
                return e.Types.Where(t => t != null);
            }
        }

        public static IEnumerable<Type> GetTypesWithInterface<TInterface>(this Assembly assembly)
        {
            Type it = typeof(TInterface);
            return assembly.GetLoadableTypes().Where(it.IsAssignableFrom).ToList();
        }

        public static object InvokeMethod(this Type type, string method, params object[] args)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            ConstructorInfo constructorInfo = type.GetConstructor(Type.EmptyTypes);
            if (constructorInfo == null)
            {
                return null;
            }

            MethodInfo methodInfo = type.GetMethod(method);
            if (methodInfo == null)
            {
                return null;
            }

            object entity = constructorInfo.Invoke(Array.Empty<object>());
            if (entity == null)
            {
                return null;
            }

            return methodInfo.Invoke(entity, args);
        }
    }
}
