interface TagGroupBy<T> {
  tag: keyof T;
  childName: string;
}

type BuildGroupedType<T, Tags extends readonly TagGroupBy<T>[]> = Tags extends readonly [infer First, ...infer Rest]
  ? First extends TagGroupBy<T>
    ? Rest extends readonly TagGroupBy<T>[]
      ? Array<Pick<T, First['tag']> & Record<First['childName'], BuildGroupedType<T, Rest>>>
      : never
    : never
  : T[];

export function groupBy<T extends Record<PropertyKey, any>, const Tags extends readonly TagGroupBy<T>[]>(
  array: Array<T>,
  tagsToGroup: Tags,
): BuildGroupedType<T, Tags> {
  let result: any = [];

  const existInArray = (array: Array<T>, key: keyof T, target: T[keyof T]) => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] === target) return { exist: true, index: i };
    }

    return { exist: false, index: -1 };
  };

  const group = (array: Array<T>, element: T, tagsToGroup: readonly TagGroupBy<T>[]) => {
    if (!tagsToGroup || tagsToGroup.length === 0) {
      array.push(element);
      return array;
    }

    const tempTags = [...tagsToGroup];

    const targetTag = tempTags.shift() as TagGroupBy<T>;

    const { exist, index } = existInArray(array, targetTag.tag, element[targetTag.tag]);

    if (!exist) {
      const insert = {} as Record<PropertyKey, any>;

      insert[targetTag.tag] = element[targetTag.tag];
      insert[targetTag.childName] = [];

      array.push(insert as T);
    }

    const indexToManipulate = exist ? index : array.length - 1;

    const targetObject = array[indexToManipulate] as Record<PropertyKey, any>;
    targetObject[targetTag.childName] = group(targetObject[targetTag.childName], element, tempTags);

    return array;
  };

  for (const element of array) {
    result = group(result, element, tagsToGroup);
  }

  return result as BuildGroupedType<T, Tags>;
}
